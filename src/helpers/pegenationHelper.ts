type paginationOption = {
  page: number;
  limit: number;
};

type paginationOptionReturnResult = {
  page: number;
  limit: number;
  total: number;
};
const calculatePagination = (
  option: paginationOption
): paginationOptionReturnResult => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);
  const total = (page - 1) * limit;

  return {
    page,
    limit,
    total,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
