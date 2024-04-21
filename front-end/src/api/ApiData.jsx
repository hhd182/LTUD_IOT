import axios from "axios";

const path = {
    getData: "",
    getListData: "http://localhost:3333/api/datasensor/search",

}

async function getListData(value) {
    try {
        const res = await axios.get(path.getListData, { params: value });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log("Error: ", error.message);
        return null;
    }
}


async function searchData(value) {
    try {
        let data = await axios.get(URL_SEARCH, value)
    } catch (e) {
        console.log("Error: ", e.message);
    }
}

export { getListData, searchData }