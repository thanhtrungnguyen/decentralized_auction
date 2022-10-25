const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    FirstName:{
        type: String
    },
    MiddleName:{
        type: String
    },
    LastName:{
        type: String
    },
    Phone:{
        type: String
    },
    Email:{
        type: Number
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
        type: String
    },
    Address:{
        type: String
    },
    City:{
        type: String
    },
    District:{
        type: String
    },
    CardNumber:{
        type: String
    },
    CardGrantedDate:{
        type: Date
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
    Title:{
        type: String
    },
    AccountId:{
        type: Schema.Types.ObjectId,
        ref: 'accounts'  
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users'  
    }
})

export default mongoose.model('contact', ContactSchema)