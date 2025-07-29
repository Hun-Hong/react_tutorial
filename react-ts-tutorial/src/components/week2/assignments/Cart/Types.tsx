export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'add', product: Product }
  | { type: 'remove', productId: number }
  | { type: 'updateQuantity', productId: number, quantity: number }
  | { type: 'clear' }
  | { type: 'toggleCart' }