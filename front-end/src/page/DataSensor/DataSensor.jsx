/* eslint-disable react/prop-types */
import ButtonDataSenSor from "./ButtonDataSensor";
import TableData from "./TableData";
import DotPage from "./DotPage";
import LoadingData from "../LoadingData/LoadingData";
import NoData from "../NoData/NoData";
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
    const [pageSize, setPageSize] = useState(10)
    const [isNoValue, setIsNoValue] = useState(false)

    const value = {
        column: columnSearch,
        value: valueSearch,
        page: pageSelect,
        limit: pageSize ?? 10,
        columnsort: columnSort,
        typesort: typeSort
    }

    const fetchData = async (req) => {
        try {
            const data = await getListData(req);
            if (data.status == 200) {
                setListData(data.data.listData);
                setTotal(data.data.totalCount)
                setIsLoading(false)
                setIsNoValue(false)
                // console.log(data);
            }
        } catch (error) {
            setIsNoValue(true)
            console.error("Error fetching list data:", error.message, isNoValue);
        }
    };

    useEffect(() => {
        fetchData(value);
    }, [pageSelect, pageSize, columnSearch, typeSort]);

    useEffect(() => {
        if (!valueSearch) {
            fetchData(value);
        }
    }, [valueSearch])

    useEffect(() => {
        if (columnSearch == 'all') {
            setIsSearchAll(true)
        } else {
            setIsSearchAll(false)
        }
    }, [columnSearch])

    const handleSearch = () => {
        setPageSize(10)
        setPageSelect(1)
        fetchData(value)
    }

    return (
        <>
            {(isLoading) ? <LoadingData collapsed={collapsed} /> : (
                <div className={`main h-[90%] max-h-[90%] top-2 transition-all duration-300 ${(!collapsed) ? "sidebar-open" : ""}`}>
                    <div className='mx-auto w-full px-8 py-3 font-bold text-xl text-[#333]'>
                        <p>DATA SENSOR</p>
                    </div>
                    <ButtonDataSenSor
                        setColumnSeacrch={setColumnSeacrch}
                        setValueSearch={setValueSearch}
                        valueSearch={valueSearch}
                        isSearchAll={isSearchAll}
                        handleSearch={handleSearch}
                        columnSearch={columnSearch} />
                    {(isNoValue) ? (<NoData />)
                        : (<>
                            <TableData
                                listData={listData}
                                setTypeSort={setTypeSort}
                                setColumnSort={setColumnSort}
                                handleSearch={handleSearch} />
                            <DotPage
                                pageSelect={pageSelect}
                                setPageSelect={setPageSelect}
                                total={total}
                                handleSearch={handleSearch}
                                setPageSize={setPageSize}
                                pageSize={pageSize} />
                        </>)}
                </div>
            )}
        </>
    )
}

export default DataSensor;