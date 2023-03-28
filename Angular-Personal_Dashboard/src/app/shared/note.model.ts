import { v4 as uuidv4 } from 'uuid'

export class Note {
    id: string
    title: string
    content: string

    constructor(title: string, content: string, cid?: string) {
        if(!cid) this.id = uuidv4()
        else this.id = cid
        this.title = title
        this.content = content
    }
}