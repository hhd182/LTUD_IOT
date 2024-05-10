import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker } from 'antd';
import { useState } from 'react';
import DropDownActionHistory from './DropDownActionHistory';
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

function ButtonActionHistory(props) {
    const { setDate, setDateTo, handleSearch, setdDeviceName } = props
    const dateFormat = 'DD/MM/YYYY'
    const customFormat = (value) => ` ${value.format(dateFormat)}`

    const [valueList, setValueList] = useState("all");

    const handleChangeDate = (date, dateString) => {
        if (dateString && dateString.length === 2) {
            const dayStart = dateString[0];
            const dayEnd = dateString[1];
            setDate(dayStart)
            setDateTo(dayEnd)
        }
    }

    return (
        <>
            <div className=' w-[90%] mx-auto flex gap-x-2 bg-white border rounded-lg min-h-16 items-center pl-6 shadow-sm'>
                <div className='flex gap-x-7'>
                    <div>
                        <DropDownActionHistory valueList={valueList} setValueList={setValueList} setdDeviceName={setdDeviceName} />
                    </div>
                    <div className='flex text-center justify-center items-center gap-x-1'>
                        <p className='text-{#333}'>Select date: </p>
                        <div className='border-b'>
                            <RangePicker
                                placement="bottomLeft"
                                format={customFormat}
                                onChange={handleChangeDate}
                                allowClear
                                bordered={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ButtonActionHistory;