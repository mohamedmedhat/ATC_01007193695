export interface EventDto {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  price: number;
  category: string;
  isBooked: boolean;
}

export interface eventResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: number;
  images: string[];
}
