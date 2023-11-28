import userModel from "../model/userSchema";
import emailValidator from "email-validator"



const signup  = async (req, res) =>{
    const {name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword );

    //store in db
    if( !name && !email && !password&& !confirmPassword){
        return res.status(400).json({
            succuess: false,
            message: "Every field must be filled."
        })
    }

    const validEmail = emailValidator.validate(email);

    if(!validEmail){
        return res.status(400).json({
            succuess: false,
            message: "Not valid email id"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            succuess: false,
            message: "Password and ConfirmPassword not matched"
        })
    }


    try {
        const userInfo = userModel(req.body); // if structure of schema and coming data are same.
        const result = await userInfo.save();
        return res.status(200).json({
            succuess: true,
            data: result
        });
        
    } catch (e) {
        if(e.code === 11000){
            return res.status(400).json({
                succuess: false,
                message: "account already exists"
            })
        }
        return res.status(400).json({
            succuess: false,
            message: e.message
        })
    }
}


const signin = async (req, res)=>{

    try {
        const {email, password} = req.body;
    
        if(!email && !password){
            return res.status(400).json({
                succuess: false,
                message: "Every field is mandatory"
            })
        }
    
        const user = await userModel.findOne({
            email
        }).select('+password');
    
    
        if(!user && user.password !== password){
            return res.status(400).json({
                succuess: false,
                message: "Invlaid credentials"
            })
        }
    
        const token = user.JWTToken();
        user.password = undefined;
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
    
        res.cookie('token', token, cookieOption);
        res.status(200).json({
            succuess: true,
            data: user
        })
        console.log(user)
    } catch (error) {
        res.status(400).json({
            succuess: false,
            message: `Sign in Error ${error}`
        })
    }
}


export { signup, signin };