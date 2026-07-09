import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface IService {
  categoryId: string;
  technicianId: string;
  serviceTitle: string;
  description: string;
  price: number;
  duration: number;
  location: string;
}

export interface IServiceQuery extends ServiceWhereInput {
  category?: string;
  location?: string;
  minRating?: number;
  isAvailable?: boolean;
  maxPrice?: number;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
  type: string;
}
