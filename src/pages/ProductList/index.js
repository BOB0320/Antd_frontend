import React, { useState, useEffect } from "react";
import { getData, columns, formatRowData } from "../../utils/data";
import Pagination from "../../components/paginations";
import AppTable from "../../components/table";
import styles from "./styles.module.css";
import axios from "axios";

const ProductList = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalPassengers: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [category, setCategory] = useState("");

  const [insertCategory, setInsertCategory] = useState("");
  const [insertPrice, setInsertPrice] = useState();
  const [insertName, setInsertName] = useState("");

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));
    fetchProducts();
      }, [currentPage, category, maxPrice, minPrice]);

  const fetchProducts = () => {
        getData(currentPage, pageSize, category, maxPrice, minPrice).then(
      (info) => {
        console.log(info);
        const { total, data } = info.data;
        setPageData({
          isLoading: false,
          rowData: formatRowData(data, pageSize, currentPage),
          totalPages:Math.ceil(total/pageSize),
          totalPassengers: total,
        });
      }
    );
  };
  const handleInsertProduct = async () => {
    try {
      if (!insertCategory && !insertName && insertPrice > 0) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}product/register`, {
            name: insertName,
            category: insertCategory,
            price: insertPrice,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              alert(res.data.message);
              fetchProducts();
              EmptyField();
            }
          })
          .catch((err) => alert(err.response.data.message));
      } else alert("Invalid Field.");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const EmptyField = () => {
    setInsertCategory("");
    setInsertName("");
    setInsertPrice(0);
  };

  return (
    <div style={{ padding: "50px 100px" }}>
      <h1>Product List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          gap: "20px",
          marginBottom: "20px",
          alignItems: "center"
        }}
      >
        Name:{" "}
        <input
          type="text"
          value={insertCategory}
          onChange={(e) => setInsertCategory(e.target.value)}
        ></input>
        Category:{" "}
        <input
          type="text"
          value={insertName}
          onChange={(e) => setInsertName(e.target.value)}
        ></input>
        Price:{" "}
        <input
          type="number"
          value={insertPrice}
          onChange={(e) => setInsertPrice(parseInt(e.target.value))}
        ></input>
        <button onClick={handleInsertProduct}>Add Product</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          gap: "6px",
          marginBottom: "20px",
          alignItems: "center"
      }}
      >
      <span style={{fontSize:'20px'}}>Filter : </span>
        Category:{" "}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></input>
        MinPrice:{" "}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        ></input>
        MaxPrice:{" "}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        ></input>
      </div>
      <div style={{ height: "auto" }}>
        <AppTable
          columns={columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>

      <Pagination
        totalRows={pageData.totalPassengers}
        pageChangeHandler={setCurrentPage}
        rowsPerPage={24}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;
