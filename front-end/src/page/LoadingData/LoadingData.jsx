import { LoadingOutlined } from "@ant-design/icons";

function LoadingData() {
    return (
        <div className='w-full max-w-[112rem] pt-5 flex justify-center items-center min-h-[100vh]'>
            <div className="flex flex-col">
                <LoadingOutlined style={{ fontSize: 50 }} />
                <h1 className=" mt-4 font-medium text-lg ">Loading</h1>
            </div>

        </div>
    )
}

export default LoadingData;