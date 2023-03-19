import { useEffect } from "react";
import { useNavigate } from "react-router";
import qs from "query-string";
import useDebounce from "./useDebounce";

const useSearchFilter = ({ location, watch, useWatch, control, loadData, reset, delay = 500 }) => {
  const debouncedSearchParamsValue = useDebounce(location.search, delay);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!location.search) {
  //     reset();
  //   }
  // }, [location.search]);

  useEffect(() => {
    if (!location.search) {
      reset();
    }
    loadData();
  }, [debouncedSearchParamsValue]);

  useEffect(() => {
    const params = { ...watch() };

    const searchParams = qs.stringify(params);

    navigate(`?${searchParams}`);
  }, [useWatch({ control })]);
};

export default useSearchFilter;
