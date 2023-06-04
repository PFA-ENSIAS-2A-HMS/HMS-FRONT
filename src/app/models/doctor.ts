export interface Doctor {
  id?: number;
  firstName: string;
  phoneNumber: string;
  lastName: string;
  date_of_birth?: string; // Assurez-vous d'utiliser le format de date approprié en Angular
  imageUrl?: string;
  role: string;
  email?: string;
  password?: string;
  gender: string;
  speciality: string;
  location: string;
}
