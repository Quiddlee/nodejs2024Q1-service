export interface DB<TEntity> {
  findById(id: string): TEntity | null;
  findMany(): TEntity[];
  create(dto: unknown): TEntity | null;
  delete(id: string): TEntity | null;
  update(id: string, dto: unknown): TEntity | null;
}
