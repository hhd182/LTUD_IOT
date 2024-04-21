import { PrismaClient } from '@prisma/client';
import { convertDateFormat } from '../logic/logic.js';
import mqttClient from './mqttCtrl.js';

const prisma = new PrismaClient();

/**
 * Control a device based on the provided action.
 * @swagger
 * /api/action/new:
 *   post:
 *     summary: Control a device (light or fan).
 *     description: Sends a command to control a specific device (light or fan), action (on or off) and returns the status of the action.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *                 description: The device to control (light or fan).
 *               action:
 *                 type: string
 *                 description: The action to perform (ON or OFF).
 *             required:
 *               - device
 *               - action
 *     responses:
 *       '200':
 *         description: Action completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   description: The created action history record
 *                   properties:
 *                     device:
 *                       type: string
 *                     action:
 *                       type: string
 *       '400':
 *         description: Invalid device type or other validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid device type'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal server error'
 */


export const newAction = (req, res) => {
    const { device, action } = req.body;
    let result, topicPub, topicSub, message;

    if (device === 'light' || device === 'fan') {
        topicPub = `${device}control`;
        topicSub = `${device}status`;
        message = action.toUpperCase();

        // Hàm xử lý tin nhắn từ MQTT
        const handleMessage = async (receivedTopic, receivedMessage) => {
            if (receivedTopic === topicSub) {
                const status = receivedMessage.toString();
                if (status === 'ON' || status === 'OFF') {
                    result = await prisma.actionHistory.create({
                        data: {
                            device,
                            action,
                        }
                    });

                    // Hủy đăng ký lắng nghe cho MQTT topic và gửi phản hồi HTTP
                    mqttClient.unsubscribe(topicSub);
                    mqttClient.off('message', handleMessage);

                    res.status(200).json({
                        message: 'Action completed successfully',
                        data: result,
                    });

                    return; // Dừng hàm sau khi đã gửi phản hồi HTTP
                }
            }
        };

        // Gắn sự kiện message
        mqttClient.on('message', handleMessage);

        // Gửi tin nhắn điều khiển
        mqttClient.subscribe(topicSub);
        mqttClient.publish(topicPub, message);
    } else {
        res.status(400).json({
            error: 'Invalid device or action type',
        });
    }
};


/**
 * Get action history within a specified date range.
 * @swagger
 * /api/action/history:
 *   get:
 *     summary: Retrieve action history within a date range
 *     description: Retrieves records from the action history table within the specified date range, with optional pagination.
 *     parameters:
 *       - in: query
 *         name: dayStart
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the range (YYYY-MM-DD)
 *       - in: query
 *         name: dayEnd
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the range (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination (defaults to 1)
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   device:
 *                     type: string
 *                   action:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       '400':
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid 'page' parameter"
 *       '404':
 *         description: No data found within the specified date range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data from {dayStart} to {dayEnd}"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

export const getDataAction = async (req, res) => {
    try {
        const { dayStart, dayEnd, page } = req.query;
        if (dayStart && dayEnd && page) {
            let isSearch = false
            let startDay, endDay;

            const pageNumber = parseInt(page, 10);
            if (isNaN(pageNumber) || pageNumber < 1) {
                return res.status(400).json({ error: "Invalid 'page' parameter" });
            }
            const next = (pageNumber - 1) * 10;
            if (dayStart && dayEnd) {
                isSearch = true;
                startDay = convertDateFormat(dayStart)
                endDay = convertDateFormat(dayEnd)
            }

            const valueSearch = { createdAt: { gte: new Date(startDay), lte: new Date(endDay) } }

            const data = await prisma.actionHistory.findMany({
                where: isSearch ? valueSearch : {},
                skip: next,
                take: 10,
                orderBy: {
                    createdAt: 'desc'
                }
            });

            if (!data || data.length === 0) {
                return res.status(404).json({ error: `No data from ${dayStart} to ${dayEnd}` });
            }

            return res.status(200).json(data);
        }
        else {
            return res.status(400).json({
                error: "Required query parameters 'dayStart', 'dayEnd', and 'page' must be provided.",
            });
        }
    } catch (error) {
        console.error("Error searching data in actionHistory:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
