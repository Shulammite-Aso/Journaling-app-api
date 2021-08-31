import { Request, Response } from "express";
import { omit } from "lodash";
import User from "../model/user.model";
import log from "../logger";

export async function handleUser(req: Request, res: Response) {
   try {
    const user = await User.create(req.body); 
    return res.send(omit(user.toJSON(), "password"));
   } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
   }
    
}