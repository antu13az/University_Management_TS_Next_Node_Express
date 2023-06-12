export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type IGenericResponsePaginetion<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
