export interface IPaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IGenericGetRes<T> {
  meta: IPaginationMeta;
  items: T;
}
