import mongoose from "mongoose";
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    FirstName:{
        type: String
    },
    LastName:{
        type: String
    },
    Phone:{
        type: String
    },
    Email:{
        type: String
    },
    DayOfBirth:{
        type: Number
    },
    MonthOfBirth:{
        type: Number
    },
    YearOfBirth:{
        type: Number
    },
    Gender:{
        type: String
    },
    Wards:{
        type: Number
    },
    Address:{
        type: String
    },
    City:{
        type: Number
    },
    District:{
        type: Number
    },
    CardNumber:{
        type: String
    },
    CardGrantedDate:{
        type: String
    },
    CardGrantedPlace:{
        type: String
    },
    FontSideImage:{
        type: String
    },
    BackSideImage:{
        type: String
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'  
    }
})

export default mongoose.model('contact', ContactSchema)