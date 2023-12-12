export function mapToDto<T, K>(entity: T, dtoClass: new (entity: T) => K): K {
    return new dtoClass(entity);
  }