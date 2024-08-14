import "./ProductCard.css";
import { backendURL } from "../../config";

function ProductCard({ productData, setRefreshPage }) {
  const handleClick = async (id) => {
    try {
      const response = await fetch(`${backendURL}/buyProduct`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json?.data == "Stock is 0") {
        alert(`Sorry, failed to buy! ${json.data}`); // not in stock error shows up here
      } else {
        alert("Product Bought Successfully!");
        setRefreshPage(true);
      }
    } catch (err) {
      console.log("err is ", err.message);
    }
  };

  return (
    <>
      <div className="col-3">
        <div className="card">
          <img
            src={productData.image_url}
            width="80"
            height="100"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h6 className="card-title">{productData.name}</h6>
            <p className="card-text">{productData.description}</p>
          </div>

          <div className="card-footer row card-footer-row">
            <div className="col-6">
              <p className="price">Rs {productData.price}</p>
              <p className="stock">In Stock: {productData.stock}</p>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleClick(productData.id)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
