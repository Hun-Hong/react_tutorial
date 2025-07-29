import { useCart, useCartDispatch } from "./Context";

function Header() {
  const cart = useCart();
  const dispatch = useCartDispatch();
  
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header>
      <h1>쇼핑몰</h1>
      <button onClick={() => dispatch({ type: 'toggleCart' })}>
        장바구니 ({totalItems})
      </button>
    </header>
  );
}

export default Header