import { Pagination } from 'antd';

function DotPage(props) {
    const { setPageSelect, total, pageSelect, pageSize, setPageSize } = props

    const onChange = (page, pageSize) => {
        setPageSelect(page)
        setPageSize(pageSize)
    };

    return (
        <div key={pageSelect} className='flex w-full items-center justify-center mt-8'>
            {/* <Pagination current={current} onChange={onChange} total={10} /> */}

            <Pagination
                showSizeChanger={true}
                pageSize={pageSize}
                onChange={onChange}
                defaultCurrent={pageSelect}
                total={total}
            />
        </div>
    )
}

export default DotPage;

