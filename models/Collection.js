import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    usser: {
        type: mongoose.Schema.Types.ObjectId,//select id from schema
        ref: 'Ussers'//selct model
    },
    
    text: {
        type: String,
        required: true,
    },
   
    },
    {
        timestamps: true,//enable two colums on db
    }
    );

    const Collection = mongoose.model("Collection",collectionSchema );

    export default Collection;
