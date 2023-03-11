import { useState } from "react";

const useCustomPagination = ({ count: countRows }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(countRows);

  return {
    page,
    setPage,
    perPage,
    setPerPage,
    count,
    setCount
  };
};

export { useCustomPagination };
