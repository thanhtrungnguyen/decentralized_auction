import { Outlet, Link } from "react-router-dom"
import Header from "../../components/header/HeaderUser"
import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import styles from "../../styleCss/stylesPages/news.module.css"
import { BsPencil, BsCalendar3, BsSearch } from "react-icons/bs"

const News = () => {
    return (
        <>
            <Header />
            <NavBar />
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.content}>
                        <img
                            className={styles.img}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <BsPencil className={(styles.icon, styles.colorPink)} />
                        <label className={styles.lable}>Surf Auxion</label>
                        <BsCalendar3 className={(styles.icon, styles.colorYellow)} />
                        <label className={styles.lable}>Aug 09 2020</label>
                        <div className={styles.title}>
                            Mauris at orci non vulputate diam tincidunt nec.
                        </div>
                        <div className={styles.des}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit
                            facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu
                            malesuada vitae ultrices in in neque, porta dignissim. Adipiscing
                            purus, cursus vulputate id id dictum at.
                        </div>
                        <Link className={styles.link} to="/">
                            Read More
                        </Link>
                    </div>
                    <div className={styles.content}>
                        <img
                            className={styles.img}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <BsPencil className={(styles.icon, styles.colorPink)} />
                        <label className={styles.lable}>Surf Auxion</label>
                        <BsCalendar3 className={(styles.icon, styles.colorYellow)} />
                        <label className={styles.lable}>Aug 09 2020</label>
                        <div className={styles.title}>
                            Mauris at orci non vulputate diam tincidunt nec.
                        </div>
                        <div className={styles.des}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit
                            facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu
                            malesuada vitae ultrices in in neque, porta dignissim. Adipiscing
                            purus, cursus vulputate id id dictum at.
                        </div>
                        <Link className={styles.link} to="/">
                            Read More
                        </Link>
                    </div>
                    <div className={styles.content}>
                        <img
                            className={styles.img}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <BsPencil className={(styles.icon, styles.colorPink)} />
                        <label className={styles.lable}>Surf Auxion</label>
                        <BsCalendar3 className={(styles.icon, styles.colorYellow)} />
                        <label className={styles.lable}>Aug 09 2020</label>
                        <div className={styles.title}>
                            Mauris at orci non vulputate diam tincidunt nec.
                        </div>
                        <div className={styles.des}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit
                            facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu
                            malesuada vitae ultrices in in neque, porta dignissim. Adipiscing
                            purus, cursus vulputate id id dictum at.
                        </div>
                        <Link className={styles.link} to="/">
                            Read More
                        </Link>
                    </div>
                    <div className={styles.pagination}>
                        <Link href="#">&laquo;</Link>
                        <Link href="#">1</Link>
                        <Link href="#">2</Link>
                        <Link href="#">3</Link>
                        <Link href="#">4</Link>
                        <Link href="#">5</Link>
                        <Link href="#">6</Link>
                        <Link href="#">&raquo;</Link>
                    </div>
                </div>
                <div className={styles.col2}>
                    <p className={styles.txtSearch}>Search</p>
                    <div className={styles.conS}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Search For Posts"
                        ></input>
                        <BsSearch className={styles.icon2} />
                    </div>
                    <br />
                    <br />
                    <p className={styles.txtSearch}>Recent Post</p>
                    <div className={styles.post}>
                        <img
                            className={styles.imgSmall}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                    <div className={styles.post}>
                        <img
                            className={styles.imgSmall}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                    <div className={styles.post}>
                        <img
                            className={styles.imgSmall}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                    <div className={styles.post}>
                        <img
                            className={styles.imgSmall}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default News
