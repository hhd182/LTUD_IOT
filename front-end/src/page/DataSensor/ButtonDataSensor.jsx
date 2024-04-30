import { SearchOutlined } from '@ant-design/icons'
import DropDownDataSensor from './DropDownDataSensor';
import { useEffect, useState } from 'react';
import { Input } from 'antd';

function ButtonDataSenSor(props) {

    const { setColumnSeacrch, setValueSearch, valueSearch, isSearchAll, handleSearch } = props

    const [value, setValue] = useState("all");
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

    return (
        <>
            <div className=' w-[90%] mx-auto flex gap-x-7 bg-white border rounded-lg min-h-16 items-center pl-6 shadow-sm'>
                <DropDownDataSensor value={value} setValue={setValue} setColumnSeacrch={setColumnSeacrch} />
                <div className='flex gap-x-1 w-full'>
                    <div className=' flex flex-col '>
                        <Input onChange={handleChange}
                            value={valueSearch}
                            allowClear
                            placeholder="Search"
                            style={{ maxWidth: "200px" }}
                            disabled={isSearchAll}
                            status={(isNumber) ? "" : "error"}
                        />
                    </div>
                    <button className='flex items-center justify-center rounded-md w-10 hover:bg-gray-100'
                        onClick={() => handleSearch()}
                    >
                        <SearchOutlined />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ButtonDataSenSor;