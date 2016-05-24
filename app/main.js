"use strict";
const app_1 = require('./app');
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_deprecated_1 = require("@angular/router-deprecated");
const colorpicker_service_1 = require('/md2/components/colorpicker/colorpicker.service');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }), colorpicker_service_1.ColorpickerService
]);

//# sourceMappingURL=main.js.map
