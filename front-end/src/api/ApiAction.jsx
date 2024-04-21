import axios from "axios";

const path = {
    getData: "",
    newActionSensor: "http://localhost:3333/api/action/new",

}

async function newActionSensor(value) {
    try {
        const res = await axios.post(path.newActionSensor, value);
        return res;
    } catch (error) {
        console.log("Error: ", error.message);
        return null;
    }
}

export { newActionSensor }