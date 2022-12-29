import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const BiddingProperty = ({ propertyObject }) => {
    return (
        <div className={styles.con}>
            {/* <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" /> */}
            <img
                className={styles.img}
                src={`http://localhost:8800/api/auction/images/${propertyObject.Properties_Media__r.records[0].Name}`}
                alt="images"
            />
            {/* <p className={styles.title}>{sendAuction.PropertyName}</p> */}
            {/* <p className={styles.title}>{property}</p> */}
            <p className={styles.title}>{propertyObject.Name} </p>
        </div>
    );
};

export default BiddingProperty;
