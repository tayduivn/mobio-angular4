/**
 * @author ManhNV
 * @description mixin model marketing
 * @version 1.0.0
 */

export class ResponseActionMarketing {
  C?: string;
  D?: string;
  campaign?: {
    id?: string;
    status?: number;
  }
}

export class Audience {
  id?: string;
  name?: string;
  description?: string;
  customers?: {
    total?: number,
    end_time?: string
  }
}

export class CustomerMarketing {
  id?: string;
  last_name?: string;
  first_name?: string;
  phone_number?: string;
  email?: string;
}

export class Chanel {
  id?: string;
  name?: string;
  send_number?: number;
  type?: number;
  message?: string;
  link_image?: string;
  sender_id?: string;
  sender_name?: string;
  sender_auth?: string;
  resources?: [{
    id?: string;
    name?: string;
  }]
}

export class Criteria {
  id?: string;
  name?: string;
  value_type?: number;
}

export class CriteriaSupport {
  key?: string;
  name?: string;
}

export class Operator {
  key?: string;
  name?: string;
  operands?: number;
}

export class CriteriaOperator {
  id?: string;
  criteria?: CriteriaSupport;
  operator?: Operator;
  input_type?: number;
  default_values?: {
    values?: string[]
  }
}

export class Campaign {
  id?: string;
  name?: string;
  description?: string;
  status?: number;
  state?: number;
  schedule?: {
    start_time?: string;
    end_time?: string;
  };
  channels?: Chanel[];
  updated_time?: string;
  created_time?: string;
  audience?: {
    id?: string;
    name?: string;
    description?: string;
  }
}
