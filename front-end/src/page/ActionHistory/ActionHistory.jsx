/* eslint-disable react/prop-types */
import ButtonActionHistory from "./ButtonActionHistory";
import TableData from "./TableData";
import DotPage from "./DotPage";
import './datasensor.scss'
import { useState, useEffect } from "react";
import { getListAction } from "../../api/ApiAction";
import LoadingData from "../LoadingData/LoadingData";
import NoData from "../NoData/NoData";

function ActionHistory(props) {
    const { isLoading, setIsLoading, collapsed } = props
    const [listAction, setListAction] = useState([])
    const [total, setTotal] = useState(10)
    const [datePre, setDatePre] = useState()
    const [dateTo, setDateTo] = useState()
    const [pageSelect, setPageSelect] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [isNoValue, setIsNoValue] = useState(false)


    const fetchData = async (req) => {
        try {
            const res = await getListAction(req);
            if (res.status == 200) {
                setListAction(res.data.data);
                setTotal(res.data.totalCount)
                setIsLoading(false)
                setIsNoValue(false)
                // console.log(listAction);
            }
        } catch (error) {
            setIsNoValue(true)
            console.error("Error fetching list data:", error.message);
        }
    };

    const value = {
        dayStart: datePre,
        dayEnd: dateTo,
        page: pageSelect,
        limit: pageSize ?? 10,
    }

    useEffect(() => {
        fetchData(value);
    }, [pageSelect, pageSize]);

    const handleSearch = () => {
        setPageSelect(1)
        setPageSize(10)
        fetchData(value)
    }

    return (
        <>
            {isLoading ? <LoadingData collapsed={collapsed} /> :
                (<div className={`main pt-2 transition-all duration-300 ${(!collapsed) ? "sidebar-open" : ""}`}>
                    <div className='mx-auto w-full px-8 py-3 font-semibold text-xl text-[#333]'>
                        <p>ACTION HISTORY</p>
                    </div>
                    <ButtonActionHistory setDate={setDatePre} setDateTo={setDateTo} handleSearch={handleSearch} />
                    {(isNoValue) ? (<NoData />)
                        : (<>
                            <TableData
                                listAction={listAction} />
                            <DotPage
                                pageSelect={pageSelect}
                                setPageSelect={setPageSelect}
                                total={total}
                                pageSize={pageSize}
                                setPageSize={setPageSize} />
                        </>)}
                </div>)
            }
        </>
    )
}

export default ActionHistory;