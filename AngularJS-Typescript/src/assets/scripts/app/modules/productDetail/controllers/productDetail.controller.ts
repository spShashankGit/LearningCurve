import { IProduct } from "./../../../models/product/product";
import { IDataAccessService } from "./../../common/services/dataAccess.service";

interface IProductDetailModel {
  title: string;
  product: IProduct;
}

interface IProductParams extends ng.route.IRouteParamsService {
  productId: number;
}

export default class ProductDetailController implements IProductDetailModel {
  title: string;
  product: IProduct;
  static $inject = ["dataAccessService", "$routeParams"];
  constructor(
    private dataAccessService: IDataAccessService,
    private $routeParams: IProductParams
  ) {
    this.title = "Product Detail";
    let id = $routeParams.productId;
    let productResource = dataAccessService.getProductResource();
    productResource.get({ productId: id }, (data: IProduct) => {
      this.product = data;
      console.log(data);
    });
  }
}
