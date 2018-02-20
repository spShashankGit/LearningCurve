import { IProduct } from "./../../../models/product/product";

export interface IDataAccessService {
  getProductResource(): ng.resource.IResourceClass<IProductResource>;
}

export interface IProductResource extends ng.resource.IResource<IProduct> {}

export class DataAccessService implements IDataAccessService {
  static $inject = ["$resource"];
  constructor(private $resource: ng.resource.IResourceService) {}

  getProductResource(): ng.resource.IResourceClass<IProductResource> {
    return this.$resource("/api/products/:productId");
  }
}
