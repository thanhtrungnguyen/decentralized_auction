import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
const ErrorPage = () => {
  const params = useLocation();
  console.log(params);
  return (
    <>
      <Header />
      <NavBar />
      <h1>${params}</h1>
      <Footer />
    </>
  );
};

export default ErrorPage;
