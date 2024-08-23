import express from "express";
const router = express.Router(); //routing fuctions
import { register, perfil, confirm, authenticate, forgetPassword, checkToken, newPassword } from "../controllers/ussersController.js";
import checkAuth from '../middleware/authMiddleware.js';

//Public area
router.post("/", register );
router.get("/confirm/:token", confirm);// /: to use a dynamic parameter (token)
router.post('/login', authenticate);
router.post('/forget-password', forgetPassword);//generate url
router.route("/forget-password/:token").get(checkToken).post(newPassword);//allowing to chain different HTTP methods (such as GET, POST, PUT, DELETE)

//Private area
router.get("/perfil", checkAuth ,perfil);//customs middlewares

export default router;

//A middleware in JavaScript is an intermediate function 
//that allows you to control and modify the flow of HTTP
 //requests before reaching the final controller.