import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import  "../../styleCss/auctionList.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import Popup from "reactjs-popup";
import PlaceABid from "../../components/popups/PlaceABid";

import 'bootstrap/dist/css/bootstrap.min.css';


const AuctionList = () => {
 
  const [buttonPopup, setButtonPopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

 const baseURL = 'http://localhost:8800/api/auction/';

 

  useEffect(() => {
   
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setData(resp.data);
    });
  },[baseURL]);

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
      <div class ="body">
      <nav class="navbar navbar-expand-sm navbar-light bg-white border"> <a
          class="navbar-brand ml-2 font-weight-bold" href="#">Artwork & Upcoming Auction</a> <button class="navbar-toggler"
            type="button" data-toggle="collapse" data-target="#navbarColor" aria-controls="navbarColor"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span> </button>

          <div class="collapse navbar-collapse" id="navbarColor">

            <div class="dropdown">
              <span>Sort by:</span>
              <button class="nut_dropdown">Best match</button>
              <div class="noidung_dropdown">
                <a href="#">Đường Dẫn 1</a>
                <a href="#">Đường Dẫn 2</a>
                <a href="#">Đường Dẫn 3</a>
              </div>
            </div>
            <div class="col-xs-3">
                <div class="input-group ps-5">
              <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              <button type="button" class="btn btn-outline-primary">search</button>
            </div>
            </div>
            



          </div>

        </nav>
        <section id="sidebar">

          <div>
            <h6 class="p-1">Filter By Asset</h6>
            <form class="ml-md-2">
              <div class="form-inline border rounded p-sm-2 my-2"> <input type="checkbox" name="type" id="realestate" />
                <label for="realestate" class="pl-1 pt-sm-0 pt-1">Real estate</label> </div>
              <div class="form-inline border rounded p-sm-2 my-2"> <input type="checkbox" name="type" id="liquidation" />
                <label for="liquidation" class="pl-1 pt-sm-0 pt-1">Liquidation Assets</label> </div>
              <div class="form-inline border rounded p-md-2 p-sm-1"> <input type="checkbox" name="type" id="artwork" />
                <label for="artwork" class="pl-1 pt-sm-0 pt-1">Artwork</label>
              </div>

            </form>
            <h6 class="p-1">Filter By Statuses</h6>
            <form class="ml-md-2">
              <div class="form-inline border rounded p-sm-2 my-2"> <input type="checkbox" name="type" id="upcoming" /> <label
                for="upcoming" class="pl-1 pt-sm-0 pt-1">Upconming</label> </div>
              <div class="form-inline border rounded p-sm-2 my-2"> <input type="checkbox" name="type" id="current" /> <label
                for="current" class="pl-1 pt-sm-0 pt-1">Current auction</label> </div>
              <div class="form-inline border rounded p-sm-2 p-sm-1"> <input type="checkbox" name="type" id="past" />
                <label for="past" class="pl-1 pt-sm-0 pt-1">Past auction</label>
              </div>
            </form>
            <h6 class="p-1">Filter By Starting Price</h6>
            <form class="ml-md-2">
              <div class="form-inline border rounded p-sm-2 my-2"> <input type="checkbox" name="type" id="1price" /> <label
                for="1price" class="pl-1 pt-sm-0 pt-1">0 ETH - 10 ETH</label> </div>
              <div class="form-inline border rounded p-sm-2 my-2"> <input type="checkbox" name="type" id="2price" /> <label
                for="2price" class="pl-1 pt-sm-0 pt-1">10 ETH - 50 ETH</label> </div>
              <div class="form-inline border rounded p-md-2 my-2"> <input type="checkbox" name="type" id="3price" />
                <label for="3price" class="pl-1 pt-sm-0 pt-1">50 ETH - 100 ETH</label>
              </div>
              <div class="form-inline border rounded p-md-2 p-sm-1"> <input type="checkbox" name="type" id="4price" />
                <label for="4price" class="pl-1 pt-sm-0 pt-1">100 ETH+</label>
              </div>
            </form>
          </div>
        </section>
        <section id="products">
          <div class="container">
            {
              data.map(auction =>
                <div class="row">
                <div class="col-md-9">
                  <div class="row p-1 bg-white border rounded">
                    <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image"
                      src="https://image.thanhnien.vn/w1024/Uploaded/2022/ywfsm/2019_09_07/10_xfvb.jpg" /></div>
                    <div class="col-md-6 mt-1">
                      <h4>{auction.property.PropertyName}</h4>
  
  
                      <p class="text-justify text-truncate para mb-0  ">{auction.property.PropertyInformation}</p>
                    </div>
                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                      <h6 class="text-success">Current auction</h6>
                      <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">Price:</h4>
                        <h4 class="mr-1"> {auction.auction.StartBid}</h4>
                      </div>

                      <div class="d-flex flex-column mt-4">
                      
                      <Link to = {`/auctiondetail/${auction.auction._id}`} class="btn btn-outline-primary btn-sm mt-2"
                        type="button">Details</Link>
                       
                        </div>
                    </div>
                  </div>
                </div>
  
              </div> 
              )
            }
            <div class="row mt-3">
                <div class="paginationgr">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"> <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true" class="font-weight-bold">&lt;</span>
                                    <span class="sr-only">Previous</span> </a> </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">..</a></li>
                            <li class="page-item"><a class="page-link" href="#">24</a></li>
                            <li class="page-item"> <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true" class="font-weight-bold">&gt;</span>
                                    <span class="sr-only">Next</span> </a> </li>
                        </ul>
                    </nav>
                </div>
            </div>
          </div>
          
          


        </section>
        </div>  
      <Footer />
    </>
  );
};

export default AuctionList;
