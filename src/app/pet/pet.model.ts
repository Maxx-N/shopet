export interface IPet {
  id: number;
  name: string;
  status: 'sold' | 'pending' | 'available';
  imageUrl: string;
}
