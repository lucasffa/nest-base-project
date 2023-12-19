const exampleData = {
    id: 1,
    uuid: '225fe45c-a3b1-44a1-8134-14fbb10e67c6',
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: 'strongpassword',
    role: 'user',
    isActive: true,
    isDeleted: false,
    deletedAt: null,
    updatedAt: '2021-01-01T00:00:00.000Z',
    lastLoginAt: '2021-01-01T00:00:00.000Z',
    createdAt: '2021-01-01T00:00:00.000Z',

  };
  
export function generateExample<T extends keyof typeof exampleData>(keys: T[]): Record<T, typeof exampleData[T]> {
    const example: Partial<Record<T, typeof exampleData[T]>> = {};
    keys.forEach(key => {
      example[key] = exampleData[key];
    });
    return example as Record<T, typeof exampleData[T]>;
}

export function generateExampleDto(fields: string[]) {
    const example = {};
    fields.forEach(field => {
      example[field] = exampleData[field] || 'example value';
    });
    return example;
  }
  