import { useCart, useCartDispatch } from "./Context";

function Cart() {
  const cart = useCart();
  const dispatch = useCartDispatch();

  if (!cart.isOpen) return null;

  const total = cart.items.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '300px',
      height: '100vh',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      padding: '20px'
    }}>
      <h2>장바구니</h2>
      <button onClick={() => dispatch({ type: 'toggleCart' })}>
        닫기
      </button>

      {cart.items.length === 0 ? (
        <p>장바구니가 비어있습니다</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.product.id} style={{ margin: '10px 0' }}>
              <h4>{item.product.name}</h4>
              <p>{item.product.price.toLocaleString()}원</p>
              <div>
                <button onClick={() => dispatch({
                  type: 'updateQuantity',
                  productId: item.product.id,
                  quantity: item.quantity - 1
                })}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => dispatch({
                  type: 'updateQuantity',
                  productId: item.product.id,
                  quantity: item.quantity + 1
                })}>+</button>
                <button onClick={() => dispatch({
                  type: 'remove',
                  productId: item.product.id
                })}>삭제</button>
              </div>
            </div>
          ))}
          <hr />
          <h3>총액: {total.toLocaleString()}원</h3>
          <button onClick={() => dispatch({ type: 'clear' })}>
            장바구니 비우기
          </button>
        </>
      )}
    </div>
  );
}

export default Cart