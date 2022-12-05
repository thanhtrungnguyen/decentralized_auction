import { useLocation } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
const ErrorPage = ({ error }) => {
    return (
        <>
            <Header />
            <NavBar />
            <h1>{error.code}</h1>
            <h2>{error.message}</h2>
            <Footer />
        </>
    )
}

export default ErrorPage
