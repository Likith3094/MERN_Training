import React, { useEffect, useState } from 'react'

const App = () => {
  const [product, setproduct] = useState([])
  const [category, setCategory] = useState('all')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setproduct(data))
  }, [])

  const categories = ['all', ...new Set(product.map((items) => items.category))]

  const displayedProducts = product.filter((items) => {
    const matchesCategory = category === 'all' || items.category === category

    return matchesCategory
  })

  return (
    <main className="store">
      <div className="store-header">
        <p className="eyebrow">Shop Latest Deals</p>
        <h1>Featured Products</h1>
        <p className="store-subtitle">Browse popular products with prices, ratings, and quick cart actions.</p>
      </div>

      <div className="filter-bar">
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option value={item} key={item}>
              {item === 'all' ? 'All Categories' : item}
            </option>
          ))}
        </select>

      </div>

      <div className="product-grid">
        {displayedProducts.map((items) => {
          return (
            <div className="product-card" key={items.id}>
              <div className="image-box">
                <img src={items.image} alt={items.title} />
              </div>

              <div className="product-info">
                <p className="category">{items.category}</p>
                <h2>{items.title}</h2>
                <p className="description">{items.description}</p>

                <div className="rating">
                  <span>Rating {items.rating.rate}</span>
                  <span>{items.rating.count} reviews</span>
                </div>

                <div className="card-footer">
                  <strong>${items.price}</strong>
                  <button>Add to Cart</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {displayedProducts.length === 0 && (
        <p className="empty-message">No products found.</p>
      )}
    </main>
  )
}

export default App
