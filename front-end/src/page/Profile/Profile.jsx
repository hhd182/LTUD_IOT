import avt from "../../assets/img/avt.png"
import "./profile.scss"
import { FacebookOutlined, InstagramOutlined, GithubOutlined, } from "@ant-design/icons"

function Profile(props) {
    const { isLoading, setIsLoading, collapsed } = props
    return (
        <div className={`profile flex justify-center transition-all duration-300 ${(!collapsed) ? "sidebar-open" : ""}`}>
            <div class="home">
                <div class="home-content">
                    <div className="text-3xl font-bold text-[#333]">Hi, chào mọi người!!!
                        <br />
                        Tôi là Hoàng Hải Dương
                    </div>

                    <p className="text-[#333] text-lg font-medium">Hiện tại, tôi là sinh viên năm 4 tại
                        <span className="font-semibold"> Học viện Công nghệ Bưu chính Viễn thông</span>
                        , chuyên ngành của tôi là phát triển đa phương tiện.
                        Rất vui được gặp mọi người!!
                    </p>
                    <div class="contact mt-3 gap-x-2 height-center">
                        <p className="text-lg">Contact: </p>
                        <a href="https://www.facebook.com/hhdhihi/" target="_blank">
                            <FacebookOutlined className="hover:text-[#3b82f6]" style={{fontSize:25}} />
                        </a>
                        <a href="https://www.instagram.com/_hidwn.182/" target="_blank">
                            <InstagramOutlined className="hover:text-[#3b82f6]" style={{ fontSize: 25 }} />
                        </a>
                        <a href="https://github.com/hhd182" target="_blank">
                            <GithubOutlined className="hover:text-[#3b82f6]" style={{ fontSize: 25 }} />
                        </a>
                    </div>
                </div>
                <div class="home-img">
                    <img src={avt} alt="avatar" />
                </div>
            </div>
        </div>
    )
}

export default Profile;