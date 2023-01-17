import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const BiddingProperty = ({ property }) => {
    return (
        <div className={styles.con}>
            {/* <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" /> */}
            {/* <img
                className={styles.img}
                src={`http://localhost:8800/api/auction/images/${property.Properties_Media__r.records[0].Name}`}
                alt="images"
            /> */}
            {/* <p className={styles.title}>{sendAuction.PropertyName}</p> */}
            {/* <p className={styles.title}>{property}</p> */}
            {/* <p className={styles.title}>{property.Name} </p> */}
            <img className={styles.img} src={`https://www.nme.com/wp-content/uploads/2022/08/spyxfamily-part-2@2000x1270.jpg`} alt="images" />
            <p className={styles.title}>Property Name </p>
        </div>
    );
};

export default BiddingProperty;
