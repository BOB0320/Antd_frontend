export const columns = [
  {
    Header: "No",
    accessor: "no",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Price",
    accessor: "price",
  },
];

export const formatRowData = (rawData, page, pageNumber) =>
  rawData.map((info, index) => ({
    no: index + page * (pageNumber - 1) + 1,
    name: info.name,
    category: info.category,
    price: info.price,
  }));

export const getData = async (
  pageNo = 1,
  rowPerPage = 24,
  category = "",
  maxPrice,
  minPrice = 0
) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}product/get?page=${pageNo}&pageSize=${rowPerPage}&category=${category}&maxPrice=${maxPrice}&minPrice=${minPrice}`
  );
  const data = await response.json();
  return data;
};
