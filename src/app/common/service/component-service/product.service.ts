/**
 * @module product.service
 * @author ManhNV
 * @description config service product
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';
import { ApiRequestService } from '../common-service/api-request.service';
import { AuthenticateService } from '../common-service/authenticate.service';
import { ResponseCustom } from '../../model/response-custom.model';
import { Products, Product } from '../../../customer-care/content/product/product.model';
import { Observable } from 'rxjs/Observable';
import { UtilService } from '../common-service/util.service';

@Injectable()
export class ProductService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
    private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  /**
   * @method getProducts
   * @description get list products
   * @returns {Observable<Products>}
   */
  public getProducts(dataFilter: any): Observable<Products> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/products${queryString}`);
  }

  /**
   * @method getProductInformation
   * @param _idProduct
   * @returns {Observable<Product>}
   * @todo [component-service] confirm model item ảnh mô tả
   */
  public getProductInformation(_idProduct: string): Observable<Product> {
    return this._apiRequest.get(`${this.basePath}/products/${_idProduct}`);
  }

  /**
   * @method createProduct
   * @description create new product
   * @param body
   * @param file
   * @returns {Observable<Response>}
   */
  public createProduct(body: Product, file: any): Observable<ResponseCustom> {
    let bodyData = {
      MaDanhMuc: body.idCategory,
      GiaSanPham: body.price,
      DiemSanPham: body.statusChangePoint,
      TenSanPham: body.name,
      MaSanPham: body.codeProduct,
      MoTaChiTiet: body.description,
      TrangThaiDoiDiem: body.statusChangePoint,
      TrangThai: body.state,
      ChuoiTimKiem: body.textSearch
    };

    return this._apiRequest.sendWithFile(`${this.basePath}/products`, 'post', bodyData, file);
  }

  /**
   * @method updateProduct
   * @description
   * @param {Product} body
   * @param {any} file
   * @returns {Observable<ResponseCustom>}
   */
  public updateProduct(body: Product, file: any): Observable<ResponseCustom> {
    let bodyData = {
      DiemSanPham: body.statusChangePoint,
      TenSanPham: body.name,
      MaSanPham: body.codeProduct,
      MoTaChiTiet: body.description,
      TrangThaiDoiDiem: body.statusChangePoint,
      TrangThai: body.state,
      ChuoiTimKiem: body.textSearch,
      GiaSanPham: body.price,
      MaDanhMuc: body.idCategory
    };
    if (!file)
      return this._apiRequest.sendNotFile(`${this.basePath}/products/${body.idProduct}`, 'patch', bodyData);
    return this._apiRequest.sendWithFile(`${this.basePath}/products/${body.idProduct}`, 'patch', bodyData, file);
  }

  /**
   * @method createProductFromFile
   * @description create new product from file
   * @param file
   * @returns {Observable<any>}
   */
  public createProductFromFile(file: any): Observable<ResponseCustom> {
    return this._apiRequest.sendWithFile(`${this.basePath}/products/upload`, 'post', {}, file);
  }

  /**
   * @method deleteMultipleProduct
   * @param params
   * @returns {Observable<ResponseCustom>}
   */
  public deleteMultipleProduct(params): Observable<ResponseCustom> {
    return this._apiRequest.delete(`${this.basePath}/products?${params}`);
  }

  /**
   * @method changeStateShowProduct
   * @description enable, disable multiple product
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowProduct(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}/products`, body, 1, {});
  }

  /**
   * @method toProduct
   * @static
   * @description maping object
   * @param r
   * @returns {Products}
   */
  public static toProduct(r: any): Product {
    let prod: Product = {
      idProduct: r['SanPhamID'],
      name: r['TenSanPham'],
      price: r['GiaSanPham'],
      idCategory: r['MaDanhMuc'],
      codeProduct: r['MaSanPham'],
      avatar: r['AnhDaiDien'],
      imageDescriptions: !r['AnhMoTa'] ? [] : r['AnhMoTa'].map(function (item) {
        return {
          linkImage: item['LinkAnh']
        }
      }),
      productPoint: r['DiemSanPham'],
      statusChangePoint: r['TrangThaiDoiDiem'],
      state: r['TrangThai'],
      description: r['MoTaChiTiet'],
      textSearch: r['ChuoiTimKiem']
    };
    console.log('Parsed products:', prod);
    return prod;
  }


  /**
   * @method fileExample
   * @description get file example of product
   * @returns {file}
   */
  public fileExample() {
    // let a = `${this.basePath};
    // console.log(a);
    // return this._apiRequest.get(`${this.basePath}/products${queryString}`);
    return this.basePath;
  }
}
