/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { RenderData } from '../../data/RenderData';
import Enity from './Enity';
import ButtonComponent from './ButtonComponent';
import ChartComponent from "./ChartComponent";
import './doashboard.scss'
import { newActionSensor } from '../../api/ApiAction';

export default function DoashBoard(props) {

    const { setDataSensor } = props;

    const [time, setTime] = useState(0);
    const [data, setData] = useState({})
    const [listData, setListData] = useState([[]])

    const [isLoading, setIsLoading] = useState(true)
    const [isRender, setIsRender] = useState(false)
    const [isFanOn, setIsFanOn] = useState(false)
    const [isLightOn, setIsLightOn] = useState(false)

    useEffect(() => {
        RenderData(setListData, listData, data, setIsLoading, setIsRender, setData, setTime, time);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsRender(!isRender);
        }, 3000);
        return () => {
            clearTimeout(timerId);
        };
    }), [isRender];

    useEffect(() => {
        if (isRender) {
            RenderData(setListData, listData, data, setIsLoading, setIsRender, setData, setTime, time);
            if (data && data.temp != undefined) {
                setListData([...listData, data])
                setDataSensor([...listData, data])
            }
        }

        if (listData.length >= 10) {
            listData.shift()
        }
    }, [data, isRender, listData, setDataSensor, time]);

    const handleClick = async (buttonClick, typeClick) => {
        const value = {
            device: buttonClick,
            action: typeClick
        }
        const res = await newActionSensor(value)
        console.log(res);
        if (res.status == 200) {
            if (buttonClick == "fan" && typeClick == "on") {
                if (!isFanOn) {
                    setIsFanOn(true)
                    console.log(isFanOn);
                }
            }
            if (buttonClick == "fan" && typeClick == "off") {
                if (isFanOn) {
                    setIsFanOn(false)
                    console.log(isFanOn);
                }
            }

            if (buttonClick == "light" && typeClick == "on") {
                if (!isLightOn) {
                    setIsLightOn(true)
                    console.log(isFanOn);
                }
            }

            if (buttonClick == "light" && typeClick == "off") {
                if (isLightOn) {
                    setIsLightOn(false)
                    console.log(isFanOn);
                }
            }
        }
    }

    return (
        <div className='w-full max-w-[112rem] bg-[#f9fafb] mt-16 pt-5'>
            <div className=' container text-center mx-auto w-full px-8 grid grid-cols-3 gap-7 max-w-[112rem]'>
                {!isLoading && (
                    <Enity data={data} />
                )}
            </div>

            <div className='mt-4 container text-center mx-auto w-full px-8 flex gap-7 max-w-[112rem]'>
                <div className=" chart-container w-[67%] h-96 bg-[#f5f5f5] shadow-sm pt-6 mt-3 rounded-2xl">
                    {!isLoading && (
                        <ChartComponent listData={listData} />
                    )}
                </div>
                <div className=' button-container w-[32%] h-96 mt-3 flex flex-col'>
                    <ButtonComponent
                        handleClick={handleClick}
                        isFanOn={isFanOn}
                        isLightOn={isLightOn}
                    />
                </div>
            </div>
        </div>
    )
}