/* eslint-disable react/prop-types */
import { FaTemperatureLow, FaRegLightbulb } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { setColorTemp, setColorHum, setColorLight, setColorDust } from "../../logic/SetColor";

function Enity(props) {
    const { data } = props;
    let colorTemp = setColorTemp(data.temperature)
    let colorHum = setColorHum(data.humidity)
    let colorLight = setColorLight(data.light)
    let colorDust = setColorDust(data.dust)

    return (
        <>
            <div className='temp flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3 transi'
                style={{ backgroundImage: `linear-gradient(to top right, #f7e9e9, ${colorTemp})` }}>
                <FaTemperatureLow className='text-red-600 text-6xl' />
                <p className="title text-2xl text-[#333] font-bold">
                    <span>{data.temperature}</span>
                    <span> ℃</span>
                </p>
            </div >

            <div className=' hum flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3'
                style={{ backgroundImage: `linear-gradient(to top right, #d6d5fd, ${colorHum})` }}>
                <FaDroplet className='text-blue-900 text-6xl' />
                <p className="title text-2xl text-[#333] font-bold">
                    <span>{data.humidity}</span>
                    <span> %</span>
                </p>
            </div>

            <div className='light flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3'
                style={{ backgroundImage: `linear-gradient(to top right, #fafdeb, ${colorLight})` }}>
                <FaRegLightbulb className='text-yellow-600 text-6xl' />
                <p className="title text-2xl text-[#333] font-bold">
                    <span>{data.light}</span>
                    <span> Lx</span>
                </p>
            </div>

            <div className='dust flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3'
                style={{ backgroundImage: `linear-gradient(to top right, #ffd6a9ba, ${colorDust})` }}>
                <FiWind className='text-gray-600 text-6xl' />
                <p className="title text-2xl text-[#333] font-bold">
                    <span>{data.dust}</span>
                    <span> %</span>
                </p>
            </div>
        </>
    )
}

export default Enity;