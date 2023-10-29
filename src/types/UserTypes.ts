
export type UserType = {
    fullname: string,
    username: string,
    email: string,
    password: string,
    birthday: string,
    gender: string

}


export type LoginCredentials = {
    _id: Object,
    username: string,
    email: string,
    fullname: string,
    password: string,
    birthday: string,
    gender: string

}

export type RecoverCodeUserType = {
    _id: Object,
    username: string,
    email:string
}



  