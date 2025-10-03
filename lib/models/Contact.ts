export interface ContactMessage {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

