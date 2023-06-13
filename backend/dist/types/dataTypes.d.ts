export interface userDataType {
    fullName: string;
    email: string;
    password: string;
}
export interface ILogin {
    email: string;
    password: string;
}
export interface JwtPayload {
    email: string;
    exp: number;
}
export type IUser = {
    message: string;
    token: string;
};
