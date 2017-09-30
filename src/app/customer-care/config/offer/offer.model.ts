import {Voucher} from '../../content/voucher/voucher.model';

export class Offer {
  levels?: OfferLevel[];
  reward_type: number;
}

export class CrudLevel {
  insertLevel: OfferLevel[];
  updateLevel: OfferLevel[];
  deleteLevel: string[];
}

export class OfferLevel {
  id: string;
  typeOffer?: number;
  createdAccount?: string;
  updatedAccount?: string;
  createdTime?: string;
  updatedTime?: string;
  rateReward?: number;
  priceFrom?: number;
  priceTo?: number;
  categoryName?: string;
  xPoint?: number;
  pointReward?: number;
  typeSelectVoucher?: number;
  voucher?: Voucher;
  voucherID?: string;
  numberVoucher?: number;
  deleted?: boolean = false;
}
