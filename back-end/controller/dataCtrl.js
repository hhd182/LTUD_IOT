import { PrismaClient } from '@prisma/client';
import { convertDateFormatToVN, sortData, getTime } from '../logic/logic.js';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export const newData = async (data) => {
    try {
        const dataSensor = JSON.parse(data)
        const { temperature, humidity, light, dust } = dataSensor
        const thisDate = new Date();
        const createdAt = format(thisDate, "dd/MM/yyyy HH:mm:ss").toString();
        await prisma.dataSensor.create({
            data: {
                temperature,
                humidity,
                light,
                dust,
                createdAt
            }
        });
    } catch (error) {
        console.error("Error creating new data sensor:", error);
    }
};

export const getFirstData = async (req, res) => {
    try {
        const dataDB = await prisma.dataSensor.findMany({
            take: 10,
            orderBy: {
                id: 'desc'
            }
        });

        const data = dataDB.map(item => {
            return {
                ...item,
                createdAt: getTime(item.createdAt)
            };
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

export const getDataSensor = async (req, res) => {
    try {
        let { column, value, page, limit, columnsort, typesort } = req.query;
        const pageNumber = parseInt(page, 10);

        if (isNaN(pageNumber) || pageNumber < 1) {
            return res.status(400).json({ error: "Invalid 'page' parameter" });
        }

        const searchAll = column === "all";
        if (searchAll && value) {
            value = "";
        }

        let whereClause;
        if (value !== "") {
            if (column === "createdAt") {
                whereClause = { createdAt: { contains: value.trim() } };
            } else {
                value = parseInt(value);
                whereClause = { [column]: value };
            }
        } else {
            whereClause = {};
        }

        const limitNumber = parseInt(limit, 10);
        const next = (pageNumber - 1) * limitNumber;

        const totalCount = await prisma.dataSensor.count({ where: whereClause });

        let listData = await prisma.dataSensor.findMany({
            where: whereClause,
            skip: next,
            take: limitNumber,
            orderBy: { id: 'desc' }
        });

        if (!listData || listData.length === 0) {
            return res.status(404).json({ error: `No data found with ${column} equal to ${value}` });
        }

        if (typesort !== "") {
            listData = sortData(listData, columnsort, typesort);
        }

        return res.status(200).json({ listData, totalCount });
    } catch (error) {
        console.error("Error searching data in dataSensor:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};