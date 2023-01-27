import React from "react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "web3uikit";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <MoralisProvider initializeOnMount={false}>
            <AuthProvider>
                <NotificationProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </BrowserRouter>
                </NotificationProvider>
            </AuthProvider>
        </MoralisProvider>
    </React.StrictMode>
);
