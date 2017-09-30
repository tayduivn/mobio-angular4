
export class UnderestimateNotifyModel {
  emails: {
    values: string;
    type: number;     // 1.Mỗi khi khách hàng đánh giá thấp; 2. Cuối ngày
  };
  sms: {
    values: string;
    time: string;
  };
  push_notification: {
    values: string;
    time: string;
  };
}
