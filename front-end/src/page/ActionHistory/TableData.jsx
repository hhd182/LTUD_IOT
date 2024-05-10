import { Table } from 'antd';
const { Column } = Table;
function TableData(props) {
    const { listAction } = props
    return (
        <div className='w-[90%] h-[26rem] mx-auto bg-white items-center shadow-sm mt-5 rounded-2xl'>
            <Table style={{ height: 400 }} dataSource={listAction} pagination={false} bordered={true} size='small' scroll={{ y: 400, }} >
                <Column
                    title="ID"
                    dataIndex="id"
                    key="id"
                    align='center' />
                <Column
                    title="Devide"
                    dataIndex="device"
                    key="device"
                    align='center' />
                <Column
                    title="Action"
                    dataIndex="action"
                    key="action"
                    align='center' />
                <Column
                    title="Time"
                    dataIndex="createdAt"
                    key="createdAt"
                    align='center' />
            </Table>
        </div>
    )
}
export default TableData;