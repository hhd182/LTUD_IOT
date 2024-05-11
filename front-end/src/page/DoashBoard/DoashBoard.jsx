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
    const { isLoading, setIsLoading, collapsed, isActionFan, setIsActionFan, isActionLight, setIsActionLight } = props
    const [data, setData] = useState({})
    const [listData, setListData] = useState([[]])
    const [isFanOn, setIsFanOn] = useState(false)
    const [isLightOn, setIsLightOn] = useState(false)

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
        const reversedDt = [...dt].reverse();
        setData(reversedDt[9]);
        setListData(reversedDt);
        setIsLoading(false);
    };

    const fetchDataAction = async (req) => {
        try {
            const res = await getFirstAction(req);
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
        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);


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
                <div className='mt-4 container text-center mx-auto w-full px-8 flex gap-7 max-w-[112rem]'>
                    <div className=" chart-container w-[67%] h-96 bg-[#f5f5f5] shadow-sm pt-6 mt-3 rounded-2xl">
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