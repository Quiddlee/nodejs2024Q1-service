export interface DB<TEntity> {
  findById(id: string): TEntity | undefined;
  findMany(): TEntity[];
  create(dto: unknown): TEntity | undefined;
  delete(id: string): TEntity | undefined;
  update(id: string, dto: unknown): TEntity | undefined;
}
