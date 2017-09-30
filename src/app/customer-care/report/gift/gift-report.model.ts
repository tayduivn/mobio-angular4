import { Paging } from '../../../common/model/paging';

export class GiftPoint {
    sumary: number;
    data: [{
        value: number,
        time: string;
    }];
}

export class GiftPoints {
    reports: GiftPoint;
    C: string;
}
export class GiftCategory {
    sumary: number
    data: [{
        idCategory: string;
        value: number;
    }]
}
export class GiftCategorys {
    reports: GiftCategory;
    C: string;
}
export class GiftInteractive {
    received: {
        sumary: number;
        data: [{
            value: number;
            time: string;
        }];
    };
    views: {
        sumary: number;
        data: [{
            value: number;
            time: string;
        }];
    };
    purchase: {
        sumary: number;
        data: [{
            value: number;
            time: string;
        }];
    };
}
export class GiftInteractives {
    reports: GiftInteractive;
    C: string;
}
export class GiftPresent {
    name: string;
    all: number;
    idPromotion: string;
    period: number;
}
export class GiftPresents {
    presents: [GiftPresent];
    paging: Paging;
    C: string;
}
export class PresentDetail {
    idPromotion: string;
    name: string;
    image: string;
    total_user_purchase: number;
    total_purchase: number;
    total_received: number;
}
export class PresentDetails {
    reports: PresentDetail
    C: string;
}
export class PresentTransaction {
    idCustomer: string;
    tel: string;
    email: string;
    code: string;
    status: number;
    timeOfRegiter: string;
    timeOfConfirm: string;
    timeOfUpdate: string;
    nameCustomer: string;
    address: string;
    gift: number
}
export class PresentTransactions {
    transaction: PresentTransaction;
    C: string;
    D: string;
}