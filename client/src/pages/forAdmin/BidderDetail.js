import styles from "../../styleCss/stylesPages/forAdmin/bidderDetail.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
const BidderDetail = () => {
    const { id } = useParams();
    const baseURL = `http://localhost:8800/api/bidder/bidderDetail/${id}`;
    const { data, loading, error } = useFetch(baseURL);
    console.log(data);
    console.log(loading);

    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <div className={styles.container}>
                <SideBarAdmin />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <p className={styles.title}>Personal Information</p>
                        <p className={styles.bold}>Basic Information</p>
                        <p className={styles.txt}>First Name</p>
                        <p className={styles.txt}>Last Name</p>
                        <p className={styles.txt}>Gender</p>
                        <p className={styles.txt}>Date of birth</p>
                        <p className={styles.txt}>Email address</p>
                        <p className={styles.txt}>Phone number</p>
                        <p className={styles.bold}>Address</p>
                        <p className={styles.txt}>Province/City</p>
                        <p className={styles.txt}>District</p>
                        <p className={styles.txt}>Wards</p>
                        <p className={styles.txt}>Specific address</p>
                        <p className={styles.bold}>Identity/Citizen Card</p>
                        <p className={styles.txt}>Card number</p>
                        <p className={styles.txt}>Card granted date</p>
                        <p className={styles.txt}>Card granted place</p>
                        <img className={styles.img} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        {/* <img
              className={styles.img}
              src={`http://localhost:8800/api/auction/images/${data.cardFront}`}
              alt="images"
            /> */}
                        <p className={styles.bold}>Account Information</p>
                        <p className={styles.txt}>Username</p>
                        <p className={styles.txt}>Password</p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.title}>.</p>

                        <p className={styles.bold}>.</p>
                        <p className={styles.txtR}>Tesfaye</p>
                        {/* <p className={styles.txtR}>${data.firstName}</p> */}
                        <p className={styles.txtR}>Wanjala</p>
                        {/* <p className={styles.txtR}>${data.lastName}</p> */}
                        <p className={styles.txtR}>Male</p>
                        {/* <p className={styles.txtR}>${data.gender}</p> */}

                        <p className={styles.txtR}>22/02/2000</p>
                        {/* <p className={styles.txtR}>${data.dateOfBirth}</p> */}

                        <p className={styles.txtR}>tarreau@gmail.com</p>
                        {/* <p className={styles.txtR}>${data.email}</p> */}

                        <p className={styles.txtR}>012345678</p>
                        {/* <p className={styles.txtR}>${data.phone}</p> */}

                        <p className={styles.bold}>.</p>

                        <p className={styles.txtR}>Hanoi</p>
                        {/* <p className={styles.txtR}>${data.city}</p> */}

                        <p className={styles.txtR}>Thach That</p>
                        {/* <p className={styles.txtR}>${data.district}</p> */}

                        <p className={styles.txtR}>Thach Hoa</p>
                        {/* <p className={styles.txtR}>${data.wards}</p> */}

                        <p className={styles.txtR}>Thach Hoa - Thach That - Hanoi</p>
                        {/* <p className={styles.txtR}>${data.specificAddress}</p> */}

                        <p className={styles.bold}>.</p>
                        <p className={styles.txtR}>34723987492308</p>
                        {/* <p className={styles.txtR}>${data.cardNumber}</p> */}

                        <p className={styles.txtR}>10/10/2020</p>
                        {/* <p className={styles.txtR}>${data.cardGrantedDate}</p> */}

                        <p className={styles.txtR}>Hanoi</p>
                        {/* <p className={styles.txtR}>${data.cardGrantedPlace}</p> */}

                        <img className={styles.img2} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        {/* <img
              className={styles.img2}
              src={`http://localhost:8800/api/auction/images/${data.cardBack}`}
              alt="images"
            /> */}
                        <p className={styles.bold}>.</p>
                        <p className={styles.txtR}>wanjala</p>
                        {/* <p className={styles.txtR}>${data.username}</p> */}

                        <p className={styles.txtR}>**********</p>
                        {/* <p className={styles.txtR}>${data.password}</p> */}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default BidderDetail;
