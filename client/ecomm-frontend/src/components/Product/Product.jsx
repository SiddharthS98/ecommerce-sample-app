import { useEffect, useState } from "react";
import "./Product.css";
import ProductCard from "../ProductCard/ProductCard";
import { backendURL } from "../../config";

function Product() {
  const [product, setProduct] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    getProducts();
    if (refreshPage) {
      setRefreshPage(false);
    }
  }, [refreshPage]);

  const getProducts = () => {
    fetch(`${backendURL}/getProducts`)
      .then((response) => response.json())
      .then((product) => {
        product = product.data;
        setProduct(product);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  return (
    <div className="product">
      {product.length > 0 ? (
        <div className="product row">
          {product.map(function (productData, index) {
            return (
              <ProductCard
                key={productData.name}
                productData={productData}
                setRefreshPage={setRefreshPage}
              ></ProductCard>
            );
          })}
        </div>
      ) : (
        <>
          <h3>Loading...</h3>
          <h5>Please refresh and try again</h5>
        </>
      )}
    </div>
  );
}

export default Product;
