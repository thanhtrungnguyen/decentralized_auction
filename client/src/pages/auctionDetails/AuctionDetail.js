import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionDetail.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import PlaceABid from "../../components/popups/PlaceABid";

const AuctionDetail = () => {
  const [auction, setAuction] = React.useState(null);
  const { id } = useParams();
  const baseURL = `http://localhost:8800/api/auth/auctionDetail/${id}`;
  useEffect(() => {
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setAuction(resp.data);
    });
  });
  return (
    <>
      <Header />
      <NavBar />
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.row}>
            <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            {/* <img className={styles.img} src={`${auction.url}`} alt="images" /> */}
          </div>
          <div className={styles.row}>
            <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            {/* <img className={styles.img} src={`${auction.url}`} alt="images" /> */}
          </div>
          <div className={styles.row}>
            <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            {/* <img className={styles.img} src={`${auction.url}`} alt="images" /> */}
          </div>
        </div>
        <div className={styles.col2}>
          {/* <div className={styles.conI}> */}
          <img
            className={styles.img}
            src="https://www.w3schools.com/html/pic_trulli.jpg"
            alt="images"
          />
          {/* <img className={styles.img} src={`${auction.url}`} alt="images" /> */}
          {/* </div> */}
        </div>
        <div className={styles.col3}>
          {/* <div className={styles.conI}> */}
          <p className={styles.title}>Playwood arm chair</p>
          <p className={styles.txtBold}>Starting price : $300</p>
          {/* <p className={styles.txtBold}>Starting price : ${auction.startPrice}</p> */}
          <p className={styles.txtBold}>Asset Code : AAAAA1</p>
          {/* <p className={styles.txtBold}>Asset Code : ${auction.assetCode}</p> */}

          {/* <p className={styles.txt}>Registration Time : 31/11/2022 9:00AM</p>
          <p className={styles.txt}>
            Registration End Time : 03/12/2022 9:00AM
          </p> */}
          {/* <p className={styles.txtBold}>Auction Registration Fee : $100</p> */}
          {/* <p className={styles.txtBold}>Auction Registration Fee : ${auction.registrationFee}</p> */}
          <p className={styles.txtBold}>Down payment : $320</p>
          {/* <p className={styles.txtBold}>Down payment : ${auction.dowPayment}</p> */}
          <p className={styles.txt}>Auction Start Time : 31/12/2022 9:00AM</p>
          {/* <p className={styles.txt}>Auction Start Time : ${auction.startTime}</p> */}
          <p className={styles.txt}>Auction End Time : 31/12/2022 11:00AM</p>
          {/* <p className={styles.txt}>Auction End Time : ${auction.endTime}</p> */}
          {/* </div> */}
          <Popup
            trigger={<button className={styles.btn}>Register</button>}
            position="right center"
          >
            <PlaceABid />
          </Popup>
        </div>
      </div>
      <div className={styles.des}>
        <div className={styles.cont}>
          <div className={styles.colcont1}>
            <p className={styles.txtDesBold}>Description</p>
            <br />
            <p className={styles.txtDes}>Owner: Nguyen Van A</p>
            <p className={styles.txtDes}>Material, substance :</p>
            <p className={styles.txtDes}>Size : </p>
            <p className={styles.txtDes}>Year of creation : </p>
            <br />
            <p className={styles.txtDesBold}>Detailed Description</p>
            <textarea className={styles.area} placeholder="Describe"></textarea>
          </div>
          <div className={styles.colcont2}>
            <p className={styles.txtDesBold}>Pictures and videos</p>
          </div>
        </div>
      </div>
      <div className={styles.RelatedAuctions}>
        <p className={styles.title}>Related Auctions</p>
        <div className={styles.tb}>
          <div className={styles.col}>
            <img
              className={styles.img2}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            <p className={styles.txtImg}>Mens Fashion Wear</p>
            <p className={styles.txtImgS}>Starting price : $43.00</p>
          </div>
          <div className={styles.col}>
            <img
              className={styles.img2}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            <p className={styles.txtImg}>Mens Fashion Wear</p>
            <p className={styles.txtImgS}>Starting price : $43.00</p>
          </div>
          <div className={styles.col}>
            <img
              className={styles.img2}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            <p className={styles.txtImg}>Mens Fashion Wear</p>
            <p className={styles.txtImgS}>Starting price : $43.00</p>
          </div>
          <div className={styles.col}>
            <img
              className={styles.img2}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            />
            <p className={styles.txtImg}>Mens Fashion Wear</p>
            <p className={styles.txtImgS}>Starting price : $43.00</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuctionDetail;
