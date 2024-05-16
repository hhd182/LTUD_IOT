import express from 'express';
import cors from 'cors';
import actionRoutes from './routes/actionRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import { swagger } from './swagger.js'
import mqttClient from './controller/mqttCtrl.js';
import { newData } from './controller/dataCtrl.js';

const app = express()
const port = 3333

app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: 'GET,PUT,PATCH,POST,DELETE',
        credentials: true,
    }),
);

swagger(app);

app.use('/api/datasensor', dataRoutes)
app.use('/api/action', actionRoutes)

//get datasensor
mqttClient.on('connect', () => {
    mqttClient.subscribe(['datasensor']);
});
mqttClient.on("message", (topic, message) => {
    if (topic == "datasensor") {
        const data = message.toString();
        // console.log(data);
        newData(data)
    }
    // const data = message.toString();
    // console.log(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

