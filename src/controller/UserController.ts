import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupBusiness } from "../business/SingnupBusiness";
import { SignupInputDTO } from "../model/User";


export class UserController {

    async signup(req: Request, res: Response) {
        try {

            const singnupBusiness = new SignupBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            )

            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await singnupBusiness.execute(input)

            res.status(201).send({ token });

        } catch (error) {
            
            res.status(error.errorCode || 400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}    
