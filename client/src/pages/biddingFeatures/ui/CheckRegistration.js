import { useFetchData } from "../../../hooks/useFetch";
import Loader from "../components/Loader";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import WaitingForAuctionTime from "./WaitingForAuctionTime";

const CheckRegistration = ({ auction, property }) => {
    const { loading, data, error } = useFetchData(`/auctionRegistration/user/${auction.auctionId}`);
    if (loading) return <Loader />;
    if (data?.auctionRegistration?.length === 0)
        return (
            <div className={styles.notification}>
                <p>You have not registered the auction.</p>
            </div>
        );
    return (
        <div>
            <WaitingForAuctionTime auction={auction} property={property} />
        </div>
    );
};

export default CheckRegistration;
