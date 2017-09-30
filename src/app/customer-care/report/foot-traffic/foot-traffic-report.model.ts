import { Paging } from '../../../common/model/paging';

export class CustomerVisit {
    data: [{
        time: string;
        numberOfCustomer: string;
        numberOfVisited: string;
    }];
}

export class CustomerVisits {
    report: CustomerVisit;
    C: string
}

export class PieChartCustomer {
    data: {
        newCustomer: string;
        return: string;
    }
}
export class PieChartCustomers {
    report: PieChartCustomer
    C: string;
}
export class FootTraffic {
    id: string;
    name: string;
    numberVisited: number;
    numberCustomer: number;
    numberSale: number;
    numberPointGift: number;
    address: string;
}
export class FootTraffics {
    report: [FootTraffic];
    paging: Paging;
    C: string;
    D: string;
}