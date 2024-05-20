import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartComponent2(props) {
    const { listData, dustHide } = props;


    return (
        <ResponsiveContainer width="100%" height="96%">
            <LineChart
                data={listData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" angle={-30} textAnchor="middle" fontSize={12} tickMargin={10} />
                <YAxis yAxisId="left" domain={[0, 120]} />
                <Tooltip />
                <Legend
                    verticalAlign="top"
                    align="center"
                />
                <Line
                    name='Wind'
                    type="monotone"
                    dataKey="dust"
                    stroke={!dustHide ? "#eca833" : "transparent"}
                    yAxisId="left"
                    activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ChartComponent2;
