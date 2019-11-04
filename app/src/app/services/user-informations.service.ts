import { UserInformations } from "../models/UserInformations.model";
import { Subject } from "rxjs";

export class UserInformationsService {
    private users: UserInformations[] = [];
    userSubject = new Subject<UserInformations[]>()

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: UserInformations) {
        this.users.push(user)
        this.emitUsers()    
    }

}