export enum userType {
  'common',
  'admin'
}
export class UserKeys{
  constructor (public kind: userType){}
}
export class User {
  uid: string;
  email: string;
  kind: userType;
  fireUser: firebase.default.auth.UserCredential
  constructor(
    uid: string,
    email: string,
    kind: userType,
    fireUser: firebase.default.auth.UserCredential)
  {
    this.uid = uid;
    this.email = email;
    this.kind = kind;
    this.fireUser = fireUser
  }
}
