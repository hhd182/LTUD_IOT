import { BarsOutlined, AreaChartOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Tooltip, } from 'antd';
import { Link } from 'react-router-dom';
import iotImage from "../../../public/image/iot.png"
import logoOne from "../../../public/image/logo1.png"
import logoTwo from "../../../public/image/logo2.png"
import "./sidebar.scss"
const { Sider } = Layout;

function Sidebar(props) {
    const { setIsLoading, collapsed, setCollapsed } = props

    function handleClick() {
        setIsLoading(true)
    }

    const items = [
        {
            key: '1',
            icon:
                <Tooltip placement="right" color='#575757' fontSize="14px" title={collapsed ? 'Doash Board' : ''}>
                    <Link to="/"><AreaChartOutlined style={{ color: '#459BFF', fontSize: "22px" }} /></Link>
                </Tooltip >,
            label: !collapsed && <p className='ml-3 text-[14px]'>Doash Board</p>,
        },
        {
            key: '2',
            icon:
                <Tooltip placement="right" color='#575757' fontSize="14px" title={collapsed ? 'Data Sensor' : ''}>
                    <Link to="/datasensor"><BarsOutlined style={{ color: '#E1A0FF', fontSize: "22px" }} /></Link>
                </Tooltip>,
            label: !collapsed && <p className='ml-3 text-[14px]'>Data Sensor</p>,

        },
        {
            key: '3',
            icon:
                <Tooltip placement="right" color='#575757' fontSize="14px" title={collapsed ? 'Action History' : ''}>
                    <Link to="/actionhistory"><HistoryOutlined style={{ color: '#FFD336', fontSize: "22px" }} /></Link>
                </Tooltip>,
            label: !collapsed && <p className='ml-3 text-[14px]'>Action History</p>,
        },
        {
            key: '4',
            icon:
                <Tooltip placement="right" color='#575757' fontSize="14px" title={collapsed ? 'Profile' : ''}>
                    <Link to="/profile"><UserOutlined style={{ color: '#FFB992', fontSize: "22px" }} /></Link>
                </Tooltip>,
            label: !collapsed && <p className='ml-3 text-[14px]'>Profile</p>,
        },
    ];


    const handleMenuItemClick = (key) => {
        console.log('Menu item clicked:', key);
    }

    return (
        <div className={` sidebar transition-all h-screen duration-300 relative top-0 left-0 pt-4 ${collapsed ? "w-[80px]" : "w-[230px]"}`}>
            <div className="absolute right-[-20px] top-72 rounded-full justify-center cursor-pointer items-center w-10 h-10 flex z-40 shadow-md bg-white"
                onClick={() => setCollapsed(!collapsed)} >
                <svg className={`${collapsed ? "rotate-180" : "rotate-0"}`} width="16" height="20" viewBox="0 0 7 11" fill="none">
                    <path d="M6.24895 0.744059C5.93812 0.441891 5.44797 0.420307 5.11153 0.679309L5.03677 0.744059L0.751051 4.91074C0.440225 5.21293 0.418025 5.68946 0.684451 6.01656L0.751051 6.08926L5.03675 10.2559C5.37148 10.5814 5.91419 10.5814 6.24893 10.2559C6.55976 9.95373 6.58198 9.47719 6.31555 9.15009L6.24893 9.07741L2.56995 5.49995L6.24895 1.92257C6.55977 1.6204 6.58198 1.14381 6.31555 0.816726L6.24895 0.744059Z" fill="#A3A3A3">
                    </path>
                </svg>
            </div >

            <div className="sidebar-detail__wrap h-full w-full">
                <div className='w-full transition-all duration-300 flex justify-center items-center'>
                    <div className={`flex justify-center items-center rounded-lg transition-all duration-300 w-10/12 pb-2 border-b ${(!collapsed) ? "h-16" : "h-10"}`}>
                        {(!collapsed) && (
                            <img src={logoOne} alt="Logo" style={{ height: 70 }} />
                        )}

                        {(collapsed) && (
                            <img src={logoTwo} alt="Logo" style={{ height: 30 }} />
                        )}
                    </div>
                </div>
                <div className="sidebar-detail transition-all duration-300 pt-2">
                    <Sider onClick={() => handleClick()} width={"100%"} className={`sidebar-list ${collapsed ? "p-0" : "sidebar-items"}`}>
                        <div className="demo-logo-vertical" />
                        {/* <Menu onClick={handleMenuItemClick} theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
                    </Sider>
                </div>
                {(!collapsed) ?
                    (<div className='absolute w-[80%] bottom-0 justify-center items-center m-5 p-3 border rounded-lg border-sky-500'>
                        <div className='flex flex-col items-center size-40'>
                            <img src={iotImage} alt="IOT image"
                                style={{
                                    width: 130,
                                    height: 130
                                }}
                                loading='lazy' />
                            <span className='h-7 items-center pt-3 px-3 font-medium text-xs transition-colors'>
                                Lập trình ứng dụng IOT
                            </span>
                        </div>

                    </div>) : (<div className='absolute w-full bottom-0 mb-8'>
                        <div className='flex flex-col w-full items-center size-10'>
                            <Tooltip placement="right" color='#575757' fontSize="14px" title="Lập trình ứng dụng IOT">
                                <img src={iotImage} alt="IOT image"
                                    style={{
                                        width: 40,
                                    }}
                                    loading='lazy' />
                            </Tooltip>
                        </div>
                    </div>)}
            </div>

        </div >
    )
}

export default Sidebar;