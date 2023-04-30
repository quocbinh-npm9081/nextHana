import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
export interface IData {
  products: IProduct[];
  categories: ICategory[];
  banners: IBanner[];
}

export interface IProduct {
  name: string;
  slug: string;
  category: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  sale: number;
  sizes: (string | undefined)[];
}

export interface ICategory {
  name: string;
  slug: string;
  image: string;
}

export interface IBanner {
  image: string;
}

export interface IInfoProduct {
  item: IProduct;
  quantity: number | undefined;
  status: string;
  totalPrice: number | undefined;
  yourSize: string | undefined;
}

export interface IPayloadActionCart {
  type: string;
  payload: IInfoProduct;
}

export interface IUserCredentials {
  _id?: string;
  username?: string;
  phoneNumber: string;
  password: string;
  isAdmin?: boolean;
}

export interface IUserCredentialsLogin
  extends Pick<IUserCredentials, Exclude<keyof IUserCredentials, "isAdmin">> {}
export interface IToken {
  _id?: string;
  idAdmin?: boolean;
}
export interface IParamsJwtCallBacks {
  token: JWT;
  user: User;
}

export interface ISession {
  user: User;
}
