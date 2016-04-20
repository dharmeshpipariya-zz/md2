"use strict";
var AutocompleteItem = (function () {
    function AutocompleteItem(source) {
        var _this = this;
        if (typeof source === 'string') {
            this.id = this.name = source;
        }
        if (typeof source === 'object') {
            this.id = source.id || source.name;
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
            optionsMap.set(child.id, i++);
        });
        return i;
    };
    AutocompleteItem.prototype.hasChildren = function () {
        return this.children && this.children.length > 0;
    };
    AutocompleteItem.prototype.getSimilar = function () {
        var r = new AutocompleteItem(false);
        r.id = this.id;
        r.name = this.name;
        r.parent = this.parent;
        return r;
    };
    return AutocompleteItem;
}());
exports.AutocompleteItem = AutocompleteItem;
//# sourceMappingURL=autocomplete-item.js.map