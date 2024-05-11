import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartComponent(props) {
    const { listData, tempHide, humHide, lightHide } = props;


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
                <YAxis yAxisId="left" domain={[0, 120]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 1000]} />
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
