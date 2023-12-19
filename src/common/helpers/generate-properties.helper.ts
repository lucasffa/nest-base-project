const mockupExamples = {
    uuid: '225fe45c-a3b1-44a1-8134-14fbb10e67c6',
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'admin',
    isActive: true,
    isDeleted: false,
    deletedAt: null,
    updatedAt: '2021-01-01T00:00:00.000Z',
    createdAt: '2021-01-01T00:00:00.000Z',
    lastLoginAt: '2021-01-01T00:00:00.000Z',
};

export function generateProperties(fields) {
    const properties = {};
    fields.forEach((field) => {
      properties[field] = {
        type: typeof mockupExamples[field],
        example: mockupExamples[field],
      };
      
      if (field.includes('At') || field === 'deletedAt') {
        properties[field].format = 'date-time';
      }
    });
    return properties;
}