import React from 'react'

import { getProductService, addToCartService } from '../../services'
import { Navbar, Footer, Filter, VerticalCard, Loader } from '../../components'
import { useGlobalState, useProducts, useUser, actions } from '../../store'
import './styles.scss'

const sortProducts = (prods, filters) => {
  const data = [...prods]
  if (filters.sortBy && filters.sortBy === 'descending')
    return data.sort((a, b) => b.cost - a.cost)
  else if (filters.sortBy && filters.sortBy === 'ascending')
    return data.sort((a, b) => a.cost - b.cost)
  return data
}

const filterProducts = (sortedProducts, filters) => {
  let tempArray = sortedProducts

  // filter by price
  tempArray = tempArray.filter(product => {
    return product.cost >= filters.minPrice && product.cost <= filters.maxPrice
  })

  // filter by processor
  if (filters.processors.modified) {
    if (filters.processors.hooli)
      tempArray = tempArray.filter(product =>
        product.processor.includes('hooli'),
      )
    if (filters.processors.snapdragon)
      tempArray = tempArray.filter(product =>
        product.processor.includes('snapdragon'),
      )
    if (filters.processors.mediatek)
      tempArray = tempArray.filter(product =>
        product.processor.includes('mediatek'),
      )
  }

  // filter by rating
  if (filters.rating) {
    tempArray = tempArray.filter(product => product.rating >= filters.rating)
  }

  // filter by stock
  if (!filters.includeOutOfStock)
    tempArray = tempArray.filter(product => product.stock > 0)

  // filter by fast delivery
  if (filters.fastDeliveryOnly)
    tempArray = tempArray.filter(product => product.fastDeliveryOnly)

  // filter by search
  if (filters.search)
    tempArray = tempArray.filter(product =>
      product.title.toLowerCase().includes(filters.search.toLowerCase()),
    )

  return tempArray
}

const Shop = () => {
  const { showToast } = useGlobalState()
  const { isLoggedIn } = useUser()
  const { isLoading, filters, products, dispatchProducts } = useProducts()
  const [filterToggle, setFilterToggle] = React.useState(false)

  const getProducts = React.useCallback(async () => {
    dispatchProducts({ type: actions.fetchProductsStart })
    setTimeout(async () => {
      try {
        const response = await getProductService()
        dispatchProducts({
          type: actions.fetchProductsSuccess,
          payload: response.products,
        })
      } catch (error) {
        dispatchProducts({ type: actions.fetchProductsFailure, payload: error })
        showToast({
          message: 'Oops! something went wrong, unable to get your products :(',
          type: 'failed',
        })
      }
    }, 2500) // simulate network latency, hehe
  }, [])

  React.useEffect(() => {
    getProducts()
  }, [getProducts])

  const sortedProducts = React.useMemo(() => {
    return sortProducts(products, filters)
  }, [products, filters])

  const filteredProducts = React.useMemo(
    () => filterProducts(sortedProducts, filters),
    [filters, sortedProducts],
  )

  const handleAddToCart = async product => {
    if (!isLoggedIn) {
      showToast({
        message: 'Please login to add to cart',
        type: 'failed',
      })
      return false
    }

    try {
      await addToCartService(product)
      showToast({
        message: `${product.title} added to cart`,
        type: 'success',
      })
      return true
    } catch {
      showToast({
        message: 'Oops! something went wrong, unable to add to cart :(',
        type: 'failed',
      })
      return false
    }
  }

  return (
    <>
      <Navbar hasSearch={true} />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="shop-container d-flex">
          <article
            className={`product-list-content padding-default ${
              filterToggle ? 'product-list-transition' : ''
            }`}
          >
            <section className="product-list-header">
              <span
                className={`filter-btn ${
                  filterToggle ? 'filter-btn-active' : 'card-shadow'
                }`}
                onClick={() => setFilterToggle(!filterToggle)}
              >
                {' '}
                <i className="fas fa-sliders-h"></i>
                <h1 className="text-600 ml-1">filter</h1>
              </span>
              <span className="align-items-center">
                <h1 className="text-lg">Showing all models</h1>
                <h1 className="text-md text-600 filter-clear">
                  ( showing {filteredProducts.length} products )
                </h1>
              </span>
            </section>
            <section className="product-list d-flex">
              {filteredProducts &&
                filteredProducts.map(product => {
                  return (
                    <VerticalCard
                      key={product.id}
                      product={product}
                      addToCart={handleAddToCart}
                    />
                  )
                })}
            </section>
          </article>
          <Filter visible={filterToggle} />
        </main>
      )}
      <Footer />
    </>
  )
}

export default Shop
