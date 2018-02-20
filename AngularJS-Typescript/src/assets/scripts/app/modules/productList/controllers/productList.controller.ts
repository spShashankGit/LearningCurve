import { IProduct } from "./../../../models/product/product";
import { IDataAccessService } from "./../../common/services/dataAccess.service";

interface IProductListModel {
  title: string;
  showImage: boolean;
  products: IProduct[];
  toggleImage(): void;
}

export default class ProductListController implements IProductListModel {
  title: string;
  showImage: boolean;
  products: IProduct[];

  static $inject = ["dataAccessService"];
  constructor(private dataAccessService: IDataAccessService) {
    this.title = "Product List";
    this.showImage = false;
    this.products = [];

    let productResource = dataAccessService.getProductResource();
    productResource.query((data: IProduct[]) => {
      this.products = data;
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
