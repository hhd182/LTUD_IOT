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
        const result = await prisma.dataSensor.create({
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
            // orderBy: {
            //     createdAt: 'desc'
            // }
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `No data found with ${column} equal to ${value}` });
        }

        data.forEach(item => {
            item.createdAt = convertDateFormatToVN(item.createdAt);
        });

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

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error searching data in dataSensor:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};