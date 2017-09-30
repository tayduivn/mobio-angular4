import {Paging} from '../../../common/model/paging';

export class Product {
  idProduct: string;
  name: string;
  price: number;
  idCategory: string;
  codeProduct?: string;
  avatar?: string;
  imageDescriptions?: [{ 'linkImage': string }];
  productPoint: number;
  statusChangePoint: number;
  state: number;
  description: string;
  textSearch?: string;
}

export class Products {
  products: [Product];
  paging: Paging;
  C: string;
}
