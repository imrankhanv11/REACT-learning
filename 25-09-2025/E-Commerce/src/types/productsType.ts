

export interface products {
    id: number,
    name: string,
    type: "Own" | "3rdParty",
    categories: string[],
    stock: number,
    addedDate: Date | null
}
