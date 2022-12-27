import styles from "../../styleCss/login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
// import { Button } from "@mui/material";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FooterCopy from "../../components/footer/FooterCopy";
import HeaderUser from "../../components/header/HeaderUser";
// import { useFetch } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hook/useFetch";
import createDOMPurify from "dompurify";
// import { JSDOM } from "jsdom";
const ViewNews = () => {
    // const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify();

    const { id } = useParams();
    const baseURL = `http://localhost:8800/api/news/getById/${id}`;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [role, setRole] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                setTitle(resp.data.Name);
                setContent(resp.data.Content__c);
                setData(resp.data);
                // console.log(resp.data);
                // console.log("axios get");
                // onCitySelect(sCity);
                // onDistrictSelect(sDistrict);
                // onWardSelect(sWard);
            });

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    //const [match, setMatch] = useState(null);
    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    const rawHTML = `<p>Trong 143 năm tồn tại, triều Nguyễn đã cho làm hơn 100 chiếc ấn đúc bằng vàng, bạc (kim bảo) hoặc chế tác từ ngọc quý (ngọc tỷ).  Tuy nhiên, có một số chiếc ấn đã bị đánh cắp hoặc tiêu hủy, số còn lại gồm 85 chiếc ấn với các chất liệu vàng, ngọc, bạc nay đang được lưu giữ, bảo quản tại Bảo tàng Lịch sử Quốc gia. Theo GS.TS Phạm Hồng Tung, trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG Hà Nội thì Ấn là vật biểu trưng cho quyền lực tối cao của hoàng đế và của cả triều đại. Ấn có một giá trị đặc biệt khi vương triều đó còn đang cai trị. Đấy là tín vật biểu hiện cho quyền lực của triều đình và ở cấp cao nhất là triều đình trung ương thì quyền lực đấy là quyền lực tập quyền. Ở chính quyền nào cũng vậy, khi chính quyền ấy còn đang trị vì, đang cai trị thì ấn là tín vật quan trọng nhất, nó tượng trưng cho quyền uy, quyền lực của vương triều Nguyễn. Còn sau khi vương triều đó không còn cai trị nữa thì tất cả những ấn đó chỉ còn giá trị di sản như là những hiện vật lịch sử.</p><p>Tại Bảo tàng lịch sử quốc gia Việt Nam, số kim ấn hầu như độc bản. Chúng có ý nghĩa về mặt cổ vật cũng như khẳng định văn vật của một đất nước, khẳng định vị thế của Việt Nam so với các nước trong khu vực thời bấy giờ. Ấn không chỉ là biểu thị cho quyền lực tối cao của hoàng đế mà còn gắn liền với những sự kiện trọng đại của đất nước dưới thời Nguyễn. Chính vì thế mỗi loại ấn đều có một cách sử dụng riêng và dùng cho một loại văn thư được chỉ định. TS Phan Thanh Hải – Giám đốc Sở Văn hóa, Thể thao tỉnh Thừa Thiên - Huế, thành viên Hội đồng di sản Quốc gia cho biết: Ví dụ như ấn Hoàng đế chi bảo hiện nay chúng ta đang rất quan tâm, bán đấu giá ở Pháp thì cái ấn đó chỉ sử dụng trong một số trường hợp đặc biệt thể hiện quyền lực của hoàng đế. Cũng là sử dụng quyền lực của hoàng đế nhưng trong trường hợp khác thì người ta lại sử dụng một loại ấn khác ví dụ như ấn Sắc mệnh chi bảo dùng để đóng các loại sắc phong thần. Còn một loại ấn nữa đóng cho tất cả văn bản mà liên quan đến dòng tộc nhà vua thì dùng ấn Hoàng đế tôn thân chi bảo. Có cái ấn thì gắn liền với tên tuổi nhà vua, có cái ấn thì gắn liền với tên tuổi của bà thái hậu nào đó gọi là Thái hậu chi bảo.</p><p>Về cấu trúc và kiểu dáng, các bảo tỷ nói chung bao gồm 2 phần: Thân ấn và quai ấn. Biểu tượng chủ yếu trên ấn là con rồng, chân có năm móng. Theo TS Nguyễn Đình Chiến, nguyên Phó Giám đốc Bảo tàng lịch sử Quốc gia, bên cạnh giá trị về lịch sử, ấn triều Nguyễn còn có giá trị nghệ thuật rất cao. Tất cả những sản phẩm này đều do ngự xưởng của triều Nguyễn chế tác. Số lượng ấn hiện nay còn lưu giữ được tổng số là 85 chiếc. Trong đó có những bộ ấn rất đặc biệt (như là bộ ấn được đúc ở đời vua Minh Mệnh) thì những ấn này đều có quai rồng, có loại rồng cuộn, có loại rồng đứng. Nhưng tất cả các ấn này đều có một đặc điểm là khắc rõ trọng lượng bao nhiêu, vàng bao nhiều tuổi và hình thức rất đẹp, trau chuốt. Ấn vàng có niên đại cổ nhất trong sưu tập là ấn Đại việt quốc Nguyễn chúa vĩnh trấn chi bảo được đúc dưới thời chúa Nguyễn Phúc Chu. Ấn này đã được lưu truyền qua các đời chúa Nguyễn sau đó lưu đến Nguyễn Ánh.</p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/kan-hoang-de-ton-chi-bao-1461406962.jpg"></img><p>Triều Nguyễn có rất nhiều ấn nhưng ấn lớn nhất là ấn Hoàng đế chi bảo. Đây cũng là chiếc kim ấn được truyền từ đời vua Minh Mệnh cho đến vị vua cuối cùng của triều Nguyễn là Bảo Đại. Hoàng đế chi bảo cũng là chiếc ấn được vua Bảo Đại trao cho đại diện chính quyền cách mạng tại Ngọ Môn. Sau ngày Toàn quốc kháng chiến không rõ thông tin về nơi lưu giữ ấn và kiếm. Năm 1952, hai cổ vật này đã rơi vào tay người Pháp và đến ngày 8/3/1952, người Pháp tổ chức lễ trao lại ấn kiếm cho cựu hoàng Bảo Đại với vai trò là Quốc trưởng, sau đó được đưa sang Pháp vào năm 1953. Đây cũng là chiếc ấn được dư luận quan tâm trong thời gian gần đây khi được đem ra bán đấu giá tại Pháp. Với nỗ lực từ Chính phủ, Bộ Văn hóa, Thể thao và Du lịch, Bộ Ngoại giao, hãng đấu giá Millon tại Pháp đã đưa ấn vàng “Hoàng đế chi bảo” ra khỏi danh mục cổ vật đấu giá ngày 31/10. Theo TS Phan Thanh Hải, ấn Hoàng đế chi bảo nó rất quý nhưng không chỉ ấn này mà chúng ta còn rất nhiều cổ vật khác nữa đang lưu lạc nước ngoài. Giải quyết vấn đề này thì cần tính toán đến chuyện tạo ra một hành lang pháp lý lâu dài để làm sao chúng ta đưa được những cổ vật quý về nước. Còn chuyện riêng đối với ấn này, sẽ đấu tranh pháp lý, thương lượng mua lại trực tiếp hay như thế nào thì câu chuyện còn đang dài ở phía trước. Trước mắt chúng ta thành công là nhà đấu giá Millon của Pháp đã đưa ấn này là khỏi danh mục đấu giá, đây cũng là thắng lợi đầu tiên và chúng ta cũng hy vọng những điều may mắn tiếp theo.</p><img src="https://ckeditor.com/apps/ckfinder/userfiles/files/kim-an-1-7329-1461397025.jpg"></img><p>Có thể nói, ấn vàng “Hoàng đế chi bảo” có ý nghĩa quan trọng về các giá trị văn hóa, lịch sử, nghệ thuật, chính trị. Việc sưu tầm, đưa ấn về Việt Nam, để bổ sung bộ sưu tập Kim Ngọc Bảo Tỷ và hoàn thiện nội dung trưng bày về triều Nguyễn trong tiến trình lịch sử Việt Nam của Bảo tàng Lịch sử quốc gia là hết sức ý nghĩa.</p>`;
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser userName={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <div className={styles.box}>{<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} />}</div>

            <Footer />
            <FooterCopy />
        </>
    );
};

export default ViewNews;
