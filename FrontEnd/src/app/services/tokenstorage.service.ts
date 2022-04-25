import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { User } from "../shared/user.model";


const TOKEN_KEY = 'x-auth-token';
const USER_KEY = 'user-token';
export class TokenStorage { 
    firstName = this.getUser().firstName; 
    userProfile: BehaviorSubject<User> = new BehaviorSubject<User>({ 
        firstName:this.firstName,
        lastname:'',
        email:'', 
    })

 constructor(){}

saveToken(token:string){ 
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,token)
}

saveUser(user:any){ 
    localStorage.removeItem(USER_KEY)
    localStorage.setItem(USER_KEY,JSON.stringify(user))
    this.userProfile.next(user)
}

getToken() {
const Token = localStorage.getItem(TOKEN_KEY)
return Token; 
}
getUser() {
    const user = localStorage.getItem(USER_KEY)
    const nouser:User = {
        firstName: "",
        lastname: "",
        email: ""
    }
    if(user){
        return JSON.parse(user);
    }
    else{
        return nouser
    }
}

signout(){ 
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY); 
    const user:User = {
        firstName: "",
        lastname: "",
        email: ""
    }
    this.userProfile.next(user);
}
}