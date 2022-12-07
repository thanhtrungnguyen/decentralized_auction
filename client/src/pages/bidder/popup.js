import { Button } from "@web3uikit/core"
import { useState } from "react"
import HeaderBid from "../../components/header/HeaderBid"
import PlaceBid from "./popup/PlaceBid"

const PlaceBidButton = () => {
    const [buttonPopup, setButtonPopup] = useState(() => {
        return false
    })

    const setPopupTrue = () => {
        setButtonPopup(true)
    }

    return (
        <>
            <h1>Popup Bid</h1>
            <HeaderBid />
            <PlaceBid />
        </>
    )
}

export default PlaceBidButton
