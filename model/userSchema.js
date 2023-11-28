import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'user name is Required'],
        minLength: [5, "name min length 5 char"],
        maxLength: [15, "name must be less than 15 char"],
        trim: true
    },
    email : {
        type : String,
        require: [true, "user email must be required"],
        unique: [true, "email already registered"],
        lowercase: true
    },
    password : {
        type : String,
        select: false
    },
    forgotPassword : {
        type: String
    },
    forgotPasswordExpiryDate : {
        type : String
    }
},{
    timestamps: true
});


userSchema.methods = {
    JWTToken() {
        return jwt.sign(
            {
                id: this._id, email: this.email
            },
            process.env.SECRET,
            { expiresIn: '24h' }
        );
    }
}


const userModel = mongoose.model('user', userSchema);
export default userModel;