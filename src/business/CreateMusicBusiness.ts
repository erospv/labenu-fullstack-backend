import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostMusicInputDTO, Music } from "../model/Music";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";



export class CreateMusicBusiness {
    constructor(
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}

    public async execute(input: PostMusicInputDTO, token: string): Promise<void> {
        if(!token) {
            throw new UnauthorizedError("User must be logged");
        }

        if (!input.title || !input.file || !input.authorId || input.genres.length < 1) {
            throw new InvalidParameterError("Fill all the fields");
        }

        const authenticationData = this.authenticator.getData(token)

        const musicId = this.idGenerator.generate()

        const newMusic = Music.toMusicModel({
            id: musicId,
            title: input.title,
            authorId: authenticationData.id,
            file: input.file,
            albumId: input.album
        })

        await this.musicDatabase.createMusic(newMusic) 
        const genresDB = await this.musicDatabase.getGenresIdsByNames(input.genres)
        await this.musicDatabase.insertGenresToMusic(genresDB, musicId)
        
    }
}