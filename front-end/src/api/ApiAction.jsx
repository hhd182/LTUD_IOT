import axios from "axios";

const path = {
    newActionSensor: "http://localhost:3333/api/action/new",
    getListAction: "http://localhost:3333/api/action/search",
    getFirstAction: "http://localhost:3333/api/action/",
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

async function getListAction(value) {
    try {
        const res = await axios.get(path.getListAction, { params: value });
        console.log(res);
        return res;
    } catch (error) {
        return null;
    }
}

async function getFirstAction() {
    try {
        const res = await axios.get(path.getFirstAction)
        const dt = res.data
        return dt;
    } catch (error) {
        console.log("Error: ", error.message);
        return null;
    }
}

export { newActionSensor, getListAction, getFirstAction }