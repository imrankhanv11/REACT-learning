import { useState } from "react";

function Form() {
  const [data, setData] = useState({
    productName: "",
    UnitPrize: 0,
    CategoryID: 1,
    ShipperID: 1,
  });

  const [message, setMessage] = useState("");

  const onchangeinput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.type === "number" && e.target.value !== ""
        ? Number(e.target.value)
        : e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7261/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      setMessage(result.message || "Product added successfully");

      setData({
        productName: "",
        UnitPrize: 0,
        CategoryID: 1,
        ShipperID: 1,
      });
    } catch (err) {
      console.error(err);
      setMessage("Error adding product");
    }
  };

  return (
    <div className="mt-3 container">
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-3 mt-3 text-center">
          <h1>Add Product</h1>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        <div>
          <label className="form-label">Product Name :</label>
          <input
            type="text"
            className="form-control w-50"
            name="productName"
            onChange={onchangeinput}
            value={data.productName}
            required
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Unit Price :</label>
          <input
            type="number"
            className="form-control w-50"
            name="UnitPrize"
            onChange={onchangeinput}
            value={data.UnitPrize ?? ""}
            required
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Category ID :</label>
          <input
            type="number"
            className="form-control w-50"
            min={1}
            max={5}
            name="CategoryID"
            onChange={onchangeinput}
            value={data.CategoryID ?? ""}
            required
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Shipper ID :</label>
          <input
            type="number"
            className="form-control w-50"
            min={1}
            max={5}
            name="ShipperID"
            onChange={onchangeinput}
            value={data.ShipperID ?? ""}
            required
          />
        </div>

        <div className="mt-4 mb-4">
          <button type="submit" className="btn btn-dark">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
