export const productUrl = 'products';

export interface IProduct {
    productId: number;
    name: string;
    description: string;
    price: number;
    discountedPrice: number;
    image: string;
    image2: string;
    thumbnail: string;
    display: number;
}