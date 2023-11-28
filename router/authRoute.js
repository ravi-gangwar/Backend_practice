import { Router } from "express";

import {signup, signin} from "../controller/authController";




const authRouter = Router();
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);


export default authRouter;
