import React from "react";
import { Loading } from "web3uikit";
const Loader = () => {
    return (
        <div>
            <Loading fontSize={12} size={12} spinnerColor="#2E7DAF" spinnerType="wave" text="Loading..." />
        </div>
    );
};

export default Loader;
