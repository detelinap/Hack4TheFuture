import {Injectable} from '@angular/core';
import {User} from "../model/user.model";

const USER_LIST: User[] = [
  {
    id: 1,
    name: "Gosho (student two)"
  },
  {
    id: 2,
    name: "Sasho (student one)"
  }
];


@Injectable()
export class UserService {

  userList: User[] = [];

  getUserInfo(id: number): User {
    const users: User[] = this.userList.filter(user => user.id === id);
    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }

  constructor() {
    this.populateUserList();
  }
  populateUserList() {
    this.userList = USER_LIST;
  }

}