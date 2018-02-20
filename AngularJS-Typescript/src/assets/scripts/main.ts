import "babel-polyfill";
import app from "./app/app";
import * as angular from "angular";

angular.bootstrap(document, [app.name]);
