function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user as { [k: string]: unknown }).filter(
      ([key]) => !keys.includes(key as Key),
    ),
  ) as Omit<User, Key>;
}
export default exclude;
