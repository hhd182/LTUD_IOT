/* eslint-disable react/prop-types */
import ButtonDataSenSor from "./ButtonDataSensor";
import TableData from "./TableData";
import DotPage from "./DotPage";
import LoadingData from "../LoadingData/LoadingData";
import './datasensor.scss'
import { useEffect, useState } from "react";
import { getListData } from "../../api/ApiData";

function DataSensor(props) {
    const { isLoading, setIsLoading, collapsed } = props;
    const [columnSearch, setColumnSeacrch] = useState('all')
    const [valueSearch, setValueSearch] = useState('')
    const [columnSort, setColumnSort] = useState('')
    const [typeSort, setTypeSort] = useState('')
    const [pageSelect, setPageSelect] = useState(1)
    const [isSearchAll, setIsSearchAll] = useState(true)
    const [total, setTotal] = useState(10)
    const [listData, setListData] = useState([])

    const value_1 = {
        column: columnSearch,
        value: valueSearch,
        page: 1,
        limit: 10,
        columnsort: columnSort,
        typesort: typeSort
    }

    const value_2 = {
        column: columnSearch,
        value: valueSearch,
        page: pageSelect,
        limit: 10,
        columnsort: columnSort,
        typesort: typeSort
    }

    const fetchData = async (req) => {
        try {
            const data = await getListData(req);
            if (data) {
                setListData(data.listData);
                setTotal(data.totalCount)
                setIsLoading(false)
                // console.log(data);
            }
        } catch (error) {
            console.error("Error fetching list data:", error.message);
        }
    };

    useEffect(() => {
        fetchData(value_2);
    }, [pageSelect]);

    useEffect(() => {
        if (columnSearch == 'all') {
            setIsSearchAll(true)
        } else {
            setIsSearchAll(false)
        }
    }, [columnSearch])

    const handleSearch = () => {
        fetchData(value_1)
        setPageSelect(1)
    }

    return (
        <>
            {(isLoading) ? <LoadingData /> : (
                <div className={`main pt-10 transition-all duration-300 ${(!collapsed) ? "sidebar-open" : ""}`}>
                    <ButtonDataSenSor
                        setColumnSeacrch={setColumnSeacrch}
                        setValueSearch={setValueSearch}
                        valueSearch={valueSearch}
                        isSearchAll={isSearchAll}
                        handleSearch={handleSearch} />
                    <TableData listData={listData} setTypeSort={setTypeSort} setColumnSort={setColumnSort} handleSearch={handleSearch} />
                    <DotPage pageSelect={pageSelect} setPageSelect={setPageSelect} total={total} handleSearch={handleSearch} />
                </div>
            )}
        </>
    )
}

export default DataSensor;