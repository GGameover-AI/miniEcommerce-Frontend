import { ProductModel } from "./product-model"

export interface OrderHistoryModel {
    recipient:string
    phone:number
    email?:string
    address:string
    payment:string
    products:ProductModel[]
}
