import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByCategory } from "../../store/actions/productAction";
import { productCategories } from "../../utils/productCategories";

const ProductCategory = () => {
  const [isActive, setIsActive] = useState(2);

  const dispatch = useDispatch();

  const handleCategoryFilter = (category, index) => {
    setIsActive(index);
    dispatch(filterByCategory(category));
  };

  return (
    <div className="text-center product_title">
      <h1 className="mb-3">Latest Products</h1>
      <div>
        {productCategories?.length
          ? productCategories.map((category, index) => {
              return (
                <button
                  key={category}
                  className={`mx-3 btn ${
                    isActive === index ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={() => handleCategoryFilter(category, index)}
                >
                  {category}
                </button>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ProductCategory;
