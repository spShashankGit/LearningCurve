import * as angular from "angular";
import { DataAccessService } from "./dataAccess.service";

let common = angular.module("common.module", ["ngResource"]);

common.service("dataAccessService", DataAccessService);

export default common;
