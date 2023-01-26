import styles from "../../styleCss/stylesPages/forAdmin/bidderDetail.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import Time from "../../components/time/Time";
import moment from "moment";
import "moment/locale/vi";
const BidderOrganizationDetail = () => {
    const { id } = useParams();
    const baseURL = `/organization/getById/${id}`;
    const { data, loading, error } = useFetch(baseURL);
    const navigate = useNavigate();
    const cancel = () => {
        navigate("/listBidders");
    };

    const [role, setRole] = useState();

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarAdmin />
                <Time />
                <div className={styles.content}>
                    <p className={styles.title}>Organization Information</p>
                    <p className={styles.if}>Basic Information</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Organization Name</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.name}</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Tax Code</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.taxCode}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Tax Code Granted Date</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{moment(data.result.taxCodeGrantedDate).format("L")}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Tax Code Granted Place</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.taxCodeGrantedPlace}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Organization Specific Address</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.addressOrganization}</label>
                        </div>
                    </div>

                    <p className={styles.title}>Personal Information</p>
                    <p className={styles.if}>Basic Information</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>First Name</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.firstName}</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Last Name</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.lastName}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Gender</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.gender}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Date Of Birth</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}> {moment(data.result.individual.dateOfBirth).format("L")}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Email</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.email}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Phone</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.phone}</label>
                        </div>
                    </div>
                    <p className={styles.if}>Address</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Province/City</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.city}</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>District</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.district}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Wards</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.wards}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Specific Address</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.address}</label>
                        </div>
                    </div>
                    <br />

                    <p className={styles.if}>Citizen Card</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Card Number </label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.cardNumber}</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Card Granted Date</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{moment(data.result.individual.cardGrantedDate).format("L")}</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Card Granted Place</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>{data.result.individual.cardGrantedPlace}</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <img src={data.result.individual.frontSideImage} className={styles.img} alt="img"></img>
                        </div>
                        <div className={styles.r}>
                            <img src={data.result.individual.backSideImage} className={styles.img} alt="img"></img>
                        </div>
                    </div>
                    <br />
                    <br />
                    <button
                        className={styles.btn}
                        onClick={() => {
                            navigate("/listBidders");
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
            {/* <div className={styles.container2}>
                <SideBarAdmin />
                <div className={styles.content2}>
                    <div className={styles.left}>
                        <p className={styles.title}>Organization Information</p>
                        <p className={styles.bold}>Organization Information</p>
                        <p className={styles.txt}>Organization Name</p>
                        <p className={styles.txt}>Tax Code</p>
                        <p className={styles.txt}>Tax Code Granted Date</p>
                        <p className={styles.txt}>Tax Code Granted Place</p>
                        <p className={styles.txt}>Specific Address</p>
                        <p className={styles.txt}>Position</p>

                        <p className={styles.bold}>Basic Information</p>
                        <p className={styles.txt}>First Name</p>
                        <p className={styles.txt}>Last Name</p>
                        <p className={styles.txt}>Gender</p>
                        <p className={styles.txt}>Date of birth</p>
                        <p className={styles.txt}>Email address</p>
                        <p className={styles.txt}>Phone number</p>
                        <p className={styles.bold}>Address</p>
                        <p className={styles.txt}>Province/City</p>
                        <p className={styles.txt}>District</p>
                        <p className={styles.txt}>Wards</p>
                        <p className={styles.txt}>Specific address</p>
                        <p className={styles.bold}>Identity/Citizen Card</p>
                        <p className={styles.txt}>Card number</p>
                        <p className={styles.txt}>Card granted date</p>
                        <p className={styles.txt}>Card granted place</p>
                        <img
                            className={styles.img}
                            src={`http://localhost:8800/api/auction/images/${data.contact.Font_Side_Image__c}`}
                            alt="images"
                        />
                    </div>
                    <div className={styles.right}>
                        <p className={styles.title}>.</p>

                        <p className={styles.bold}>.</p>
                        <p className={styles.txtR}>{data.account.Name}</p>
                        <p className={styles.txtR}>{data.account.Tax_Code__c}</p>

                        <p className={styles.txtR}>{data.account.Tax_Code_Granted_Date__c}</p>

                        <p className={styles.txtR}>{data.account.Tax_Code_Granted_Place__c}</p>

                        <p className={styles.txtR}>{data.account.Specific_Address__c}</p>
                        <p className={styles.txtR}>{data.position}</p>
                        <p className={styles.bold}>.</p>

                        <p className={styles.txtR}>{data.contact.First_Name__c}</p>

                        <p className={styles.txtR}>{data.contact.Last_Name__c}</p>
                        <p className={styles.txtR}>{data.contact.Gender__c}</p>

                        <p className={styles.txtR}>{data.contact.Date_Of_Birth__c}</p>

                        <p className={styles.txtR}>{data.contact.Email__c}</p>

                        <p className={styles.txtR}>{data.contact.Phone__c}</p>

                        <p className={styles.bold}>.</p>

                        <p className={styles.txtR}>{data.contact.City__c}</p>

                        <p className={styles.txtR}>{data.contact.District__c}</p>

                        <p className={styles.txtR}>{data.contact.Wards__c}</p>

                        <p className={styles.txtR}>{data.contact.Address__c}</p>

                        <p className={styles.bold}>.</p>
                        <p className={styles.txtR}>{data.contact.Card_Number__c}</p>

                        <p className={styles.txtR}>{data.contact.Card_Granted_Date__c}</p>

                        <p className={styles.txtR}>{data.contact.Card_Granted_Place__c}</p>

                        <img
                            className={styles.img2}
                            src={`http://localhost:8800/api/auction/images/${data.contact.Back_Side_Image__c}`}
                            alt="images"
                        />

                        <p className={styles.bold}>.</p>

                        <input type="button" value="Back" className={styles.btnCancel} onClick={cancel}></input>
                    </div>
                </div>
                <Footer />
            </div> */}
        </>
    );
};
export default BidderOrganizationDetail;
