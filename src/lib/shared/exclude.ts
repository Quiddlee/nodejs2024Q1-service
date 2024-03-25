function exclude<TEntity, Key extends keyof TEntity>(
  entity: TEntity,
  keys: Key[],
): Omit<TEntity, Key> {
  return Object.fromEntries(
    Object.entries(entity as { [k: string]: unknown }).filter(
      ([key]) => !keys.includes(key as Key),
    ),
  ) as Omit<TEntity, Key>;
}
export default exclude;
