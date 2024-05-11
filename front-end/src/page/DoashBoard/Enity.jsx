/* eslint-disable react/prop-types */
import { FaTemperatureLow, FaRegLightbulb } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { setColorTemp, setColorHum, setColorLight } from "../../logic/SetColor";
import { useEffect, useState } from "react";

function Enity(props) {
    const { data, isWarning } = props;
    let colorTemp = setColorTemp(data.temperature)
    let colorHum = setColorHum(data.humidity)
    let colorLight = setColorLight(data.light)

    const [classWarning, setClassWarning] = useState({
        temperature: false,
        humidity: false,
        light: false
    });

    const toggleWarning = (key) => {
        setClassWarning(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };


    useEffect(() => {
        const intervalWarning = {};

        Object.keys(isWarning).forEach(key => {
            if (isWarning[key]) {
                intervalWarning[key] = setInterval(() => {
                    toggleWarning(key);
                }, 150);
            } else {
                setClassWarning(prevState => ({
                    ...prevState,
                    [key]: false
                }));
            }
        });

        return () => {
            Object.values(intervalWarning).forEach(clearInterval);
        };
    }, [isWarning]);


    const customStyleTemp = { backgroundImage: `linear-gradient(to top right, #f7e9e9, ${colorTemp})` }
    const customStyleLight = { backgroundImage: `linear-gradient(to top right, #fafdeb, ${colorLight})` }
    const customStyleHum = { backgroundImage: `linear-gradient(to top right, #d6d5fd, ${colorHum})` }

    return (
        <>
            <div className={`${classWarning.temperature ? "this-warning" : ""} ${isWarning.temperature ? "bg-none" : ""} bg-[#f5f5f5] transition-all flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3`}
                style={isWarning.temperature ? null : customStyleTemp}>
                <FaTemperatureLow className='text-red-600 text-6xl' />
                <p className="title mr-5 text-2xl text-[#333] font-bold">
                    <span>{data.temperature}</span>
                    <span> ℃</span>
                </p>
            </div >

            <div className={`${classWarning.humidity ? "this-warning" : ""} ${isWarning.humidity ? "bg-none" : ""} bg-[#f5f5f5] transition-all flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3`}
                style={isWarning.customStyleHum ? null : customStyleHum}>
                <FaDroplet className='text-blue-900 text-6xl' />
                <p className="title mr-5 text-2xl text-[#333] font-bold">
                    <span>{data.humidity}</span>
                    <span> %</span>
                </p>
            </div>

            <div className={`${classWarning.light ? "this-warning" : ""} ${isWarning.light ? "bg-none" : ""} bg-[#f5f5f5] transition-all flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3`}
                style={isWarning.light ? null : customStyleLight}>
                <FaRegLightbulb className='text-yellow-600 text-6xl' />
                <p className="title mr-5 text-2xl text-[#333] font-bold">
                    <span>{data.light}</span>
                    <span> Lx</span>
                </p>
            </div>
        </>
    )
}

export default Enity;