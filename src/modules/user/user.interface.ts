type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  profileImage?: string;
  role: Role;
}
