import { TreeSelect } from 'antd';
import { memo } from 'react';

const DropDownDataSensor = (props) => {
    const { valueList, setValueList, setColumnSeacrch } = props

    let treeData = [
        {
            value: 'all',
            title: 'All',
        },
        {
            value: 'temperature',
            title: 'Temperature',
        },
        {
            value: 'light',
            title: 'Light',
        },
        {
            value: 'humidity',
            title: 'Humidity',
        },
        {
            value: 'dust',
            title: 'Wind',
        },
        {
            value: 'createdAt',
            title: 'Time',
        },

    ]

    const onChange = (newValue) => {
        setValueList(newValue);
        setColumnSeacrch(newValue)
    }

    return (
        <>
            <TreeSelect
                style={{
                    width: '120px',
                    textAlign: 'center'
                }}
                value={valueList}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                onChange={onChange}
                treeData={treeData}
                defaultValue="All"
            // defaultOpen='true'
            />
        </>
    );
};
export default memo(DropDownDataSensor);