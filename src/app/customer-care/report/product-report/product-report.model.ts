import { Paging } from '../../../common/model/paging';

export class ReportProduct {
  all: {
    count: {
      received: number;
      view: number;
      purchase: number;
    },
    user: {
      received: number;
      view: number;
      purchase: number;
    }
  };
  name: string;
  statusChangePoint: number;
  in_period: {
    count: {
      received: number;
      view: number;
      purchase: number;
    },
    user: {
      received: number;
      view: number;
      purchase: number;
    }
  };
  idProduct: string;
}

export class ReportProducts {
  products: [ReportProduct];
  paging: Paging;
  C: string;
}

export class DetailProduct {
  idProduct: string;
  total_purchase: number;
  total_received: number;
  name: string;
  imagePath: string;
  total_views: number;
}

export class DetailProducts {
  reports: [DetailProduct];
  C: string;
}
export class Transaction {
  email: string;
  timeOfReceipt: string;
  timeOfConfirm: string;
  address: string;
  timeOfRegister: string;
  status: number;
  name: string;
  customer: string;
  tel: string;
  giftForm: number;
  deliveryCode: number;
  customerID: string;
}

export class Transactions {
  transaction: [Transaction];
  paging: Paging;
  C: string;
}

export class ChartProduct {
  received: {
    data: [
      {
        time: string;
        value: number
      }
    ];
    sumary: number;
  };
  views: {
    data: [
      {
        time: string;
        value: number
      }
    ];
    sumary: number;
  };
  purchase: {
    data: [
      {
        time: string;
        value: number
      }
    ];
    sumary: number;
  }
}

export class ChartProducts {
  reports: ChartProduct;
  C: string;
}