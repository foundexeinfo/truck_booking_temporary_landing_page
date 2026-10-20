export interface BookingFormData {
  fullName: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  truckSize: string;
  goodsType: string;
  weight?: string;
  date: string;
  time?: string;
  notes?: string;
}