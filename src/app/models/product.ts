import { ProductImage } from "../models/product_images";

export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category: string;
    url: string;
    images: ProductImage[];
}


