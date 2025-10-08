import { ProductModel } from "./product-model";

export interface OrderModel {
    recipient:string
    phone:string
    email?:string
    address:string
    paymentType:string
    cardNumber:string
    cardHolder:string
    cardExp:string
    cvc:number
    products:ProductModel[]
}
