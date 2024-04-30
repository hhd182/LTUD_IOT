import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker } from 'antd';
import { useState } from 'react';
dayjs.extend(customParseFormat);

function ButtonActionHistory(props) {
    const { setDate, setDateTo, handleSearch } = props
    const dateFormat = 'DD/MM/YYYY'
    const customFormat = (value) => ` ${value.format(dateFormat)}`
    const currentDate = dayjs();
    const previousDate = currentDate.subtract(1, 'day');

    const [datePre, setDatePre] = useState(null)
    const [dateBack, setDateBack] = useState(null)

    const handleClickPre = (value) => {
        const date = value.format(dateFormat)
        setDatePre(date)
        setDate(date)
    }

    const handleClickBack = (value) => {
        const date = value.format(dateFormat)
        setDateBack(date)
        setDateTo(date)
    }

    const handleClickSearch = () => {
        console.log(">>>>>Check: ", datePre, dateBack);
    }

    return (
        <>
            <div className=' w-[90%] mx-auto flex gap-x-2 bg-white rounded-lg min-h-16 items-center pl-6 shadow-sm'>
                <div className='flex gap-x-7'>
                    <div className='flex text-center justify-center items-center gap-x-1'>
                        <p>Start: </p>
                        <DatePicker
                            defaultValue={dayjs(previousDate, dateFormat)}
                            format={customFormat}
                            style={{ width: 130 }}
                            onChange={handleClickPre}
                        />
                    </div>

                    <div className='flex text-center justify-center items-center gap-x-1'>
                        <p>End: </p>
                        <DatePicker
                            defaultValue={dayjs(currentDate, dateFormat)}
                            format={customFormat}
                            style={{ width: 130 }}
                            onChange={handleClickBack}
                        />
                    </div>
                </div>

                <button className='flex items-center justify-center rounded-md w-10 hover:bg-gray-100 h-8'
                    onClick={() => handleClickSearch()}
                >
                    <SearchOutlined />
                </button>

            </div>
        </>
    )
}

export default ButtonActionHistory;