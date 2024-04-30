import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './page/Header/Header.jsx';
import Dashboard from './page/DoashBoard/DoashBoard.jsx';
import DataSensor from './page/DataSensor/DataSensor.jsx';
import ActionHistory from './page/ActionHistory/ActionHistory.jsx';
import Sidebar from './page/SideBar/SideBar.jsx';
import { useState } from 'react';

function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Router>
                {/* <Header setIsLoading={setIsLoading} /> */}
                <div className=" flex h-screen w-screen">
                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Routes>
                        <Route path="/" element={<Dashboard isLoading={isLoading} setIsLoading={setIsLoading} collapsed={collapsed} />} />
                        <Route path="/datasensor" element={<DataSensor isLoading={isLoading} setIsLoading={setIsLoading} collapsed={collapsed} />} />
                        <Route path="/actionhistory" element={<ActionHistory isLoading={isLoading} setIsLoading={setIsLoading} collapsed={collapsed} />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App;