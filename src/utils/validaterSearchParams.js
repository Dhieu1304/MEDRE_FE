const checkSearchParamsKeyIsArray = (value) => {
  if (typeof value === "string" && value !== "") {
    return [value];
  }
  if (Array.isArray(value)) {
    return [...value];
  }
  return [];
};

export { checkSearchParamsKeyIsArray };
