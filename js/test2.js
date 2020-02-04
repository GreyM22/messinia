(function () {
    if (!Element.prototype.matchesSelector) {
        Element.prototype.matchesSelector =
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector;
    }
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector;
    }
    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = $.fn.type(obj);
        if (type === "function" || $.fn.isWindow(obj)) {
            return false;
        }
        return (
            type === "array" ||
            length === 0 ||
            (typeof length === "number" && length > 0 && length - 1 in obj)
        );
    }
    var arr = [];
    var class2type = {};
    var $ = function (selector, where) {
        return new $.prototype.init(selector, where);
    };
    $.fn = $.prototype = {
        constructor: $,
        length: 0,
        push: arr.push,
        sort: arr.sort,
        splice: arr.splice,
        concat: arr.concat,
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    $.fn.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    $.fn.push.call(ret, arr);
                }
            }
            return ret;
        },
        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function"
                ? class2type[toString.call(obj)] || "object"
                : typeof obj;
        },
        isWindow: function (obj) {
            return obj != null && obj === obj.window;
        },
        init: function (selector, where) {
            var self = this;
            where = where || document;
            if (!selector) {
                return self;
            }
            if (typeof selector !== "string") {
                self[0] = selector;
                self.length = 1;
                return self;
            }
            var items = where.querySelectorAll(selector);
            if (items && items.length) {
                $.fn.makeArray(items, self);
            }
            return self;
        },
        each: function (callback) {
            return $.each(this, callback);
        }
    };
    $.extend = $.fn.extend = function () {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (
                        deep &&
                        copy &&
                        (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
                    ) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    $.prototype.init.prototype = $.fn;
    $.extend({
        each: function (obj, callback) {
            var length,
                i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        }
    });
    $.extend($.fn, {
        html: function (val) {
            var self = this;
            if (typeof val !== "undefined") {
                return self.each(function () {
                    this.innerHTML = val;
                });
            } else {
                return self[0].innerHTML;
            }
        },
        text: function (val) {
            var self = this;
            if (typeof val !== "undefined") {
                return self.each(function () {
                    this.innerHTML = val;
                });
            } else {
                return self[0].textContent;
            }
        },
        attr: function (name, val) {
            var self = this;
            if (typeof val !== "undefined") {
                return self.each(function () {
                    this.setAttribute(name, val);
                });
            } else {
                return self[0].getAttribute(name);
            }
        },
        css: function (name, val) {
            var self = this;
            if (name instanceof Object) {
                Object.keys(name).forEach(function (key) {
                    self.css(key, name[key]);
                });
                return self;
            }
            if (typeof val !== "undefined") {
                return self.each(function () {
                    this.style[name] = val;
                });
            } else if (window.getComputedStyle) {
                return window.getComputedStyle(self[0]).getPropertyValue(name);
            } else {
                return self[0].style[name];
            }
        },
        addClass: function (className) {
            return this.each(function () {
                if (this.classList) {
                    this.classList.add(className);
                } else {
                    this.className += " " + className;
                }
            });
        },
        removeClass: function (className) {
            return this.each(function () {
                if (this.classList) {
                    this.classList.remove(className);
                } else {
                    this.className = this.className.replace(
                        new RegExp(
                            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
                            "gi"
                        ),
                        " "
                    );
                }
            });
        },
        find: function (selector) {
            var newItems = $.fn.merge($(), []);
            this.each(function () {
                newItems = $.fn.merge(newItems, $(selector, this));
            });
            return newItems;
        },
        filter: function (selector) {
            var newItems = $.fn.merge($(), []);
            this.each(function () {
                if (this.matches(selector)) {
                    newItems = $.fn.merge(newItems, [this]);
                }
            });
            return newItems;
        },
        closest: function (selector) {
            var newItems = $.fn.merge($(), []);
            var el = this[0];
            do {
                if (el.matches(selector)) {
                    return $(el);
                }
                el = el.parentElement;
            } while (el !== null);
            return newItems;
        },
        append: function (val) {
            return this.each(function () {
                this.insertAdjacentHTML("beforeend", val);
            });
        },
        prepend: function (val) {
            return this.each(function () {
                this.insertAdjacentHTML("afterbefin", val);
            });
        },
        on: function (type, selector, func) {
            if (typeof selector !== "string") {
                func = selector;
            }
            if (!func) {
                return;
            }
            return this.each(function () {
                this.addEventListener(
                    type,
                    function (evt) {
                        if (typeof selector === "string") {
                            if (evt.target && evt.target.matches(selector)) {
                                func.apply(evt.target, [evt]);
                            }
                        } else {
                            func.apply(this, [evt]);
                        }
                    },
                    typeof selector === "string"
                );
            });
        }
    });
    window.$ = $;
})();
/**************************************************************/

(function ($) {
    "use strict";
        $("body").append('<div class="demo-preview-cont"></div>');
        var $bar = $(".demo-bar");
        var $previewCont = $(".demo-preview-cont");
        $previewCont.append("<img>");
        var $previewImg = $previewCont.find("img");
        function setPreviewPos($hovered) {
            $previewImg.attr("style", "");
            var wndW =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            var offset = 10;
            var w = parseFloat($previewImg.css("width"));
            var l =
                $hovered.closest(".demo-products-list-menu")[0].getBoundingClientRect()
                    .right + offset;
            var t = $bar[0].getBoundingClientRect().bottom + offset;
            if (wndW < l + w + offset) {
                w = wndW - l - offset;
            }
            $previewImg.css({ left: l + "px", top: t + "px", width: w + "px" });
        }
        var $productDemosList = $(".demo-products-demos-list");
        var $iframe = $(".demo-frame > iframe");
        var $buy_button = $('[href="#buy-action"]');
        var $close_button = $('[href="#close-action"]');
        $(window).on("hashchange", function () {
            loadProduct(location.hash.replace("#", ""));
        });
})($);
