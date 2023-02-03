import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const BiddingProperty = ({ property }) => {
    return (
        <div className={styles.con}>
            <img
                className={styles.img}
                src={property ? `${property?.mediaUrl[0]}` : `https://www.nme.com/wp-content/uploads/2022/08/spyxfamily-part-2@2000x1270.jpg`}
                alt="images"
            />
            <p className={styles.title}>{property?.name} </p>
        </div>
    );
};

export default BiddingProperty;
