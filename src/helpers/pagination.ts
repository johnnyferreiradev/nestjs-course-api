export interface PaginatedResult<T> {
  total: number;
  lastPage: number;
  currentPage: number;
  take: number;
  prev: number | null;
  next: number | null;
  results: T[];
}

export type PaginateOptions = {
  page?: number | string;
  take?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const createPaginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const take = Number(options?.take || defaultOptions?.take) || 10;

    const skip = page > 0 ? take * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: take,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / take);

    return {
      total,
      lastPage,
      currentPage: page,
      take,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      results: data,
    };
  };
};
