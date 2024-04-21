import { Table } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Column } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '8',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '9',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

function TableData() {
    const [iconTempActive, setIconTempActive] = useState(0)
    const [iconHumActive, setIconHumActive] = useState(0)
    const [iconLightActive, setIconLightActive] = useState(0)

    function handleClick(column) {
        if (column === "temperature") {
            if (iconTempActive === 2) {
                setIconTempActive(0)
            } else {
                setIconTempActive(iconTempActive + 1)
            }
        } else if (column === "humidity") {
            if (iconHumActive === 2) {
                setIconHumActive(0)
            } else {
                setIconHumActive(iconHumActive + 1)
            }
        } else {
            if (iconLightActive === 2) {
                setIconLightActive(0)
            } else {
                setIconLightActive(iconLightActive + 1)
            }
        }
    }

    return (
        <div className='w-[90%] mx-auto bg-white items-center shadow-sm mt-5 rounded-2xl'>
            <Table dataSource={data} pagination={false} bordered={true} size='small' >
                <Column title="Index" dataIndex="key" key="firstName" align='center' />
                <Column
                    title={
                        <div
                            className='flex justify-center cursor-pointer select-none '
                            onClick={() => handleClick("temperature")}>
                            <span>
                                Temperature
                            </span>
                            <div className=' absolute right-0 pr-4 '>
                                <div className=' flex flex-col '>
                                    <CaretUpOutlined className={`icon-sort ${iconTempActive == 1 ? "icon-active" : ""}`} />
                                    <CaretDownOutlined className={`icon-sort ${iconTempActive == 2 ? "icon-active" : ""}`} />
                                </div>
                            </div>
                        </div>
                    }
                    dataIndex="age"
                    key="age"
                    align='center' />
                <Column
                    title={
                        <div
                            className='flex justify-center cursor-pointer select-none '
                            onClick={() => handleClick("humidity")}>
                            <span>
                                Humidity
                            </span>
                            <div className=' absolute right-0 pr-4 '>
                                <div className=' flex flex-col '>
                                    <CaretUpOutlined className={`icon-sort ${iconHumActive == 1 ? "icon-active" : ""}`} />
                                    <CaretDownOutlined className={`icon-sort ${iconHumActive == 2 ? "icon-active" : ""}`} />
                                </div>
                            </div>
                        </div>
                    }
                    dataIndex="age"
                    key="age"
                    align='center' />
                <Column
                    title={
                        <div
                            className='flex justify-center cursor-pointer select-none '
                            onClick={() => handleClick("light")}>
                            <span>
                                Light
                            </span>
                            <div className=' absolute right-0 pr-4 '>
                                <div className=' flex flex-col '>
                                    <CaretUpOutlined className={`icon-sort ${iconLightActive == 1 ? "icon-active" : ""}`} />
                                    <CaretDownOutlined className={`icon-sort ${iconLightActive == 2 ? "icon-active" : ""}`} />
                                </div>
                            </div>
                        </div>
                    }
                    dataIndex="address"
                    key="address"
                    align='center' />
                <Column
                    title="Time"
                    dataIndex="address"
                    key="address"
                    align='center' />
            </Table>
        </div>
    )
}
export default TableData;