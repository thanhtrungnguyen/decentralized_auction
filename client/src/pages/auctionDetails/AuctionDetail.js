import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionDetail.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import PlaceABid from "../../components/popups/PlaceABid";
import useFetch from "../../hook/useFetch";
import ReactPlayer from "react-player";
import { Player } from "video-react";

const AuctionDetail = () => {
  // const [auction, setAuction] = useState(null);
  const { id } = useParams();
  const baseURL = `http://localhost:8800/api/auction/auctiondetail/${id}`;
  const { data, loading, error } = useFetch(baseURL);

  console.log(data);
  console.log(loading);
  return loading ? (
    "loading please wait"
  ) : (
    <>
      <Header />
      <NavBar />
      <div className={styles.container}>
        <div className={styles.col1}>
          {/* <div className={styles.col1}> */}
          <div className={styles.col3}>
            <div className={styles.row}>
              {/* <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            /> */}
              <img
                className={styles.img}
                src={`${data.MediaURL[0]}`}
                alt="images"
              />
            </div>
            <div className={styles.row}>
              {/* <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            /> */}
              <img
                className={styles.img}
                src={`${data.MediaURL[1]}`}
                alt="images"
              />
            </div>
            <div className={styles.row}>
              {/* <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            /> */}
              <img
                className={styles.img}
                src={`${data.MediaURL[2]}`}
                alt="images"
              />
            </div>
          </div>
          {/* </div> */}
          {/* <div className={styles.col2}> */}
          {/* <div className={styles.conI}> */}
          {/* <img
            className={styles.img}
            src="https://www.w3schools.com/html/pic_trulli.jpg"
            alt="images"
          /> */}
          <div className={styles.col4}>
            {/* <img
              className={styles.img2}
              src={`${data.MediaURL[2]}`}
              alt="images"
            /> */}
            {/* <ReactPlayer
              className={styles.video}
              url="youtube.com/watch?v=LuQ2YQ87ucw"
              width="85%"
              height="90%"
            /> */}
            <ReactPlayer
              className={styles.video}
              url="https://www.youtube.com/watch?v=CYH-Ac3XiUg"
              playing={true}
              controls={true}
              loop={true}
              muted={true}
              playsinline={true}
              onReady={true}
              width="85%"
              height="90%"
            />
            {/* <Player
              playsInline
              className={styles.video}
              poster={`${data.MediaURL[1]}`}
              ="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              width="85%"
              height="90%"
            /> */}
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
        <div className={styles.col2}>
          <p className={styles.title}>{data.PropertyName}</p>
          <p className={styles.txtBold}>Start Bid : ${data.StartBid}</p>

          <p className={styles.txt}>Auction Start Time : ${data.TimeStart}</p>
          <p className={styles.txt}>Auction End Time : ${data.TimeFinish}</p>
          {/* </div> */}
          <Popup
            trigger={<button className={styles.btn}>Place Bid</button>}
            position="right center"
          >
            <PlaceABid sendAuction={data} />
          </Popup>
        </div>
      </div>
      <br />
      <div className={styles.des}>
        <div className={styles.cont}>
          <p className={styles.txtDesBold}>Description</p>
          <label className={styles.area}>{data.PropertyInformation}</label>
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
