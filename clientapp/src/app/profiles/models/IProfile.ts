export interface IProfile {
    id:string;
    displayName:string;
    userName:string;
    image:string;
    photos:IProfileImage[]

}



export interface IProfileImage{
    id:string;
    imageUrl:string;
    imageFullPath:string;
    isMain:boolean;
}