/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

function ChartComponent(props) {
    let { listData } = props;

    const [hiddenLines, setHiddenLines] = useState([]);

    const toggleLineVisibility = (dataKey) => {
        setHiddenLines((prev) => {
            // Nếu dòng hiện tại đã ẩn, thì xoá khỏi danh sách ẩn
            if (prev.includes(dataKey)) {
                return prev.filter((key) => key !== dataKey);
            }
            // Nếu dòng hiện tại chưa ẩn, thì thêm vào danh sách ẩn
            return [...prev, dataKey];
        });
    };

    const handleLegendClick = (e) => {
        // Lấy key của dòng được nhấn từ sự kiện click
        const dataKey = e.dataKey;
        toggleLineVisibility(dataKey);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={listData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" onClick={() => handleLegendClick()} />
                <Line type="monotone" dataKey="temperature" stroke="#eb0f0f" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="humidity" stroke="#145ede" />
                <Line type="monotone" dataKey="light" stroke="#efef0a" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ChartComponent;
