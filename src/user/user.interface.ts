interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    uuid: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt: Date;
  }
  