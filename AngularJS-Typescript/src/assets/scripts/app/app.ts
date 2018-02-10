namespace app {
  let app = angular.module("productManagement", [
    "ngRoute",
    "productResourceMock",
    "common.service"
  ]);

  app.config(routeConfig);
  routeConfig.$inject = ["$routeProvider"];
  function routeConfig($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider
      .when("/productList", {
        templateUrl:
          "/AngularJS-Typescript/src/assets/scripts/app/modules/productList/productListView.html",
        controller: "ProductListController as vm"
      })
      .when("/productDetail/:productId", {
        templateUrl:
          "/AngularJS-Typescript/src/assets/scripts/app/modules/productDetail/productDetailView.html",
        controller: "ProductDetailController as vm"
      })
      .otherwise({ redirectTo: "/productList" });
  }
}
