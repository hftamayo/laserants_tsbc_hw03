import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/rootSlice'
import ProductCard from '../../ui/layout/ProductCard'
import ProductDetails from './ProductDetails'
import { productStyles } from '../../ui/twind/styles'
import { ProductCardTypes } from '../../../types/product.types'

const ViewProduct: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products)
  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery,
  )
  const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 3))
  const [selectedProduct, setSelectedProduct] = useState<
    ProductCardTypes['product'] | null
  >(null)
  const [page, setPage] = useState(1)
  const observer = useRef<IntersectionObserver | null>(null)
  const numberOfRowsPerPage = 2
  const columnsPerRow = 3

  useEffect(() => {
    const loadMoreProducts = () => {
      const productsToLoad = numberOfRowsPerPage * columnsPerRow
      const newProducts = products.slice(0, page * productsToLoad)
      setVisibleProducts(newProducts)
    }

    loadMoreProducts()
  }, [page, products])

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0]
      if (target.isIntersecting) {
        setPage((prev) => prev + 1)
      }
    }

    observer.current = new IntersectionObserver(handleObserver)
    if (observer.current && observer.current.observe) {
      observer.current.observe(document.querySelector('#load-more')!)
    }

    return () => observer.current?.disconnect()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDetailsClick = (product: ProductCardTypes['product']) => {
    setSelectedProduct(product)
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <div className={productStyles.dboard_product_grid}>
        {filteredProducts
          .slice(0, page * numberOfRowsPerPage * columnsPerRow)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        <div id="load-more" className="h-10"></div>
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </>
  )
}

export default ViewProduct
