import styles from "../../styleCss/stylesPages/forSellers/sellerCenter.module.css"
import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller"
const SellerCenter = () => {
    return (
        <>
            <Header />
            <NavBar />
            <div className={styles.container}>
                <SideBarSeller />
                <div className={styles.content}>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p> <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                    <p>content</p>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default SellerCenter
