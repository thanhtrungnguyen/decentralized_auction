// import React from "react";
// import styles from "../../styleCss/stylesComponents/placeABid.module.css";
// import ConfirmPayment from "../../pages/bidder/ui/confirmPayment";
// import { Outlet, Link } from "react-router-dom";

// const PlaceABid = ({ sendAuction }) => {
//     // const myFunction = () => {
//     //   let x = document.getElementById("trans");
//     //   if (x.style.display === "none") {
//     //     x.style.display = "block";
//     //     console.log("none");
//     //   } else {
//     //     x.style.display = "none";
//     //   }
//     // };

//     return (
//         <>
//             <div className={styles.container}>
//                 <p className={styles.txtBlack}>Pay a bid</p>
//                 <p className={styles.txt}>You have selected:</p>
//                 <div>
//                     <div className={styles.info}>
//                         {/* <img
//               className={styles.img}
//               src="https://www.w3schools.com/html/pic_trulli.jpg"
//               alt="images"
//             /> */}
//                         <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" />
//                         <p className={styles.title}>{sendAuction.PropertyName}</p>
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <p className={styles.txtM}>Starting bid:</p>
//                         <p className={styles.txtNormal}>{sendAuction.StartBid}</p>
//                         <p className={styles.txtM}>Current bid:</p>
//                         <p className={styles.txtNormal}>6969 ETH</p>
//                         {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
//                         <p className={styles.txtM}>Auction ends in:</p>
//                         <p className={styles.txtNormal}>5d 5h 5m 55s </p>
//                     </div>
//                     <div className={styles.detail}>
//                         {/* <form> */}
//                         <p className={styles.title}>Place bid details:</p>
//                         <p className={styles.txtT}>Your bid must be at least 6969 ETH</p>
//                         {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
//                         <input className={styles.input} type="text"></input>
//                         <label className={styles.mess}>message</label>
//                         <br />
//                         <br />
//                         {/* <input
//                 className={styles.btn}
//                 type="submit"
//                 value="Place bid"
//               ></input> */}
//                         <button className={styles.btn}>
//                             <Link className={styles.btn} to="/confirmPayment">
//                                 Place bid
//                             </Link>
//                         </button>
//                         {/* </form> */}
//                     </div>
//                     <div id="trans" className={styles.transactions}>
//                         <div className={styles.col1}>
//                             <p className={styles.txtT}>Your transactions</p>
//                             <hr />
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                         </div>
//                         <div className={styles.col2}>
//                             <p className={styles.txtT}>Time</p>
//                             <hr />
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

//     return (
//         <>
//             <div className={styles.container}>
//                 <p className={styles.txtBlack}>Pay a bid</p>
//                 <p className={styles.txt}>You have selected:</p>
//                 <div>
//                     <div className={styles.info}>
//                         {/* <img
//               className={styles.img}
//               src="https://www.w3schools.com/html/pic_trulli.jpg"
//               alt="images"
//             /> */}
//                         <img className={styles.img} src={`http://localhost:8800/api/auction/images/${sendAuction.Properties_Media__r.records[0].Name}`} alt="images" />
//                         <p className={styles.title}>{sendAuction.Name}</p>
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <p className={styles.txtM}>Starting bid:</p>
//                         <p className={styles.txtNormal}>{sendAuction.Start_Bid__c}</p>
//                         <p className={styles.txtM}>Current bid:</p>
//                         <p className={styles.txtNormal}>6969 ETH</p>
//                         {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
//                         <p className={styles.txtM}>Auction ends in:</p>
//                         <p className={styles.txtNormal}>5d 5h 5m 55s </p>
//                     </div>
//                     <div className={styles.detail}>
//                         {/* <form> */}
//                         <p className={styles.title}>Place bid details:</p>
//                         <p className={styles.txtT}>Your bid must be at least 6969 ETH</p>
//                         {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
//                         <input className={styles.input} type="text"></input>
//                         <label className={styles.mess}>message</label>
//                         <br />
//                         <br />
//                         {/* <input
//                 className={styles.btn}
//                 type="submit"
//                 value="Place bid"
//               ></input> */}
//                         <button className={styles.btn}>
//                             <Link className={styles.btn} to="/confirmPayment">
//                                 Place bid
//                             </Link>
//                         </button>
//                         {/* </form> */}
//                     </div>
//                     <div id="trans" className={styles.transactions}>
//                         <div className={styles.col1}>
//                             <p className={styles.txtT}>Your transactions</p>
//                             <hr />
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                             <p className={styles.tran}>0xbe1d00bddaeee1ce235519ca9054677b213b85ac3e7ee81e9dfc31cdc6504a43</p>
//                         </div>
//                         <div className={styles.col2}>
//                             <p className={styles.txtT}>Time</p>
//                             <hr />
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                             <p className={styles.tran}>10 minutes ago</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PlaceABid;
