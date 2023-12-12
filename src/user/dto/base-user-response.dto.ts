export class BaseUserResponseDto {
    uuid?: string;
    name?: string;
    email?: string;
    role?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  
    constructor(user: any, fields: string[]) {
      fields.forEach(field => {
        if (user[field] !== undefined) {
          this[field] = user[field];
        }
      });
    }
}