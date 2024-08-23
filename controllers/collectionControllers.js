//Controllers receive requests, interact with models, and return responses.
import Collection from "../models/Collection.js";

const addCollection = async (req, res) => {
    const collection = new Collection(req.body);
    collection.usser = req.usser._id;

    try {
        const saveCollection = await collection.save();
        res.json(saveCollection);
    } catch (error) {
        console.log(error);
    }
};


const getCollections = async (req, res) => {
    const collections = await Collection.find()//.find returns json results within an array
    .where("usser")
    .equals(req.usser);
    
    res.json(collections);//Converts the JavaScript object or array passed to it into a JSON string and sends it as a response to the client.
};

const getCollection = async (req, res) => {
    const { id } = req.params;//we get id from url with req.params
    const collection = await Collection.findById(id);//This line is performing an operation to search for a specific document in a MongoDB collection by its ID

    if(!collection) {
        return   res.status(404).json({msg: 'Not found'});
    }
                                              //converts the _id of the authenticated user to a text string
    if ( collection.usser._id.toString() !== req.usser._id.toString()) {
        return res.json({ msg: "No valid action"});
    }

    req.json(collection);
    
};

const updateCollection = async (req, res) => {
    const { id } = req.params;
    const collection = await Collection.findById(id);

    if(!collection) {
        return res.status(404).json({msg: 'Not found'});
    }

    if ( collection.usser._id.toString() !== req.usser._id.toString()) {
        return res.json({ msg: "No valid action"});
    }

    //Update collection
    collection.name = req.body.name || collection.name; //If there are no changes, add the same information
    collection.text = req.body.text || collection.text;
    
    
    try {
        const updateCollection = await collection.save();
        res.json(updateCollection);
    } catch (error) {
        console.log(error)
    }
};

const deleteCollection = async (req, res) => {
    const { id } = req.params;
    const collection = await Collection.findById(id);

    if(!collection) {
        return   res.status(404).json({msg: 'Not found'});
    }

    if ( collection.usser._id.toString() !== req.usser._id.toString()) {
        return res.json({ msg: "No valid action"});
    }

    try {
        await collection.deleteOne();
        res.json({ msg: "deleted collection"});//removes a single document from a collection in the database
    } catch (error) {
        console.log(error);
    }
    
};
   

export { 
    addCollection, 
    getCollections,
    getCollection, 
    updateCollection, 
    deleteCollection
};

