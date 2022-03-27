import React from 'react'
import { getProductService } from '../../services'

import { Navbar, Footer, Filter, VerticalCard, Loader } from '../../components'
import { useGlobalState } from '../../store'
import './styles.scss'

const Shop = () => {
  const { showToast } = useGlobalState()
  const [filterToggle, setFilterToggle] = React.useState(false)
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const getProducts = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await getProductService()
      setProducts(response.products)
    } catch (error) {
      showToast({
        message: 'Oops! something went wrong, unable to get your products :(',
        type: 'failed',
      })
    }
    setTimeout(() => {
      // replicating a slow server, hehe
      setLoading(false)
    }, 2000)
  }, [])

  React.useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <>
      <Navbar hasSearch={true} />
      {loading ? (
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
                  ( showing {products.length} products )
                </h1>
              </span>
            </section>
            <section className="product-list d-flex">
              {products &&
                products.map(product => {
                  return <VerticalCard key={product.id} product={product} />
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
