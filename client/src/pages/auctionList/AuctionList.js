import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionList.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import PlaceABid from "../../components/popups/PlaceABid";

const AuctionList = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const baseURL = "http://localhost:8800/api/auction/";

  useEffect(() => {
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setData(resp.data);
    });
  }, [baseURL]);

  //   useEffect(()=>{
  //     const fetchData = async ()=>{
  //         setLoading(true);
  //         try {
  //             const res = await axios.get('http://localhost:8800/api/auction/');
  //             setData(res.data)
  //         } catch (error) {
  //             setError(error);
  //         }
  //         setLoading(false);
  //     };
  //     fetchData();
  //   },[]);

  return (
    <>
      <Header />
      <NavBar />

      <div className={styles.nav}>
        <p>Artwork & Upcoming Auction</p>
        <div id="navbarColor">
          <div>
            <span>Sort by:</span>
            <button>Best match</button>
            <div>
              <a href="#">Đường Dẫn 1</a>
              <a href="#">Đường Dẫn 2</a>
              <a href="#">Đường Dẫn 3</a>
            </div>
          </div>
          <div>
            <div>
              <input type="search" placeholder="Search" />
              <button>search</button>
            </div>
          </div>
        </div>
      </div>
      <section id="sidebar">
        <div>
          <p>Filter By Asset</p>
          <form>
            <div>
              <input type="checkbox" name="type" id="realestate" />
              <label for="realestate">Real estate</label>{" "}
            </div>
            <div>
              <input type="checkbox" name="type" id="liquidation" />
              <label for="liquidation">Liquidation Assets</label>
            </div>
            <div>
              <input type="checkbox" name="type" id="artwork" />
              <label for="artwork">Artwork</label>
            </div>
          </form>
          <p>Filter By Statuses</p>
          <form>
            <div>
              <input type="checkbox" name="type" id="upcoming" />
              <label for="upcoming">Upconming</label>{" "}
            </div>
            <div>
              <input type="checkbox" name="type" id="current" />
              <label for="current">Current auction</label>
            </div>
            <div>
              <input type="checkbox" name="type" id="past" />
              <label for="past">Past auction</label>
            </div>
          </form>
          <p>Filter By Starting Price</p>
          <form>
            <div>
              <input type="checkbox" name="type" id="1price" />
              <label for="1price">0 ETH - 10 ETH</label>
            </div>
            <div>
              <input type="checkbox" name="type" id="2price" />
              <label for="2price" class="pl-1 pt-sm-0 pt-1">
                10 ETH - 50 ETH
              </label>
            </div>
            <div>
              <input type="checkbox" name="type" id="3price" />
              <label for="3price">50 ETH - 100 ETH</label>
            </div>
            <div>
              <input type="checkbox" name="type" id="4price" />
              <label for="4price" class="pl-1 pt-sm-0 pt-1">
                100 ETH+
              </label>
            </div>
          </form>
        </div>
      </section>
      <section id="products">
        <div>
          {data.map((auction) => (
            <div>
              <div>
                <div>
                  <div>
                    <img src="https://image.thanhnien.vn/w1024/Uploaded/2022/ywfsm/2019_09_07/10_xfvb.jpg" />
                  </div>
                  <div>
                    <p>{auction.property.PropertyName}</p>

                    <p>{auction.property.PropertyInformation}</p>
                  </div>
                  <div>
                    <p>Current auction</p>
                    <div>
                      <p>Price:</p>
                      <p> {auction.auction.StartBid}</p>
                    </div>

                    <div>
                      <Link
                        to={`/auctiondetail/${auction.auction._id}`}
                        type="button"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div>
            <div>
              <nav aria-label="Page navigation example">
                <ul>
                  <li>
                    <a href="#" aria-label="Previous">
                      <span aria-hidden="true">&lt;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">..</a>
                  </li>
                  <li>
                    <a href="#">24</a>
                  </li>
                  <li>
                    <a href="#" aria-label="Next">
                      <span aria-hidden="true" class="font-weight-bold">
                        &gt;
                      </span>
                      <span class="sr-only">Next</span>{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AuctionList;
