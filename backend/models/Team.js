import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    designation : {
        type : String,
        enum : [
            "President",
            "Vice President",
            "Secretary",
            "Vice Secretary",
            "Treasurer",
            "Tech Lead",
            "Tech Member",
            "Graphics Lead",
            "Graphics Member",
            "Executive Member"
        ]
    },
    image : {
        type : String,

    },
    social_links : {
        
    },
    bio : {
        type : String,
    },
    address:{
        type : String,
    },
    contact : {
        type : String,
    }
});

export const Team = mongoose.model("Teams", teamSchema);