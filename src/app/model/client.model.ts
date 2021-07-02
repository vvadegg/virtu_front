export class Client{
    constructor(
        public id:string, 
        public fio:String,
        public surName:String,
        public firstName:String,
        public middleName:String,
        public birthday:Date,
        public passSeries:String,
        public passNumber:String
        ){}
}

export class ClientUpdate{
    constructor(
        public surName:String,
        public firstName:String,
        public middleName:String,
        public birthday:Date,
        public passSeries:String,
        public passNumber:String
        ){}
}



export class ClientSearch{
    constructor(    
        public surName: String,
        public firstName: String,
        public middleName: String
        ){}
        
}