import ProductCard from "./ProductCard";
import type { Product } from "./Types";

const sampleProducts: Product[] = [
  { id: 1, name: '노트북', price: 1200000, image: '💻' },
  { id: 2, name: '마우스', price: 30000, image: '🖱️' },
  { id: 3, name: '키보드', price: 80000, image: '⌨️' }
]

function ProductList() {
  return (
    <div>
      {sampleProducts.map((product) =>
        <ProductCard product={product} />)}
    </div>

  )
}

export default ProductList