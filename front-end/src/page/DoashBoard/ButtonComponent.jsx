/* eslint-disable react/prop-types */
import fanOff from '../../assets/img/fan-image.png'
import fanOn from '../../assets/img/fan.gif'
import airOff from '../../assets/img/air-image.png'
import airOn from '../../assets/img/air.gif'
import lightOff from '../../assets/img/flashlight-image.png'
import lightOn from '../../assets/img/flashlight.gif'
import { LoadingOutlined } from "@ant-design/icons";

function ButtonComponent(props) {
    const { isFanOn, isLightOn, handleClick, isActionFan, isActionLight, isAirOn, isActionAir } = props;

    return (
        <>
            <div className='flex w-full a justify-center items-center shadow-sm flex-col rounded-2xl h-32 bg-[#eeeeee]' >
                <img className='transition-all' width={80} src={isFanOn ? fanOn : fanOff} alt="" />
                {!isActionFan ? (
                    <div className="flex">
                        <button
                            className={`w-20 h-8 text-[#333] rounded-2xl mx-3 ${isFanOn ? 'bg-[#337e33]' : 'bg-[#d8d8d8]'}`}
                            onClick={() => handleClick("fan", "on")}
                            disabled={isFanOn === true}
                        >
                            On
                        </button>
                        <button
                            className={`w-20 h-8 text-[#333] rounded-2xl mx-3 ${isFanOn ? 'bg-[#d8d8d8]' : 'bg-[#dd4444]'}`}
                            onClick={() => handleClick("fan", "off")}
                            disabled={isFanOn === false}
                        >
                            Off
                        </button>
                    </div>
                ) : (
                    <LoadingOutlined style={{ fontSize: "30px" }} />)}
            </div >

            <div className='flex w-full a justify-center items-center shadow-sm flex-col rounded-2xl h-32 bg-[#eeeeee] ' >
                <img className='transition-all' width={80} src={isLightOn ? lightOn : lightOff} alt="" />
                {!isActionLight ? (
                    <div className="flex">
                        <button
                            className={`btn w-20 h-8 text-[#333] rounded-2xl mx-3 ${isLightOn ? 'bg-[#337e33]' : 'bg-[#d8d8d8]'}`}
                            onClick={() => handleClick("light", "on")}
                            disabled={isLightOn === true}
                        >
                            On
                        </button>
                        <button
                            className={`btn w-20 h-8 text-[#333] rounded-2xl mx-3 ${isLightOn ? 'bg-[#d8d8d8]' : 'bg-[#dd4444]'}`}
                            onClick={() => handleClick("light", "off")}
                            disabled={isLightOn === false}
                        >
                            Off
                        </button>
                    </div>
                ) : (
                    <LoadingOutlined style={{ fontSize: "30px" }} />)}

            </div>

            <div className='flex w-full a justify-center items-center shadow-sm flex-col rounded-2xl h-32 bg-[#eeeeee] ' >
                <img className='transition-all' width={80} src={isAirOn ? airOn : airOff} alt="" />
                {!isActionAir ? (
                    <div className="flex">
                        <button
                            className={`btn w-20 h-8 text-[#333] rounded-2xl mx-3 ${isAirOn ? 'bg-[#337e33]' : 'bg-[#d8d8d8]'}`}
                            onClick={() => handleClick("air", "on")}
                            disabled={isAirOn === true}
                        >
                            On
                        </button>
                        <button
                            className={`btn w-20 h-8 text-[#333] rounded-2xl mx-3 ${isAirOn ? 'bg-[#d8d8d8]' : 'bg-[#dd4444]'}`}
                            onClick={() => handleClick("air", "off")}
                            disabled={isAirOn === false}
                        >
                            Off
                        </button>
                    </div>
                ) : (
                    <LoadingOutlined style={{ fontSize: "30px" }} />)}

            </div>
        </>
    )
}

export default ButtonComponent;