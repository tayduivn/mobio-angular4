/**
 * @class Reservation
 * @author ManhNV
 * @description reservation model
 */
import {Paging} from '../../common/model/paging';

export class Reservation {
  id?: string;
  customer?: {
    id?: string;
    name?: string;
    avatar?: string;
  };
  status?: number;
  venue?: {
    id?: string;
    name?: string; // dia chi
  };
  detail?: {
    number_of_peoples?: number;
    note?: string;
    contact_name?: string;
    contact_phone?: string;
    time?: any;
  };
  created_time?: any;
}

export class Reservations {
  bookings?: [Reservation];
  paging?: Paging;
  C?: string;
  D?: string;
}
