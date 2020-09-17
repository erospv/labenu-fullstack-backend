export class Music { 
    constructor(
		private id: string,
		private title: string,
		private authorId: string,
        private file: string,
		private album: string
	) {}

	getId() {
		return this.id;
	}

	getTitle() {
		return this.title;
	}

	getAuthorId() {
		return this.authorId;
	}
    
    getFile() {
		return this.file;
    }
    
    getAlbum() {
        return this.album
    }

	setId(id: string) {
		this.id = id;
	}

	setTitle(title: string) {
		this.title = title;
	}

	setAuthorId(authorId: string) {
		this.authorId = authorId;
	}
    
    setFile(file: string) {
		this.file = file;
    }
    
    setAlbumId(album: string) {
        this.album = album
    }

	static toMusicModel(data: any): Music {
        return (
            data &&
            new Music(
                data.id,
                data.title,
                data.authorId,
                data.file,
                data.album
            )
        ) 
	}
}

export interface PostMusicInputDTO {
    title: string
    file: string,
    genres: string[],
    album: string
}

