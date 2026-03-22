export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
}
