/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Enity from './Enity';
import ButtonComponent from './ButtonComponent';
import ChartComponent from "./ChartComponent";
import LoadingData from '../LoadingData/LoadingData';
import ChartIcon from '../../../public/svg/ChartIcon';
import './doashboard.scss'
import { newActionSensor } from '../../api/ApiAction';
import { getData } from '../../api/ApiData';
import { getFirstAction } from '../../api/ApiAction';

export default function DoashBoard(props) {
    const { isLoading, setIsLoading, collapsed, isActionFan, setIsActionFan, isActionLight, setIsActionLight, isActionAir, setIsActionAir } = props
    const [data, setData] = useState({})
    const [listData, setListData] = useState([[]])

    const [isFanOn, setIsFanOn] = useState(false)
    const [isLightOn, setIsLightOn] = useState(false)
    const [isAirOn, setIsAirOn] = useState(false)

    const chartColor = {
        Temperature: "#eb0f0f",
        Humidity: "#145ede",
        Light: "#efef0a"
    }

    const [tempHide, setTempHide] = useState(false)
    const [humHide, setHumHide] = useState(false)
    const [lightHide, setLightHide] = useState(false)

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
            if (res) {
                let isAirOn = false;
                let isLightOn = false;
                let isFanOn = false;

                res.forEach(item => {
                    if (item.device === "AIR") {
                        isAirOn = (item.action === "on");
                    } else if (item.device === "LIGHT") {
                        isLightOn = (item.action === "on");
                    } else if (item.device === "FAN") {
                        isFanOn = (item.action === "on");
                    }
                });

                setIsAirOn(isAirOn);
                setIsLightOn(isLightOn);
                setIsFanOn(isFanOn);
            }

        } catch (error) {
            console.error("Error fetching list data:", error.message);
        }
    };

    useEffect(() => {
        fetchDataAction()
    }, [])

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);


    const handleClick = async (buttonClick, typeClick) => {
        const value = {
            device: buttonClick,
            action: typeClick
        }

        if (buttonClick === "light") {
            setIsActionLight(true)
        }
        if (buttonClick === "fan") {
            setIsActionFan(true)
        }
        if (buttonClick === "air") {
            setIsActionAir(true)
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

            if (buttonClick == "air" && typeClick == "on") {
                if (!isAirOn) {
                    setIsAirOn(true)
                    setIsActionAir(false)
                }
            }

            if (buttonClick == "air" && typeClick == "off") {
                if (isAirOn) {
                    setIsActionAir(false)
                    setIsAirOn(false)
                }
            }
        }
    }

    const handleLegendClick = (line) => {
        if (line == "hum") {
            setHumHide(!humHide)
        } else if (line == "temp") {
            setTempHide(!tempHide)
        } else {
            setLightHide(!lightHide)
        }
    };

    return (
        <>
            {(isLoading) ? <LoadingData collapsed={collapsed} /> : (<div className={`main transition-all duration-300 top-2 ${(!collapsed) ? "sidebar-open" : ""}`}>
                <div className='mx-auto w-full px-8 py-3 font-bold text-xl text-[#333]'>
                    <p>DOASH BOARD</p>
                </div>
                <div className=' container text-center mx-auto w-full px-8 grid grid-cols-3 gap-7 max-w-[112rem]'>
                    <Enity data={data} />
                </div>
                <div className='mt-4 h-[60%] container text-center mx-auto w-full px-8 flex gap-7 max-w-[112rem]'>
                    <div className=" chart-container w-[67%] h-full bg-[#f5f5f5] shadow-sm pt-2 mt-3 rounded-2xl">
                        <div className='flex gap-x-3 justify-center'>
                            <span className='cursor-pointer select-none' onClick={() => { handleLegendClick("temp") }}>
                                <ChartIcon color={chartColor.Temperature} />
                                <span className="text-[#eb0f0f]">Temperature</span>
                            </span>

                            <span className='cursor-pointer select-none' onClick={() => { handleLegendClick("hum") }}>
                                <ChartIcon color={chartColor.Humidity} />
                                <span className='text-[#145ede]'>Humidity</span>
                            </span>

                            <span className='cursor-pointer select-none' onClick={() => { handleLegendClick("light") }}>
                                <ChartIcon color={chartColor.Light} />
                                <span className='text-[#efef0a]'>Light</span>
                            </span>
                        </div>
                        <ChartComponent listData={listData} tempHide={tempHide} humHide={humHide} lightHide={lightHide} />
                    </div>
                    <div className=' button-container w-[32%] h-full mt-3 grid grid-row-3 gap-4'>
                        <ButtonComponent
                            handleClick={handleClick}
                            isFanOn={isFanOn}
                            isLightOn={isLightOn}
                            isAirOn={isAirOn}
                            isActionFan={isActionFan}
                            isActionLight={isActionLight}
                            isActionAir={isActionAir}
                        />
                    </div>
                </div>
            </div>)}
        </>
    )
}