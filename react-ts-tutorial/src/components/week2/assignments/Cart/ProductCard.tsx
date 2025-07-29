import { useCartDispatch } from "./Context";
import type { Product } from "./Types";


function ProductCard({ product }: { product: Product }) {
  const dispatch = useCartDispatch();

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      <img src={product.image} alt={product.name} width="100" />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <button onClick={() => dispatch({ type: 'add', product })}>
        장바구니에 추가
      </button>
    </div>
  );
}

export default ProductCard