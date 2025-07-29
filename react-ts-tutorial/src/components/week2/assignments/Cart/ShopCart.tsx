import type { CartState, CartAction } from "./Types";
import Header from "./Header";
import ProductList from "./ProductList";
import Cart from "./Cart";
import { useReducer } from "react";
import { CartContext, CartDispatchContext } from "./Context";


function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existingItem = state.items.find(item =>
        item.product.id === action.product.id
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }]
      }
    }
    case 'remove':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId)
      }
    case 'updateQuantity':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ).filter(item => item.quantity > 0)
      }
    case 'clear':
      return { ...state, items: [] }
    case 'toggleCart':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}


function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

function ShopCart() {
  return (
    <CartProvider>
      <div>
        <Header />
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  )
}
export default ShopCart;
