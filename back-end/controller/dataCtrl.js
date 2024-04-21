import { PrismaClient } from '@prisma/client';
import { convertDateFormatToVN } from '../logic/logic.js';

const prisma = new PrismaClient();
export const newDataSensor = async (req, res) => {
    try {
        const { temperature, humidity, light } = req.body;
        const result = await prisma.dataSensor.create({
            data: {
                temperature,
                humidity,
                light
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error creating new data sensor:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const newData = async (data) => {
    try {
        const dataSensor = JSON.parse(data)
        const { temperature, humidity, light } = dataSensor
        await prisma.dataSensor.create({
            data: {
                temperature,
                humidity,
                light
            }
        });
    } catch (error) {
        console.error("Error creating new data sensor:", error);
    }
};

/**
 * Get the most recent data from the dataSensor table.
 * @swagger
 * /api/datasensor/:
 *   get:
 *     summary: Get the first data
 *     description: Retrieves the most recent record from the dataSensor table, ordered by creation time in descending order.
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the data
 *                 value:
 *                   type: number
 *                   description: The sensor value
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The time when the data was created
 *       '404':
 *         description: No data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data found in the specified table"
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


export const getFirstData = async (req, res) => {
    try {
        const data = await prisma.dataSensor.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!data) {
            return res.status(404).json({ error: "No data found in the specified table" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Retrieve sensor data with various filtering and sorting options.
 * @swagger
 * /api/datasensor/search:
 *   get:
 *     summary: Get sensor data with pagination, filtering, and sorting options.
 *     description: Retrieves sensor data based on column, value, pagination, sorting column, and sorting type.
 *     parameters:
 *       - in: query
 *         name: column
 *         required: true
 *         schema:
 *           type: string
 *         description: The column to search in (e.g., "temperature", "humidity", "light", "all").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: The value to search for in the specified column. Must be absent or empty when searching for "all".
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: columnsort
 *         schema:
 *           type: string
 *         description: The column to sort by (e.g., "id", "createdAt", "temperature", "humidity", "light").
 *       - in: query
 *         name: typesort
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: The sort order (ASC for ascending, DESC for descending).
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
 *                   temperature:
 *                     type: number
 *                   humidity:
 *                     type: number
 *                   light:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       '400':
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "When searching for 'all', you are not allowed to enter a 'value'!"
 *       '404':
 *         description: No data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data found with {column} equal to {value}"
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


export const getDataSensor = async (req, res) => {
    try {
        const { column, value, page, columnsort, typesort } = req.query;

        // Khong nhap gia tri khi tim kiem tat ca
        const searchAll = column === "all";
        if (searchAll && value) {
            return res.status(400).json({ error: "When searching for 'all', you are not allowed to enter a 'value'!" });
        }

        let valueSearch
        if (value) {
            valueSearch = parseInt(value)
        }
        const valueSelectAll = { id: true, temperature: true, humidity: true, light: true, createdAt: true }
        const valueSelectOne = { id: true, [column]: true, createdAt: true }

        const pageNumber = parseInt(page, 10);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res.status(400).json({ error: "Invalid 'page' parameter" });
        }
        const next = (pageNumber - 1) * 10;

        const data = await prisma.dataSensor.findMany({
            select: searchAll ? valueSelectAll : valueSelectOne,
            where: searchAll ? {} : { [column]: valueSearch },
            skip: next,
            take: 10,
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `No data found with ${column} equal to ${value}` });
        }

        data.forEach(item => {
            item.createdAt = convertDateFormatToVN(item.createdAt);
        });

        if (typesort) {
            let avalue;
            let bvalue;
            data.sort((a, b) => {
                switch (columnsort) {
                    case 'id':
                        avalue = a.id;
                        bvalue = b.id
                        break;
                    case 'createdAt':
                        avalue = a.createdAt
                        bvalue = b.createdAt
                        break
                    case 'temperature':
                        avalue = a.temperature
                        bvalue = b.temperature
                        break
                    case 'humidity':
                        avalue = a.humidity
                        bvalue = b.humidity
                        break
                    case 'light':
                        avalue = a.light
                        bvalue = b.light
                        break
                    default:
                        break
                }

                if (typesort === 'ASC')
                    return avalue - bvalue
                return bvalue - avalue
            })
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error searching data in dataSensor:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};