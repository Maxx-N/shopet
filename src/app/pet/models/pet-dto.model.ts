export interface IPetDto {
  id: number;
  name: string;
  status: 'sold' | 'pending' | 'available';
  photoUrls: string[];
}
