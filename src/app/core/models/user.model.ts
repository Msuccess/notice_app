export interface UserModel {
  id: string;
  password: string;
  fullname: string;
  faculty: string;
  email: string;
  role: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}
