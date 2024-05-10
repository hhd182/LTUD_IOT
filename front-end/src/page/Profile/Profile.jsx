import avt from "../../assets/img/avt.png"
import "./profile.scss"
import { FacebookOutlined, InstagramOutlined, } from "@ant-design/icons"

function Profile(props) {
    const { isLoading, setIsLoading, collapsed } = props
    return (
        <div className={`profile flex justify-center transition-all duration-300 ${(!collapsed) ? "sidebar-open" : ""}`}>
            <div class="home">
                <div class="home-content">
                    <h1>Hi, chào mọi người!!!
                        <br />
                        Tôi là Hoàng Hải Dương
                    </h1>

                    <p>Hiện tại, tôi là sinh viên năm 4 tại Học viện Công nghệ Bưu chính Viễn thông,
                        chuyên ngành của tôi là phát triển đa phương tiện.
                        Rất vui được gặp mọi người!!
                    </p>
                    <div class="contact row height-center">
                        <p>Contact: </p>
                        <a href="https://www.facebook.com/hhdhihi/" target="_blank">
                            <FacebookOutlined />
                        </a>
                        <a href="https://www.instagram.com/_hidwn.182/" target="_blank">
                            <InstagramOutlined />
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