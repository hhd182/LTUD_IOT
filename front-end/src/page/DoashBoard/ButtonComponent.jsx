/* eslint-disable react/prop-types */
import fanOff from '../../assets/img/fan-image.png'
import fanOn from '../../assets/img/fan.gif'
import lightOff from '../../assets/img/flashlight-image.png'
import lightOn from '../../assets/img/flashlight.gif'

function ButtonComponent(props) {
    const { isFanOn, isLightOn, handleClick } = props;

    return (
        <>
            <div className='flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3 bg-[#909090]' >
                <img className='transition-all' width={100} src={isFanOn ? fanOn : fanOff} alt="" />
                <div className="flex">
                    <button
                        className={`w-20 h-8 text-[#333] rounded-2xl mx-3 ${isFanOn ? 'bg-[#337e33]' : 'bg-[#d8d8d8]'}`}
                        onClick={() => handleClick("fan", "on")}
                        disabled={isFanOn === true}
                    >
                        On
                    </button>
                    <button
                        className={`w-20 h-8 text-[#333] rounded-2xl mx-3 ${isFanOn ? 'bg-[#d8d8d8]' : 'bg-[#913232]'}`}
                        onClick={() => handleClick("fan", "off")}
                        disabled={isFanOn === false}
                    >
                        Off
                    </button>
                </div>
            </div >

            <div className='flex justify-center items-center shadow-sm flex-col rounded-2xl h-44 gap-y-3 bg-[#909090] mt-10' >
                <img className='transition-all' width={100} src={isLightOn ? lightOn : lightOff} alt="" />
                <div className="flex">
                    <button
                        className={`w-20 h-8 text-[#333] rounded-2xl mx-3 ${isLightOn ? 'bg-[#337e33]' : 'bg-[#d8d8d8]'}`}
                        onClick={() => handleClick("light", "on")}
                        disabled={isLightOn === true}
                    >
                        On
                    </button>
                    <button
                        className={`w-20 h-8 text-[#333] rounded-2xl mx-3 ${isLightOn ? 'bg-[#d8d8d8]' : 'bg-[#913232]'}`}
                        onClick={() => handleClick("light", "off")}
                        disabled={isLightOn === false}
                    >
                        Off
                    </button>
                </div>
            </div>
        </>
    )
}

export default ButtonComponent;