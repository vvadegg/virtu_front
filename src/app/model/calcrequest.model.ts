export class CalcRequest{
    constructor(    
        public sum:Number,
        public dateStart:Date,
        public dateEnd:Date,
        public realtyType:String,
        public yearBuilding:String,
        public square:Number
        ){}
        
}