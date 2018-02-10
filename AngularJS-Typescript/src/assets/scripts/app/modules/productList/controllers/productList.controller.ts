namespace app.productList {
  interface IProductListModel {
    title: string;
    showImage: boolean;
    products: app.domain.IProduct[];
    toggleImage(): void;
  }

  class ProductListController implements IProductListModel {
    title: string;
    showImage: boolean;
    products: app.domain.IProduct[];

    static $inject = ["dataAccessService"];
    constructor(private dataAccessService: app.common.IDataAccessService) {
      this.title = "Product List";
      this.showImage = false;
      this.products = [];

      let productResource = dataAccessService.getProductResource();
      productResource.query((data: app.domain.IProduct[]) => {
        this.products = data;
      });
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }
  }

  angular
    .module("productManagement")
    .controller("ProductListController", ProductListController);
}
