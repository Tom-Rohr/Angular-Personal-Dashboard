import {v4 as uuidv4} from 'uuid';

export class Todo {
    id: string
    completed: boolean =false

    constructor(public text: string, public cid?: string) {
        if (!cid){
            this.id = uuidv4()
        } else {
            this.id = cid
        }
    }

    /////////// FOR DEMO /////////////
    setId(id: string): void {this.id = id}//
    //////////////////////////////////
}