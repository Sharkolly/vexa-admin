export type IProductFormInput = {
  name: string;
  price: number;
  category: string;
  sub_category: string;
  description: string;
  images: (File | string | null)[];
  video: File | string | null;
  brand?: string;
  discount?: number;
  color: string;
  deviceSpecifications?: {
    rom?: number;
    ram?: number;
    processor?: number;
    battery_health?: number;
    ibm?: boolean;
    idm?: boolean;
    icm?: boolean;
    sim?:
      | "Dual Physical Sim"
      | " Dual E-Sim"
      | "Dual Physical Sim + E-Sim"
      | "Single Physical Sim"
      | "Single E-Sim";
    inches?: number;
    resolution?: string;
    refresh_rate?: number;
    NFC?: boolean;
    wireless_charging?: boolean;
    fast_charging?: boolean;
    charging_port?: "USB-C" | "Lightning" | "Micro-USB" | "Proprietary";
    operating_system?: string;
  };
  condition:
    | "UK Used"
    | "Brand New"
    | "Open Box"
    | "Tokunbo"
    | "Refurbished"
    | "Damaged"
    | "Nigerian Used";
  size: '' | "XS" | "S" | "M" | "L" | "XL" | "XXL";
};
