export class Cart{
    public _id:object;
    public prodId:number;
    public name:string;
    public imagePath: string; 
    public quantity: number;
    public price: number; 
    public subtotal:number;
    public prodQuantity:number
    public productUrl: string
    public opq:number

    constructor(_id:object,prodId:number,name:string, imagePath:string,quantity:number,price:number,subtotal:number,prodQuantity:number, productUrl:string, opq:number){
        this._id = _id;
        this.prodId = prodId
        this.name = name;
        this.imagePath = imagePath; 
        this.quantity = quantity;
        this.price = price;
        this.subtotal = subtotal;
        this.prodQuantity = prodQuantity;
        this.productUrl = productUrl;
        this.opq = opq
    }
}