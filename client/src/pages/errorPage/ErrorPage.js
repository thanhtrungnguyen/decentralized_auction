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
            <h3>ErrorPage</h3>
            <Footer />
        </>
    )
}

export default ErrorPage
