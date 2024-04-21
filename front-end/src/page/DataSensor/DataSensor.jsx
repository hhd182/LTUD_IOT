/* eslint-disable react/prop-types */
import ButtonDataSenSor from "./ButtonDataSensor";
import TableData from "./TableData";
import DotPage from "./DotPage";
import './datasensor.scss'
import { useEffect, useState } from "react";
import { getListData } from "../../api/ApiData";

function DataSensor(props) {
    const [columnSearch, setColumnSeacrch] = useState('All')
    const [valueSearch, setValueSearch] = useState(0)
    const [columnSort, setColumnSort] = useState('')
    const [typeSort, setTypeSort] = useState('')
    const [pageSelect, setPageSelect] = useState(1)
    const [listData, setListData] = useState([])

    useEffect(() => {
        setInterval(() => {
            setListData(getListData())
        }, 5000);
    }, [])

    return (
        <div className=" datasensor-container bg-[#f9fafb] mt-14 pt-10 w-full max-w-[112rem]">
            <ButtonDataSenSor setColumnSeacrch={setColumnSeacrch} setValueSearch={setValueSearch} />
            <TableData listData={listData} setTypeSort={setTypeSort} setColumnSort={setColumnSort} />
            <DotPage setPageSelect={setPageSelect} />
        </div>
    )
}

export default DataSensor;