import { Pagination } from 'antd';

function DotPage(props) {
    const { setPageSelect, total, pageSelect } = props

    const onChange = (page) => {
        setPageSelect(prevPage => {
            if (prevPage !== page) {
                return page;
            }
        })
    };

    return (
        <div key={pageSelect} className='flex w-full items-center justify-center mt-4'>
            {/* <Pagination current={current} onChange={onChange} total={10} /> */}

            <Pagination
                showSizeChanger={false}
                onChange={onChange}
                defaultCurrent={pageSelect}
                total={total}
            />
        </div>
    )
}

export default DotPage;

