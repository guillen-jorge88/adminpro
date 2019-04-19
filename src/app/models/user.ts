export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public avatar_img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}
}
