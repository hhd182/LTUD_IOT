import { TreeSelect } from 'antd';
import { memo } from 'react';

const DropDownActionHistory = (props) => {
    const { valueList, setValueList, setdDeviceName } = props

    let treeData = [
        {
            value: 'all',
            title: 'All',
        },
        {
            value: 'LIGHT',
            title: 'Light',
        },
        {
            value: 'FAN',
            title: 'Fan',
        },
    ]

    const onChange = (newValue) => {
        setValueList(newValue);
        setdDeviceName(newValue)
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
export default memo(DropDownActionHistory);