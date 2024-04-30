import {
    UserOutlined
} from '@ant-design/icons';
import './header.scss'
import { NavLink } from 'react-router-dom';

function Header(props) {
    const { setIsLoading } = props

    function handleClick() {
        setIsLoading(true)
    }

    return (
        <div className=" flex text-center absolute top-0 shadow-md w-full max-w-[112rem] h-[70px] z-[9999] bg-[#ededed] justify-center">
            <NavLink to="/" className="w-[200px] my-0 mx-1 hover:bg-gray-500" onClick={() => handleClick()}>
                <p className="inline-block size-full leading-[70px] text-deco text-[#3d3d3d] text-xl text font-semibold hover:text-white">
                    Doash Board
                </p>
            </NavLink>

            <NavLink to="/datasensor" className="w-[200px] my-0 mx-1 hover:bg-gray-500" onClick={() => handleClick()}>
                <p className="inline-block size-full leading-[70px] text-deco text-[#3d3d3d] text-xl text font-semibold hover:text-white">
                    Data Sensor
                </p>
            </NavLink>

            <NavLink to="/actionhistory" className="w-[200px] my-0 mx-1 hover:bg-gray-500" onClick={() => handleClick()}>
                <p className="inline-block size-full leading-[70px] text-deco text-[#3d3d3d] text-xl text font-semibold hover:text-white">
                    Action History
                </p>
            </NavLink>
            <NavLink to="/profile" className='icon-profile absolute flex text-center justify-center items-center'>
                <UserOutlined className='icon' style={{ fontSize: "25px" }} />
            </NavLink>



        </div>
    )
}

export default Header;