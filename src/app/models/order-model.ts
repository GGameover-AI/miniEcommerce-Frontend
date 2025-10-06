import { ProductModel } from "./product-model";

export interface OrderModel {
    recipient:string
    phone:number
    email?:string
    address:string
    payment:string
    cardNumber:number
    cardHolder:string
    cardExp:string
    cvc:number
    products:ProductModel[]
}
