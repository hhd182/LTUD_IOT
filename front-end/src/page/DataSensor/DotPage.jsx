import { Pagination } from 'antd';

function DotPage(props) {
    const { setPageSelect, total, pageSelect, setPageSize, pageSize } = props

    const onChange = (page, pageSize) => {
        setPageSelect(page)
        setPageSize(pageSize)
    };

    return (
        <div key={pageSelect || pageSize} className='flex w-full items-center justify-center mt-8'>
            {/* <Pagination current={current} onChange={onChange} total={10} /> */}

            {/* <Pagination
                showSizeChanger={onShowSizeChange}
                // onChange={onChange}
                defaultCurrent={pageSelect}
                total={total}
            /> */}
            <Pagination
                showSizeChanger
                onChange={onChange}
                pageSize={pageSize}
                defaultCurrent={pageSelect}
                total={total}
            />

        </div>
    )
}

export default DotPage;

