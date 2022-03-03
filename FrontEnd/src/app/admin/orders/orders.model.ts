import { Products } from "src/app/shared/products.model";
import { User } from "src/app/shared/user.model";
import { ShipmentInfo } from "../../checkout/shipmentInfo.model";
 
export class Orders { 
    public user : User
    public orderID: number
    public orderComplete:boolean
    public shipmentInfo: ShipmentInfo
    public createdAt: Date
    public orderAmount: number
    public _id: Object
    public product: Products
}