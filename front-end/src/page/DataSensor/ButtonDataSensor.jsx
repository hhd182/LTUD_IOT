import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { SearchOutlined } from '@ant-design/icons'
import DropDownDataSensor from './DropDownDataSensor';
import { useEffect, useState } from 'react';
import { Input, DatePicker } from 'antd';

function ButtonDataSenSor(props) {
    const dateFormat = 'DD/MM/YYYY'
    const customFormat = (value) => ` ${value.format(dateFormat)}`
    const { setColumnSeacrch, setValueSearch, valueSearch, isSearchAll, handleSearch, columnSearch } = props

    const [valueList, setValueList] = useState("all");
    useEffect(() => {
        if (isSearchAll) {
            setValueSearch("")
        }
    })
    const [isNumber, setIsNumber] = useState(true)
    const handleChange = (event) => {
        const inputValue = event.target.value;
        const isNumeric = /^[0-9]*$/.test(inputValue);
        setIsNumber(isNumeric)
        setValueSearch(inputValue);
    };

    const onChange = (date, dateString) => {
        setValueSearch(dateString)
    };

    return (
        <>
            <div className=' w-[90%] mx-auto flex gap-x-7 bg-white border rounded-lg min-h-16 items-center pl-6 shadow-sm'>
                <div>
                    <DropDownDataSensor valueList={valueList} setValueList={setValueList} setColumnSeacrch={setColumnSeacrch} />
                </div>
                {
                    (columnSearch != "all" ? (
                        <div className='flex gap-x-1 w-full'>
                            <div className=' flex flex-col '>
                                {(columnSearch == "createdAt") ?
                                    (<div className='border-b'>
                                        <DatePicker
                                            onChange={onChange}
                                            format={customFormat}
                                            style={{ width: "180px" }}
                                            allowClear
                                            placement="bottomLeft"
                                            bordered={false}
                                        />
                                    </div>

                                    )
                                    : (
                                        <Input onChange={handleChange}
                                            value={valueSearch}
                                            allowClear
                                            placeholder="Search"
                                            style={{ width: "180px" }}
                                            status={(isNumber) ? "" : "error"}
                                            onPressEnter={handleSearch}
                                        />
                                    )
                                }


                            </div>
                            <button className='flex items-center justify-center rounded-md w-10 hover:bg-gray-100'
                                onClick={() => handleSearch()}
                            >
                                <SearchOutlined />
                            </button>
                        </div>
                    ) : <></>)
                }
            </div>
        </>
    )
}

export default ButtonDataSenSor;