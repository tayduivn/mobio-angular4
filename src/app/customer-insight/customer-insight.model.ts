export class NumberCustomer {
  C?: string;
  report?: {
    [key: string]: number;
    ratio?: number;
  }
}

export class ReportRating {
  C?: string;
  report?: [{
    value: number;
    key: string;
  }]
}

export class ReportCustomerInsight {
  C?: string;
  report?: {
    data?: [{
      news?: string;
      purchase_offline?: number;
      purchase_online?: number;
      time?: string;
    }]
  }
}

// sub class report pipe
export class ReportPipeAge {
  C?: string;
  report?: {
    data?: [{
      name?: string;
      number?: number;
    }]
  }
}

export class ReportPipeCardType {
  C?: string;
  report?: {
    data?: [{
      nameCard?: string;
      idCardPattern?: string;
      number?: number;
    }]
  }
}

export class ReportPipeGender {
  C?: string;
  report?: {
    data?: [{
      gender?: number;
      number?: number;
    }]
  }
}

export class ReportPipeOS {
  C?: string;
  report?: {
    data?: [{
      number?: number;
      op?: string;
    }]
  }
}
