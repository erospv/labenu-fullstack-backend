import { Request, Response } from "express"
import { CreateMusicBusiness } from "../business/CreateMusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import {PostMusicInputDTO } from "../model/Music"
import { BaseDatabase } from "../data/BaseDatabase";


export class MusicController {

    async postMusic(req: Request, res: Response) {
        try {
            const musicBusiness = new CreateMusicBusiness(
                new MusicDatabase(),
                new IdGenerator(),
                new Authenticator()
            )

            const token = req.headers.authorization as string 

            const { title, file, genres, album } = req.body

            const postData: PostMusicInputDTO = {
                title,
                file,
                genres,
                album
            }

            await musicBusiness.execute(postData, token)

            res.sendStatus(201);

        } catch (error) {     
            res.status(error.errorCode || 400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }
}