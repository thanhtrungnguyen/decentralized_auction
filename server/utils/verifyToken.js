const jwt = require("jsonwebtoken");
const { createError } = require("./error.js");

//define role
const BIDDER = "BIDDER";
const SELLER = "SELLER";
const ADMIN = "ADMIN";

//verify access_token
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};
//check author Seller
const verifySeller = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === SELLER) {
            next();
        } else {
            return next(createError(403, "you are not authorized!"));
        }
    });
};

//check author Admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == ADMIN) {
            next();
        } else {
            return next(createError(403, "you are not authorized!"));
        }
    });
};
const verifyBidder = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == BIDDER) {
            next();
        } else {
            return next(createError(403, "you are not authorized!"));
        }
    });
};
module.exports = { verifyToken, verifySeller, verifyAdmin, verifyBidder };
