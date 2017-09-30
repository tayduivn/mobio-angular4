/**
 * @class Customer
 * @author ManhNV
 * @description customer model
 */

export class Customer {
  customer: {
    id: string;
    summary: {
      transaction: {
        online_number: number;
        total: number;
        last_time: string;
        offline_number: number;
      }
    };
    ranking: number;
    profile: {
      id: string;
      email: string;
      phone: string;
      membership: string;
      gender: number;
      address: string;
      avatar: string;
      member_join: string;
      birthday: string;
      loyalty_point: number;
      name: string;
    };
  };
  C: string;
}
