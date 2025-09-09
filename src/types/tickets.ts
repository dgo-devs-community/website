export interface Ticket {
  id: string;
  code: string;
  name: string;
  email: string;
  quantity: number;
  status: "pending" | "paid" | "used" | "cancelled";
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TicketFormData {
  name: string;
  email: string;
  quantity: number;
  receipt: File | null;
}

export interface PartyConfig {
  name: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: string;
  logo?: string;
}
