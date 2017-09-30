import {Paging} from '../../../common/model/paging';

export class Beacon {
  idShop?: string;
  functionalType?: number[];
  macAddress?: string;
  beaconTheoPartnerID?: string;
  nameBeacon?: string;
  shopAddress?: string;
}

export class Beacons {
  beacon?: [Beacon];
  paging?: Paging;
  C?: string;
  D?: string;
}
