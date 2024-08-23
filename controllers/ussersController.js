import Ussers from "../models/Ussers.js";
import generateJWT from "../helpers/generateJWT.js";
import generarId from "../helpers/generateid.js";
import emailRegister from "../helpers/emailRegister.js"
import emailForgetPassword from "../helpers/emailForgetPassword.js";

//They receive requests from the client, interact with the models, 
//and then return a response to the client.

const register = async (req, res) => {
    const {email, name} = req.body;//contains data submitted from forms

    //prevent duplicated users
    const userExist = await Ussers.findOne({email});//Bring the registration information by checking your email
    if (userExist) {
        const error = new Error("User alredy exist");//error instance for additional information
        return res.status(400).json({msg: error.message});//Status code 400 indicates that the request sent by the client is incorrect or malformed, and the server cannot process it.
    }
    
    try {
        //Save new user
        const usser = new Ussers(req.body);//take the information from req.body and add it to the Usser model
        const saveUsser = await usser.save();//moongose ​​method to save a record .save()

        //send the email
        emailRegister({
            email,
            name,
            token: saveUsser.token
        });

        res.json(saveUsser);//save as json to user
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    const { usser } = req;
    res.json(usser);// json type response
};

const confirm = async(req, res) => {
    const { token } = req.params //req.params to read data from a url
    const confirmUsser = await Ussers.findOne({token}); //confirmUsser = object

    if(!confirmUsser){
        const error = new Error("Invalid Token");
        return res.status(404).json({ msg: error.message});//404 not found
    }
    try {
        confirmUsser.token = null; //deleting token
        confirmUsser.confirm  = true; 
        await confirmUsser.save();//in moongose ​​the save method saves a document in the db

        res.json({ msg: " User has been check correctly"});
    } catch (error) {
        console.log(error)
    }
};

const authenticate = async(req, res) => {
    const {email, password} = req.body

    //check if user exist
    const usser = await Ussers.findOne({email})

    if (!usser){
        const error = new Error("the user does not exist");
        return res.status(404).json({ msg: error.message});
    } 

    //check if the user is confirmed
    if (!usser.confirm) {
        const error = new Error("You acount is not confirmed");
        return res.status(403).json({msg: error.message});//403 The client does not have the necessary permissions
    }

    //Check password
    if (await usser.checkPassword(password)){
        //Authenticate
        res.json({
            _id: usser._id,
            name: usser.name,
            email: usser.email,
            token: generateJWT(usser.id),
        });
    } else {
        const error = new Error("The password is incorrect");
        return res.status(403).json({msg: error.message});
    }
};

const forgetPassword = async (req, res) => {
    const {email}= req.body;

    const usserExist = await Ussers.findOne({email});
    if (!usserExist) {//check if user exist
        const error = new Error("user does not exit");
        return res.status(400).json({ msg: error.message});
    }

    try {
        usserExist.token = generarId()
        await usserExist.save()

        //send email with instructions
        emailForgetPassword({
            email,
            name: usserExist.name,
            token: usserExist.token
        })

        res.json({msg: "we send you the email with instructions"});
    } catch (error) {
        console.log(error);
        
    }
};

const checkToken = async (req, res) => {
 const {token} = req.params;//params info of url

 const validToken = await Ussers.findOne({token});

 if (validToken){
    //the token is valid user exist
    res.json({ msg: "Valid token and user exist"});
 } else {
    const error = new Error('invalid token');
    return res.status(400).json({ msg: error.message});
 }

};

const newPassword = async(req, res) => {
    const {token}= req.params;
    const {password} = req.body;//body is what the user writes in forms 

    const usser = await Ussers.findOne({token});
    if(!usser){
        const error = new Error("Error");
        return res.status(400).json({msg: error.message});
    }

    try{
        usser.token = null;//clean password and token
        usser.password = password;
        await usser.save();
        res.json({msg: "Password modified correctly"});
    } catch (error) {
        console.log(error);
    }


};

export {
    register,
    perfil,
    confirm,
    authenticate,
    forgetPassword,
    checkToken,
    newPassword,
};