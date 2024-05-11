import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartComponent(props) {
    const { listData, tempHide, humHide, lightHide } = props;

    return (
        <ResponsiveContainer width="100%" height="90%">
            <LineChart
                data={listData}
                margin={{
                    left: 20,
                    right: 20,
                    top: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" angle={-30} textAnchor="middle" fontSize={12} tickMargin={10} />
                <YAxis yAxisId="left" domain={[0, 120]} fontSize={13} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 1000]} fontSize={13} />
                <Tooltip />
                <Line
                    name='Temperature'
                    type="monotone"
                    dataKey="temperature"
                    stroke={!tempHide ? "#eb0f0f" : "transparent"}
                    yAxisId="left"
                    activeDot={{ r: 8 }} />
                <Line
                    name='Humidity'
                    type="monotone"
                    dataKey="humidity"
                    stroke={!humHide ? "#145ede" : "transparent"}
                    yAxisId="left" />
                <Line
                    name='Light'
                    type="monotone"
                    dataKey="light"
                    stroke={!lightHide ? "#efef0a" : "transparent"}
                    yAxisId="right" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ChartComponent;
