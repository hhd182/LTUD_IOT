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

export const getFirstData = async (req, res) => {
    try {
        const data = await prisma.dataSensor.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        });

        data.createdAt = convertDateFormatToVN("time", data.createdAt)

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
        const { column, value, page, limit, columnsort, typesort } = req.query;

        // Khong nhap gia tri khi tim kiem tat ca
        const searchAll = column === "all";
        if (searchAll && value) {
            return res.status(400).json({ error: "When searching for 'all', you are not allowed to enter a 'value'!" });
        }
        const pageNumber = parseInt(page, 10);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res.status(400).json({ error: "Invalid 'page' parameter" });
        }
        let valueSearch
        if (value != "") { valueSearch = parseInt(value) }
        const limitNumber = parseInt(limit, 10)

        const next = (pageNumber - 1) * limitNumber;
        const searchCondition = searchAll ? {} : { [column]: valueSearch };
        const totalCount = await prisma.dataSensor.count({
            where: searchCondition,
        });

        const listData = await prisma.dataSensor.findMany({
            where: searchAll ? {} : { [column]: valueSearch },
            skip: next,
            take: limitNumber,
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!listData || listData.length === 0) {
            return res.status(404).json({ error: `No data found with ${column} equal to ${value}` });
        }
        listData.forEach(item => {
            item.createdAt = convertDateFormatToVN("year", item.createdAt);
        });

        if (typesort != "") {
            let avalue;
            let bvalue;
            listData.sort((a, b) => {
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
                if (typesort === 'ASC') {
                    return avalue - bvalue
                }
                return bvalue - avalue
            })
        }
        return res.status(200).json({ listData, totalCount });
    } catch (error) {
        console.error("Error searching data in dataSensor:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};