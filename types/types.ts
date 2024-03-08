export type DBTable<TEntity> = {
  [id: string]: TEntity | undefined;
};
