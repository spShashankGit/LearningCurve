namespace app.productDetail {
  interface IProductDetailModel {
    title: string;
    product: app.domain.IProduct;
  }

  interface IProductParams extends ng.route.IRouteParamsService {
    productId: number;
  }

  class ProductDetailController implements IProductDetailModel {
    title: string;
    product: app.domain.IProduct;
    static $inject = ["dataAccessService", "$routeParams"];
    constructor(
      private dataAccessService: app.common.IDataAccessService,
      private $routeParams: IProductParams
    ) {
      this.title = "Product Detail";
      let id = $routeParams.productId;
      let productResource = dataAccessService.getProductResource();
      productResource.get({ productId: id }, (data: app.domain.IProduct) => {
        this.product = data;
        console.log(data);
      });
    }
  }
  angular
    .module("productManagement")
    .controller("ProductDetailController", ProductDetailController);
}
