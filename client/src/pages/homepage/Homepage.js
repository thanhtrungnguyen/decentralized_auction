import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import HeaderUser from "../../components/header/HeaderUser"
import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import styles from "../../styleCss/stylesPages/hompage.module.css"
import { useParams } from "react-router-dom"
import jwt from "jsonwebtoken"
import { useState } from "react"
const HomePage = () => {
    const { username } = useParams()
    const { id, setId } = useState(null)
    const getUser = (req) => {
        const token = req.cookies.access_token
        // if (!token) {
        //     return next(createError(401, "You are not authenticated!"))
        // }
        jwt.verify(token, process.env.JWT, (err, user) => {
            // if (err) return next(createError(403, "Token is not valid!"))
            req.user = user
            // next()
            console.log(user.id)
        })
    }
    return (
        <>
            {(() => {
                if (username != null) {
                    return <HeaderUser username={username} />
                } else {
                    return <Header />
                }
            })()}
            <NavBar />
            <div>
                <div className={styles.banner}>
                    <div className={styles.col1}>
                        <p className={styles.txtRed}>
                            Best recommendation for your collection....
                        </p>
                        <p className={styles.txtTitle}>Latest collection trends 2022 </p>
                        <p className={styles.txtNormal}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est
                            adipiscing in phasellus non in justo.
                        </p>
                        <br />
                        <Link className={styles.btn} to="/auctionList">
                            Auction Now
                        </Link>
                    </div>
                    <div className={styles.col2}>
                        <img
                            className={styles.img}
                            src="https://vnn-imgs-f.vgcloud.vn/2020/03/26/10/bo-suu-tap-do-co-2.jpg"
                            alt="images"
                        />
                    </div>
                </div>
                <div className={styles.featured}>
                    <p className={styles.titleBule}>Featured Auctions</p>
                    <div className={styles.RelatedAuctions}>
                        <div className={styles.tb}>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Mens Fashion Wear</p>
                                <p className={styles.txtImgS}>Starting price : $43.00</p>
                                <Link className={styles.btnF} to="/">
                                    Auction Now
                                </Link>
                            </div>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Mens Fashion Wear</p>
                                <p className={styles.txtImgS}>Starting price : $43.00</p>
                                <Link className={styles.btnF} to="/">
                                    Auction Now
                                </Link>
                            </div>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Mens Fashion Wear</p>
                                <p className={styles.txtImgS}>Starting price : $43.00</p>
                                <Link className={styles.btnF} to="/">
                                    Auction Now
                                </Link>
                            </div>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Mens Fashion Wear</p>
                                <p className={styles.txtImgS}>Starting price : $43.00</p>
                                <Link className={styles.btnF} to="/">
                                    Auction Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.banner2}>
                    <div className={styles.colL}>
                        <img
                            className={styles.imgB}
                            src="https://www.w3schools.com/html/pic_trulli.jpg"
                            alt="images"
                        />
                    </div>
                    <div className={styles.colR}>
                        <p className={styles.titleBule}>
                            Unique Features Of leatest & <br />
                            Trending Auctions
                        </p>
                        <p className={styles.txtN}>
                            - All frames constructed with hardwood solids and laminates
                        </p>
                        <p className={styles.txtN}>
                            - Reinforced with double wood dowels, glue, screw - nails corner blocks
                            and machine nails{" "}
                        </p>
                        <p className={styles.txtN}>
                            - Arms, backs and seats are structurally reinforced{" "}
                        </p>
                        <br />
                        <Link className={styles.btnF} to="/">
                            Auction Now
                        </Link>
                    </div>
                </div>
                <div className={styles.LeatestNew}>
                    <p className={styles.titleBule}>Leatest News</p>
                    <div className={styles.RelatedAuctions}>
                        <div className={styles.tb}>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Top esssential Trends in 2022</p>
                                <p className={styles.txtImgS}>
                                    More off this less hello samlande lied much over tightly circa
                                    horse taped mightly
                                </p>{" "}
                                <Link className={styles.Link} to="/">
                                    Read more{" "}
                                </Link>
                            </div>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Top esssential Trends in 2022</p>
                                <p className={styles.txtImgS}>
                                    More off this less hello samlande lied much over tightly circa
                                    horse taped mightly
                                </p>{" "}
                                <Link className={styles.Link} to="/">
                                    Read more{" "}
                                </Link>
                            </div>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Top esssential Trends in 2022</p>
                                <p className={styles.txtImgS}>
                                    More off this less hello samlande lied much over tightly circa
                                    horse taped mightly
                                </p>{" "}
                                <Link className={styles.Link} to="/">
                                    Read more{" "}
                                </Link>
                            </div>
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src="https://www.w3schools.com/html/pic_trulli.jpg"
                                    alt="images"
                                />
                                <p className={styles.txtImg}>Top esssential Trends in 2022</p>
                                <p className={styles.txtImgS}>
                                    More off this less hello samlande lied much over tightly circa
                                    horse taped mightly
                                </p>
                                <Link className={styles.Link} to="/">
                                    Read more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomePage
