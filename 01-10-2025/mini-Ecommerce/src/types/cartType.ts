export type CartItem = {
    productId : number,
    quantity: number
}

export type userCart = {
    userId: number,
    cart: CartItem[]
}