"use strict";
var AutocompleteItem = (function () {
    function AutocompleteItem(source) {
        var _this = this;
        if (typeof source === 'string') {
            this.value = this.name = source;
        }
        if (typeof source === 'object') {
            this.value = source.value || source.name;
            this.name = source.name;
            if (source.children && source.name) {
                this.children = source.children.map(function (c) {
                    var r = new AutocompleteItem(c);
                    r.parent = _this;
                    return r;
                });
                this.name = source.name;
            }
        }
    }
    AutocompleteItem.prototype.fillChildrenHash = function (optionsMap, startIndex) {
        var i = startIndex;
        this.children.map(function (child) {
            optionsMap.set(child.value, i++);
        });
        return i;
    };
    AutocompleteItem.prototype.hasChildren = function () {
        return this.children && this.children.length > 0;
    };
    AutocompleteItem.prototype.getSimilar = function () {
        var r = new AutocompleteItem(false);
        r.value = this.value;
        r.name = this.name;
        r.parent = this.parent;
        return r;
    };
    return AutocompleteItem;
}());
exports.AutocompleteItem = AutocompleteItem;
//# sourceMappingURL=autocomplete-item.js.map