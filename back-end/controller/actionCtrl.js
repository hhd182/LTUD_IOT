import { PrismaClient } from '@prisma/client';
import { convertDateFormat } from '../logic/logic.js';
import mqttClient from './mqttCtrl.js';

const prisma = new PrismaClient();

/**
 * Control a device based on the provided action.
 * @swagger
 * /api/action/new/{device}/{action}:
 *   post:
 *     summary: Control device
 *     description: Control the specified device (light or fan) with the specified action (on or off).
 *     parameters:
 *       - in: path
 *         name: device
 *         required: true
 *         schema:
 *           type: string
 *         description: The device to control (light or fan).
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *         description: The action to perform (on or off).
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Internal server error
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The JSON response containing the result of the action or an error message.
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
                        status
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
            error: 'Invalid device type',
        });
    }
};



/**
 * @swagger
 * /api/action/search:
 *   get:
 *     summary: Search action history data
 *     description: Retrieve action history data within the specified date range, with optional pagination.
 *     parameters:
 *       - in: query
 *         name: dayStart
 *         required: true
 *         schema:
 *           type: string
 *         description: The start date for the data search.
 *       - in: query
 *         name: dayEnd
 *         required: true
 *         schema:
 *           type: string
 *         description: The end date for the data search.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Invalid page parameter or date format
 *       '404':
 *         description: No data found within the specified date range
 *       '500':
 *         description: Internal server error
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The JSON response containing the result of the action or an error message.
 */
export const getDataAction = async (req, res) => {
    try {
        const { dayStart, dayEnd, page } = req.query;
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
    } catch (error) {
        console.error("Error searching data in actionHistory:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
