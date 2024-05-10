import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/DoashBoard/DoashBoard.jsx';
import DataSensor from './page/DataSensor/DataSensor.jsx';
import ActionHistory from './page/ActionHistory/ActionHistory.jsx';
import Sidebar from './page/SideBar/SideBar.jsx';
import Profile from './page/Profile/Profile.jsx';
import NoData from './page/NoData/NoData.jsx';
import { useState } from 'react';

function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    const [isActionFan, setIsActionFan] = useState(false)
    const [isActionLight, setIsActionLight] = useState(false)

    return (
        <>
            <Router>
                {/* <Header setIsLoading={setIsLoading} /> */}
                <div className=" flex w-screen">
                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isLoading={isLoading} setIsLoading={setIsLoading} />
                    <Routes>
                        <Route path="/" element={<Dashboard
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            collapsed={collapsed}
                            isActionFan={isActionFan}
                            setIsActionFan={setIsActionFan}
                            isActionLight={isActionLight}
                            setIsActionLight={setIsActionLight}
                        />} />
                        <Route path="/datasensor" element={<DataSensor
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            collapsed={collapsed} />} />
                        <Route path="/actionhistory" element={<ActionHistory
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            collapsed={collapsed} />} />
                        <Route path="/profile" element={<Profile
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            collapsed={collapsed} />} />
                        <Route path="/nodata" element={<NoData />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App;