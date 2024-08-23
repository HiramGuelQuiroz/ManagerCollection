import mongoose from "mongoose";
import bcrypt from "bcrypt"; //encryption labrary
import generarId from "../helpers/generateid.js";

const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true, //eliminate spaces
    },
    password: {
        type: String,
        required: true,
    },
    email: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
    },
    position: {
        type: String,
        default: null,
        trim: true,
    },
    token: {
        type: String,
        default: generarId(),//we use function for token value
    },
    confirm: {
        type: Boolean,
        default: false,
    },
    login: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: null,
    }
});

//using moongose hooks
usersSchema.pre("save", async function(next) { //pre = before | "save"= save on db
    //function, referring to the current object
    if(!this.isModified('password')){//this. refers to the current object
        next();//you tell Mongoose that the middleware has finished and that it can proceed with the next operation
    }
    const salt = await bcrypt.genSalt(2)//genSalt= hashing rounds 
    this.password = await bcrypt.hash(this.password, salt)//modified the password
});

//.methods functions that only run on this model
usersSchema.methods.checkPassword = async function (passwordForm) 
{
    return await bcrypt.compare(passwordForm, this.password);//take hashed password on db and the other
};

const Ussers = mongoose.model("Ussers", usersSchema);//register as a model
export default Ussers;

