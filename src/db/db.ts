export abstract class DB<TData> {
  abstract findById(id: string): TData;

  abstract findMany(): TData[];

  abstract create(dto: unknown): TData;

  abstract delete(id: string): TData;

  abstract update(id: string, dto: unknown): TData;
}
