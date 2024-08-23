import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';//CORS provides a controlled way to override the Single Origin Policy by allowing servers to specify which origins can access their resources.
import conectarDB from "./config/db.js";
import ussersRoutes from "./routes/ussersRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";


const app = express(); //creating express app
app.use(express.json());//convert data of type json to a js object through req.body

dotenv.config();

conectarDB();

const permitedDom = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(permitedDom.indexOf(origin) !== -1) {
            callback(null, true); //the origin of the request is allowed | -1 means found it
        
    } else {
        callback(new Error('Dont have cors permission'));
    }
    },
};

app.use(cors( corsOptions));//tell express that we want to work with cors

app.use("/api/ussers", ussersRoutes) ;
app.use("/api/collections", collectionRoutes) ;


const PORT = process.env.PORT || 4000; //if not exist is 4000

app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`);
});