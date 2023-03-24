export interface IPaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginatedRes<T> {
  meta: IPaginationMeta;
  items: T;
}

export interface ServerException {
  response: Response;
  status: number;
  options: Options;
  message: string;
  name: string;
}

interface Response {
  statusCode: number;
  message: string;
}

interface Options {}

export type TPaginationOptions = {
  limit: number;
  page: number;
};
