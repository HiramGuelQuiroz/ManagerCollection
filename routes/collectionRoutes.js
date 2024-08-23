import express from "express";
const router = express.Router();
import {
    addCollection, 
    getCollections, 
    getCollection, 
    updateCollection, 
    deleteCollection
} from "../controllers/collectionControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

//router.route() is a function that allows you to create routes in a modular way
router 
    .route('/')
    .post(checkAuth ,addCollection)
    .get(checkAuth, getCollections);

router
    .route('/:id')
    .get(checkAuth , getCollection)
    .put(checkAuth, updateCollection)
    .delete(checkAuth, deleteCollection);

export default router;