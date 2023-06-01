export interface Invoice {
  id: number;
  invoiceDate: string; // Assurez-vous d'utiliser le format de date approprié en Angular
  dueDate: string; // Assurez-vous d'utiliser le format de date approprié en Angular
  itemsServices: string;
  taxes: number;
  discounts: number;
  notes: string;
  status: string;
}
