import { Table } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Column } = Table;

function TableData(props) {
    const { listData, setTypeSort, setColumnSort } = props

    const statusSort = {
        notSort: "",
        asc: "ASC",
        desc: "DESC",
    }

    const [sortState, setSortState] = useState({
        temperature: statusSort.notSort,
        humidity: statusSort.notSort,
        light: statusSort.notSort,
    });

    function handleSortClick(column) {
        column = column.toLowerCase()
        setColumnSort(column)
        const newSortState = { ...sortState };

        Object.keys(newSortState).forEach(key => {
            if (newSortState[key] != column) {
                newSortState[key] = statusSort.notSort;
            }
        });

        switch (sortState[column]) {
            case statusSort.asc:
                newSortState[column] = statusSort.desc;
                break;
            case statusSort.desc:
                newSortState[column] = statusSort.notSort;
                break;
            default:
                newSortState[column] = statusSort.asc;
                break;
        }

        setTypeSort(newSortState[column])
        setColumnSort(column)
        setSortState(newSortState); // Cập nhật trạng thái mới
    }

    return (
        <div className={`w-[90%] ${listData.length >= 10 ? "h-[26rem]" : ""}  mx-auto bg-white items-center shadow-sm mt-5 rounded-2xl`}>
            <Table style={{ height: listData.length >= 10 ? "400px" : "" }} dataSource={listData} pagination={false} size='small' scroll={{ y: 400, }}>
                <Column title="Index" dataIndex="id" key="id" align='center' />
                <Column
                    title={
                        <div
                            className='flex justify-center cursor-pointer select-none '
                            onClick={(e) => handleSortClick(e.target.innerText)}>
                            <span>
                                Temperature
                            </span>
                            <div className=' absolute right-0 pr-4 '>
                                <div className=' flex flex-col '>
                                    <CaretUpOutlined className={`icon-sort ${sortState.temperature == statusSort.asc ? "icon-active" : ""}`} />
                                    <CaretDownOutlined className={`icon-sort ${sortState.temperature == statusSort.desc ? "icon-active" : ""}`} />
                                </div>
                            </div>
                        </div>
                    }
                    dataIndex="temperature"
                    key="temperature"
                    align='center' />
                <Column
                    title={
                        <div
                            className='flex justify-center cursor-pointer select-none '
                            onClick={(e) => handleSortClick(e.target.innerText)}>
                            <span>
                                Humidity
                            </span>
                            <div className=' absolute right-0 pr-4 '>
                                <div className=' flex flex-col '>
                                    <CaretUpOutlined className={`icon-sort ${sortState.humidity == statusSort.asc ? "icon-active" : ""}`} />
                                    <CaretDownOutlined className={`icon-sort ${sortState.humidity == statusSort.desc ? "icon-active" : ""}`} />
                                </div>
                            </div>
                        </div>
                    }
                    dataIndex="humidity"
                    key="humidity"
                    align='center' />
                <Column
                    title={
                        <div
                            className='flex justify-center cursor-pointer select-none '
                            onClick={(e) => handleSortClick(e.target.innerText)}>
                            <span>
                                Light
                            </span>
                            <div className=' absolute right-0 pr-4 '>
                                <div className=' flex flex-col '>
                                    <CaretUpOutlined className={`icon-sort ${sortState.light == statusSort.asc ? "icon-active" : ""}`} />
                                    <CaretDownOutlined className={`icon-sort ${sortState.light == statusSort.desc ? "icon-active" : ""}`} />
                                </div>
                            </div>
                        </div>
                    }
                    dataIndex="light"
                    key="light"
                    align='center' />
                <Column
                    title="Time"
                    dataIndex="createdAt"
                    key="createdAt"
                    align='center' />
            </Table >
        </div >
    )
}
export default TableData;