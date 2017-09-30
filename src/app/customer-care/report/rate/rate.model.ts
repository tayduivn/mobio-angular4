import { Paging } from '../../../common/model/paging';

export class CustomerRating {
    customerId: string;
    rating: number;
    timeOfRegister: string;
    address: string;
    name: string;
    tel: string;
    email: string;
    content: string;
}

export class CustomerRatings {
    rating: [CustomerRating];
    paging: Paging;
    C: string;
}
export class ChartRating {
    data: [{
        rating_1: number;
        rating_2: number;
        rating_3: number;
        rating_4: number;
        rating_5: number;
        time: string;
    }];
}
export class ChartRatings {
    report: [ChartRating];
    C: string
}