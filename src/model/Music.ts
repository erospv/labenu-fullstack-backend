export class Music { 
    constructor(
		private id: string,
		private title: string,
		private authorId: string,
        private createdAt: string,
        private file: string,
		private albumId: string
	) {}

	getId() {
		return this.id;
	}

	getTitle() {
		return this.title;
	}

	getauthorId() {
		return this.authorId;
	}

	getcreatedAt() {
		return this.createdAt;
    }
    
    getFile() {
		return this.file;
    }
    
    getAlbumId() {
        return this.albumId
    }

	setId(id: string) {
		this.id = id;
	}

	setTitle(title: string) {
		this.title = title;
	}

	setauthorId(authorId: string) {
		this.authorId = authorId;
	}

	setcreatedAt(createdAt: string) {
		this.createdAt = createdAt;
    }
    
    setFile(file: string) {
		this.file = file;
    }
    
    setAlbumId(albumId: string) {
        this.albumId = albumId
    }

	static toMusicModel(data: any): Music {
        return (
            data &&
            new Music(
                data.id,
                data.title,
                data.authorId,
                data.createdAt,
                data.file,
                data.albumId
            )
        ) 
	}
}

export interface PostMusicInputDTO {
    title: string,
    authorId: string,
    file: string,
    albumId: string 
}

