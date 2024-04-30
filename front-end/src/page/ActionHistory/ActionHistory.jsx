/* eslint-disable react/prop-types */
import ButtonActionHistory from "./ButtonActionHistory";
import TableData from "./TableData";
import DotPage from "./DotPage";
import './datasensor.scss'
import { useState, useEffect } from "react";
import { getListAction } from "../../api/ApiAction";
import LoadingData from "../LoadingData/LoadingData";

function ActionHistory(props) {
    const { isLoading, setIsLoading, collapsed } = props
    const [listAction, setListAction] = useState([])
    const [total, setTotal] = useState(10)
    const [datePre, setDatePre] = useState()
    const [dateTo, setDateTo] = useState()
    const [pageSelect, setPageSelect] = useState(1)


    const fetchData = async (req) => {
        try {
            const res = await getListAction(req);
            if (res) {
                setListAction(res.data);
                setTotal(res.totalCount)
                setIsLoading(false)
                console.log(listAction);
            }
        } catch (error) {
            console.error("Error fetching list data:", error.message);
        }
    };

    const value = {
        dayStart: datePre,
        dayEnd: dateTo,
        page: pageSelect
    }

    useEffect(() => {
        fetchData(value);
    }, [pageSelect]);

    const handleSearch = () => {
        setPageSelect(1)
        fetchData(value)
    }

    return (
        <>
            {isLoading ? <LoadingData /> :
                (<div className={`main pt-10 transition-all duration-300 ${(!collapsed) ? "sidebar-open" : ""}`}>
                    <ButtonActionHistory setDate={setDatePre} setDateTo={setDateTo} handleSearch={handleSearch} />
                    <TableData listAction={listAction} />
                    <DotPage pageSelect={pageSelect} setPageSelect={setPageSelect} total={total} />
                </div>)
            }
        </>
    )
}

export default ActionHistory;