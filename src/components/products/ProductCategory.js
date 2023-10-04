import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../store/actions/categoryAction";
import { filterByCategory } from "../../store/actions/productAction";

const ProductCategory = () => {
  const categoryList = useSelector((state) => state?.categories);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleCategoryFilter = (category, index) => {
    setIsActive(index);
    dispatch(filterByCategory(category));
  };
  return (
    <div className="text-center product_title">
      <h1 className="mb-3">Latest Products</h1>
      <div>
        {categoryList?.length
          ? categoryList.map((category, index) => {
              return (
                <button
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
