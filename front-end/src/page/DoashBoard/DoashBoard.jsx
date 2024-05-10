/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Enity from './Enity';
import ButtonComponent from './ButtonComponent';
import ChartComponent from "./ChartComponent";
import LoadingData from '../LoadingData/LoadingData';
import './doashboard.scss'
import { newActionSensor } from '../../api/ApiAction';
import { getData } from '../../api/ApiData';
import { getFirstAction } from '../../api/ApiAction';

export default function DoashBoard(props) {
    const { isLoading, setIsLoading, collapsed, isActionFan, setIsActionFan, isActionLight, setIsActionLight } = props
    const [data, setData] = useState({})
    const [listData, setListData] = useState([[]])

    const [isFanOn, setIsFanOn] = useState(false)
    const [isLightOn, setIsLightOn] = useState(false)

    const fetchData = async () => {
        const dt = await getData();
        setData(dt)
        setListData(prevList => {
            const newList = [...prevList, dt];
            if (newList.length > 10) {
                newList.shift(); // Xóa phần tử đầu nếu có nhiều hơn 10
            }
            return newList;
        });
        setIsLoading(false);
    };

    const fetchDataAction = async (req) => {
        try {
            const res = await getFirstAction(req);
            console.log(res);
            if (res) {
                const value = res[0].device
                if (value == "FAN") {
                    setIsFanOn((res[0].action == "on") ? true : false)
                    setIsLightOn((res[1].action == "on") ? true : false)
                } else {
                    setIsLightOn((res[0].action == "on") ? true : false)
                    setIsFanOn((res[1].action == "on") ? true : false)
                }
            }

        } catch (error) {
            console.error("Error fetching list data:", error.message);
        }
    };

    useEffect(() => {
        fetchDataAction()
    }, [])

    useEffect(() => {
        // Tải dữ liệu ngay khi component được render
        fetchData();
        const intervalId = setInterval(fetchData, 5000); // Thiết lập tự động tải lại sau mỗi 5 giây

        return () => clearInterval(intervalId); // Hủy interval khi component unmount
    }, []); // Chỉ chạy một lần khi component được mount


    const handleClick = async (buttonClick, typeClick) => {
        const value = {
            device: buttonClick,
            action: typeClick
        }

        if (buttonClick == "light") {
            setIsActionLight(true)
        } else {
            setIsActionFan(true)
        }

        const res = await newActionSensor(value)
        if (res.status == 200) {
            fetchDataAction()
            if (buttonClick == "fan" && typeClick == "on") {
                if (!isFanOn) {
                    setIsFanOn(true)
                    setIsActionFan(false)
                }
            }
            if (buttonClick == "fan" && typeClick == "off") {
                if (isFanOn) {
                    setIsFanOn(false)
                    setIsActionFan(false)
                }
            }

            if (buttonClick == "light" && typeClick == "on") {
                if (!isLightOn) {
                    setIsLightOn(true)
                    setIsActionLight(false)
                }
            }

            if (buttonClick == "light" && typeClick == "off") {
                if (isLightOn) {
                    setIsActionLight(false)
                    setIsLightOn(false)
                }
            }
        }
    }

    return (
        <>
            {(isLoading) ? <LoadingData collapsed={collapsed} /> : (<div className={`main transition-all duration-300 top-2 ${(!collapsed) ? "sidebar-open" : ""}`}>
                <div className='mx-auto w-full px-8 py-3 font-semibold text-xl text-[#333]'>
                    <p>DOASH BOARD</p>
                </div>
                <div className=' container text-center mx-auto w-full px-8 grid grid-cols-3 gap-7 max-w-[112rem]'>
                    <Enity data={data} />
                </div>
                <div className='mt-4 container text-center mx-auto w-full px-8 flex gap-7 max-w-[112rem]'>
                    <div className=" chart-container w-[67%] h-96 bg-[#f5f5f5] shadow-sm pt-6 mt-3 rounded-2xl">
                        <ChartComponent listData={listData} />
                    </div>
                    <div className=' button-container w-[32%] h-96 mt-3 flex flex-col'>
                        <ButtonComponent
                            handleClick={handleClick}
                            isFanOn={isFanOn}
                            isLightOn={isLightOn}
                            isActionFan={isActionFan}
                            isActionLight={isActionLight}
                        />
                    </div>
                </div>
            </div>)}
        </>
    )
}