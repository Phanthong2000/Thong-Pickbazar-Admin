import { type } from "os";

export type MenuType = {
  icon: string;
  name: string;
  path: string;
};

export type BannerGroupType = {
  title: string;
  description: string;
  gallery: string;
};

export type GroupType = {
  id: string;
  name: string;
  icon: string;
  layout: string;
  productCard: string;
  sliders: Array<string>;
  banner: BannerGroupType;
};

export type CategoryType = {
  _id: string;
  id: string;
  name_en: string;
  name_vi: string;
  icon: string;
  image: string;
  type: string;
  parentId: string;
  groupId: string;
};
export type TagType = {
  id: string;
  name: string;
  icon: string;
  group: any;
  detail: string;
  slug: string;
};

export type AttributeValueType = {
  value: string;
  meta: string;
};
export type AttributeType = {
  id: string;
  name_en: string;
  name_vi: string;
  values: Array<AttributeValueType>;
};

export type ProductType = {
  id: string;
  name_en: string;
  name_vi: string;
  unit: string;
  description: string;
  status: string;
  featuredImage: string;
  galleries: Array<string>;
  groupId: string;
  categories: Array<string>;
  tags: Array<string>;
  type: string;
  simple: any;
  variable: any;
};

export type AddressType = {
  city: string;
  district: string;
  ward: string;
  street: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  address: AddressType;
  avatar: string;
  roleId: string;
  birthday: Date;
  username: string;
  password: string;
};

export type OrderStatusType = {
  id: string;
  name: string;
  serial: number;
  color: string;
};

export type CouponType = {
  id: string;
  code: string;
  amount: number;
  type: string;
  image: string;
  from: Date;
  to: Date;
  description: string;
  condition: string;
  minTotal: number;
  paymentMethodId: string;
};

export type TaxType = {
  id: string;
  name: string;
  rate: number;
  type: string;
  status: string;
  city: string;
  district: string;
  ward: string;
};

export type ShippingType = {
  id: string;
  name: string;
  fee: number;
};

export type PaymentMethodType = {
  id: string;
  name: string;
  type: string;
  status: string;
  parentId: string;
  child: [];
};
export type SettingType = {
  logo: string;
  title: string;
  subTitle: string;
  currency: string;
  minimumOrderAmount: number;
  optCheckout: boolean;
  shippingId: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaTags: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
  };
  deliverySchedule: [
    {
      title: string;
      description: string;
    }
  ];
  shop: {
    address: string;
    phone: string;
    social: [
      {
        icon: string;
        name: string;
        url: string;
      }
    ];
  };
};

export interface OrderType {
  id: string;
  customerId: string;
  phone: string;
  billAddress: string;
  shippingAddress: string;
  deliverySchedule: {
    title: string;
    description: string;
  };
  products: [
    {
      productId: string;
      price: number;
      quantity: number;
      unit: string
    }
  ];
  taxId: string;
  shippingId: string;
  couponId: string;
  orderStatusId: string;
  paymentMethodId: string;
  internetBankingImage: string;
  total: number;
}