import React from 'react'
import '../componentStyles/NoProducts.css';

function NoProducts({keyword}) {
  return (
    
    <div className="no-products-content">
        <div className="no-products-icon">
          ⚠️
            <h3 className="no-products-title">No products found</h3>
            <p className="no-products-message">
                {keyword?`No products found for "${keyword}". Please try different keywords or check back later.`
                :"No products available at the moment. Please check back later."
                }
            </p>
        </div>
      
      
    </div>
  )
}

export default NoProducts;