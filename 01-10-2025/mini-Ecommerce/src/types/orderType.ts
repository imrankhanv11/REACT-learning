export type OrderItemType = {
    productId : number,
    quantity: number,
    total: number
}

export type OrderType = {
    orderId: number,
    date: string,
    address: string,
    name: string,
    orderItems: OrderItemType[]
}

export type OrderUserType = {
    userId: number,
    orders: OrderType[]
}