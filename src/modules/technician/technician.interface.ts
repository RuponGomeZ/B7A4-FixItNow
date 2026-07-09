export interface ITechnician {
  categoryId: string;
  bio: string;
  service: string;
  experience: number;
  hourlyRate: number;
  completedJobs: number;
  serviceTitle: string;
  description: string;
  price: number;
  duration: number;
}

export interface ITechnicianQuery {
  limit?: number;
  page?: number;
  sortBy?: number;
  sortOrder?: number;
  hourlyRate?: string;
  minAverageRating?: number;
  minCompletedJobs?: number;
  location?: string;
  isAvailable?: boolean;
}
