export interface IACtivity{
    id:string | number;
    title:string;
    description:string;
    category:string;
    date:Date;
    city:string;
    venue:string;
    attandees:IAttendees[]
    
}


export interface IAttendees{
    id:string | number | any;
    userName:string;
    displayName:string;
    image:string;
    isHost:boolean;
}

export interface IActivityEnvelope{
    activities:IACtivity[],
    activityCount:number;
}

