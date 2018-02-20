import * as angular from "angular";
import "angular-route";
import common from "./modules/common/services/common.module";
import mockResource from "./modules/serviceMocks/productResource.mock";
import ProductListController from "./modules/productList/controllers/productList.controller";
import ProductDetailController from "./modules/productDetail/controllers/productDetail.controller";

const app = angular.module("productManagement", [
  "ngRoute",
  mockResource.name,
  common.name
]);

app.config(routeConfig);
routeConfig.$inject = ["$routeProvider"];
function routeConfig($routeProvider: ng.route.IRouteProvider): void {
  $routeProvider
    .when("/productList", {
      templateUrl:
        "assets/scripts/app/modules/productList/views/productListView.html",
      controller: "ProductListController as vm"
    })
    .when("/productDetail/:productId", {
      templateUrl:
        "assets/scripts/app/modules/productDetail/views/productDetailView.html",
      controller: "ProductDetailController as vm"
    })
    .otherwise({ redirectTo: "/productList" });
}

app.controller("ProductListController", ProductListController);
app.controller("ProductDetailController", ProductDetailController);

export default app;
