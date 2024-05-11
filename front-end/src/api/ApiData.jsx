import axios from "axios";

const path = {
    getData: "http://localhost:3333/api/datasensor/",
    getListData: "http://localhost:3333/api/datasensor/search",

}

async function getData() {
    try {
        const res = await axios.get(path.getData)

        return res.data;
    } catch (error) {
        console.log("Error: ", error.message);
        return null;
    }
}

async function getListData(value) {
    try {
        const res = await axios.get(path.getListData, { params: value });
        // console.log(res.data);
        return res;
    } catch (error) {
        return null;
    }
}


// async function searchData(value) {
//     try {
//         let data = await axios.get(URL_SEARCH, value)
//     } catch (e) {
//         console.log("Error: ", e.message);
//     }
// }

export { getData, getListData }