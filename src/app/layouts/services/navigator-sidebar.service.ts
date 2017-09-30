import {Injectable} from '@angular/core';

@Injectable()
export class NavigatorSidebarService {

  permission: any;
  private _navigator = [
    {
      id: 1,
      icon: 'fa fa-shopping-cart',
      label: 'Chăm sóc khách hàng',
      link: '/dashboard',
      children: [
        {
          id: 10,
          icon: 'icon-speedometer',
          link: '/dashboard',
          label: 'Dashboard',
        },
        {
          id: 11,
          icon: 'fa fa-commenting-o',
          link: '/customer-care/comment',
          label: 'Quản lý bình luận',
        },
        {
          id: 12,
          icon: 'fa fa-wheelchair',
          link: '/customer-care/reservations',
          label: 'Quản lý đặt chỗ',
        },
        {
          id: 13,
          icon: 'fa fa-money',
          link: '/customer-care/debt',
          label: 'Đối xoát công nợ',
        },
        {
          id: 14,
          icon: 'fa fa-edit',
          link: '/customer-care/content/product',
          label: 'Quản lý nội dung',
          children: [
            {
              id: 141,
              icon: 'fa fa-edit',
              link: '/customer-care/content/shop',
              label: 'Cửa Hàng',
            },
            {
              id: 142,
              icon: 'fa fa-edit',
              link: '/customer-care/content/card-pattern',
              label: 'Thẻ mẫu',
            },
            {
              id: 143,
              icon: 'fa fa-edit',
              link: '/customer-care/content/product',
              label: 'Sản phẩm',
            },
            {
              id: 144,
              icon: 'fa fa-edit',
              link: '/customer-care/content/promotion',
              label: 'Ưu đãi',
            },
            {
              id: 145,
              icon: 'fa fa-edit',
              link: '/customer-care/content/voucher',
              label: 'Voucher',
            },
            {
              id: 146,
              icon: 'fa fa-edit',
              link: '/customer-care/content/foot-traffic',
              label: 'Foot-traffic',
            },
            {
              id: 147,
              icon: 'fa fa-edit',
              link: '/customer-care/content/gift',
              label: 'Quà tặng',
            }
          ]
        },
        {
          id: 15,
          icon: 'fa fa-male',
          link: '/customer-care/manage-customer',
          label: 'Quản lý khách hàng',
          children: [
            {
              id: 151,
              icon: 'fa fa-pro',
              link: '/customer-care/content/member-customer',
              label: 'Khách hàng thành viên',
            },
            {
              id: 152,
              icon: 'fa fa-pro',
              link: '/customer-care/manage-customer/customer-history',
              label: 'Đồng bộ khách hàng',
            }
          ]
        },
        {
          id: 16,
          icon: 'fa fa-truck',
          link: '/customer-care/transaction/offer',
          label: 'Quản lý giao dịch KH',
          children: [
            {
              id: 161,
              icon: 'fa fa-truck',
              link: '/customer-care/transaction/voucher',
              label: 'Tặng điểm/ Voucher',
            },
            {
              id: 162,
              icon: 'fa fa-truck',
              link: '/customer-care/transaction/swap',
              label: 'Đổi quà/ Voucher',
            },
            {
              id: 163,
              icon: 'fa fa-truck',
              link: '/customer-care/transaction/search',
              label: 'Tra cứu giao dịch',
            },
            {
              id: 164,
              icon: 'fa fa-truck',
              link: '/customer-care/transaction/customer-history',
              label: 'Lịch sử giao dịch KH',
            },
            {
              id: 165,
              icon: 'fa fa-truck',
              link: '/customer-care/transaction/point',
              label: 'Tích điểm bằng File',
            },
            {
              id: 166,
              icon: 'fa fa-truck',
              link: '/customer-care/transaction/earn-point',
              label: 'Tích điểm mua hàng bằng File',
            }
          ]
        },
        {
          id: 17,
          icon: 'fa fa-bar-chart',
          link: '/customer-care/report/transaction',
          label: 'Báo cáo thống kê',
          children: [
            {
              id: 172,
              icon: 'fa fa-bar-chart',
              link: '/customer-care/report/rate',
              label: 'Lịch sử KH đánh giá',
            },
            {
              id: 173,
              icon: 'fa fa-bar-chart',
              link: '/customer-care/report/product',
              label: 'Sản phẩm',
            },
            {
              id: 174,
              icon: 'fa fa-bar-chart',
              link: '/customer-care/report/promotion',
              label: 'Ưu đãi',
            },
            {
              id: 175,
              icon: 'fa fa-bar-chart',
              link: '/customer-care/report/voucher',
              label: 'Voucher',
            },
            {
              id: 176,
              icon: 'fa fa-bar-chart',
              link: '/customer-care/report/foot-traffic',
              label: 'Foot-traffic',
            },
            {
              id: 177,
              icon: 'fa fa-bar-chart',
              link: '/customer-care/report/gift',
              label: 'Quà tặng',
            },
          ]
        },
        {
          id: 18,
          icon: 'fa fa-cog',
          link: '/customer-care/config/offer',
          label: 'Cấu hình',
          children: [
            {
              id: 181,
              icon: 'fa fa-cog',
              link: '/customer-care/config/offer',
              label: 'Tặng điểm & voucher khi mua hàng',
            },
            {
              id: 182,
              icon: 'fa fa-cog',
              link: '/customer-care/config/underestimate',
              label: 'Đánh giá thấp',
            },
            {
              id: 183,
              icon: 'fa fa-cog',
              link: '/customer-care/config/beacon',
              label: 'Beacon',
            },
          ]
        }
      ]
    },
    {
      id: 2,
      icon: 'fa fa-bar-chart',
      label: 'Phân tích khách hàng',
      link: '/customer-insight'
    },
    {
      id: 3,
      icon: 'fa fa-bullseye',
      label: 'Marketing',
      link: '/marketing'
    },
    {
      id: 4,
      icon: 'fa fa-comments',
      label: 'Mạng xã hội',
      link: '/social/dashboard',
      children: [
        {
          id: 41,
          icon: 'fa fa-window-maximize',
          link: '/social/dashboard',
          label: 'Bảng tin',
        },
        {
          id: 42,
          icon: 'fa fa-yelp',
          link: '/social/conversation',
          label: 'Cấu hình',
        }
      ]
    },
    {
      id: 5,
      icon: 'fa fa-headphones',
      label: 'Tổng đài',
      link: '/call-center/dashboard',
      children: [
        {
          id: 41,
          icon: 'icon-speedometer',
          link: '/call-center/dashboard',
          label: 'Dashboard',
        },
        {
          id: 42,
          icon: 'icon-call-end icons',
          link: '/call-center/manage-calls',
          label: 'Quản lý cuộc gọi',
        },
        {
          id: 43,
          icon: 'fa fa-cogs',
          link: '/call-center/config',
          label: 'Cấu hình máy lẻ',
        },
      ]
    },
  ];

  constructor() {
  }

  getData() {
    return this._navigator;
  }
}
