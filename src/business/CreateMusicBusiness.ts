import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostMusicInputDTO } from "../model/Music";
import { InvalidParameterError } from "../error/InvalidParameterError";


export class CreateMusicBusiness {
    constructor(
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}

    public async execute(input: PostMusicInputDTO) {
        if (!input.title || !input.file || !input.authorId || input.genres.length < 1) {
            throw new InvalidParameterError("Fill all the fields");
        }

    }

}