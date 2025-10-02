import { ProductModel } from "./product-model";

export interface OrderModel {
    recipient:string
    phone:number
    email?:string
    address:string
    products:ProductModel[]
    payment:string
}
