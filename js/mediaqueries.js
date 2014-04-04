"function" != typeof Object.create && (Object.create = function(o) {
    function F() {}
    return F.prototype = o, new F();
});

var ua = {
    toString: function() {
        return navigator.userAgent;
    },
    test: function(s) {
        return this.toString().toLowerCase().indexOf(s.toLowerCase()) > -1;
    }
};

ua.version = (ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], 
ua.webkit = ua.test("webkit"), ua.gecko = ua.test("gecko") && !ua.webkit, ua.opera = ua.test("opera"), 
ua.ie = ua.test("msie") && !ua.opera, ua.ie6 = ua.ie && document.compatMode && "undefined" == typeof document.documentElement.style.maxHeight, 
ua.ie7 = ua.ie && document.documentElement && "undefined" != typeof document.documentElement.style.maxHeight && "undefined" == typeof XDomainRequest, 
ua.ie8 = ua.ie && "undefined" != typeof XDomainRequest;

var domReady = function() {
    var fns = [], init = function() {
        if (!arguments.callee.done) {
            arguments.callee.done = !0;
            for (var i = 0; i < fns.length; i++) fns[i]();
        }
    };
    return document.addEventListener && document.addEventListener("DOMContentLoaded", init, !1), 
    ua.ie && (!function() {
        try {
            document.documentElement.doScroll("left"), document.body.length;
        } catch (e) {
            return void setTimeout(arguments.callee, 50);
        }
        init();
    }(), document.onreadystatechange = function() {
        "complete" === document.readyState && (document.onreadystatechange = null, init());
    }), ua.webkit && document.readyState && !function() {
        "loading" !== document.readyState ? init() : setTimeout(arguments.callee, 10);
    }(), window.onload = init, function(fn) {
        return "function" == typeof fn && (init.done ? fn() : fns[fns.length] = fn), fn;
    };
}(), cssHelper = function() {
    var parsed, regExp = {
        BLOCKS: /[^\s{][^{]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,
        BLOCKS_INSIDE: /[^\s{][^{]*\{[^{}]*\}/g,
        DECLARATIONS: /[a-zA-Z\-]+[^;]*:[^;]+;/g,
        RELATIVE_URLS: /url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,
        REDUNDANT_COMPONENTS: /(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;|@-moz-document\s*url-prefix\(\)\s*{(([^{}])+{([^{}])+}([^{}])+)+})/g,
        REDUNDANT_WHITESPACE: /\s*(,|:|;|\{|\})\s*/g,
        MORE_WHITESPACE: /\s{2,}/g,
        FINAL_SEMICOLONS: /;\}/g,
        NOT_WHITESPACE: /\S+/g
    }, parsing = !1, waiting = [], wait = function(fn) {
        "function" == typeof fn && (waiting[waiting.length] = fn);
    }, ready = function() {
        for (var i = 0; i < waiting.length; i++) waiting[i](parsed);
    }, events = {}, broadcast = function(n, v) {
        if (events[n]) {
            var listeners = events[n].listeners;
            if (listeners) for (var i = 0; i < listeners.length; i++) listeners[i](v);
        }
    }, requestText = function(url, fnSuccess, fnFailure) {
        if (ua.ie && !window.XMLHttpRequest && (window.XMLHttpRequest = function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }), !XMLHttpRequest) return "";
        var r = new XMLHttpRequest();
        try {
            r.open("get", url, !0), r.setRequestHeader("X_REQUESTED_WITH", "XMLHttpRequest");
        } catch (e) {
            return void fnFailure();
        }
        var done = !1;
        setTimeout(function() {
            done = !0;
        }, 5e3), document.documentElement.style.cursor = "progress", r.onreadystatechange = function() {
            4 !== r.readyState || done || (!r.status && "file:" === location.protocol || r.status >= 200 && r.status < 300 || 304 === r.status || navigator.userAgent.indexOf("Safari") > -1 && "undefined" == typeof r.status ? fnSuccess(r.responseText) : fnFailure(), 
            document.documentElement.style.cursor = "", r = null);
        }, r.send("");
    }, sanitize = function(text) {
        return text = text.replace(regExp.REDUNDANT_COMPONENTS, ""), text = text.replace(regExp.REDUNDANT_WHITESPACE, "$1"), 
        text = text.replace(regExp.MORE_WHITESPACE, " "), text = text.replace(regExp.FINAL_SEMICOLONS, "}");
    }, objects = {
        mediaQueryList: function(s) {
            var o = {}, idx = s.indexOf("{"), lt = s.substring(0, idx);
            s = s.substring(idx + 1, s.length - 1);
            for (var mqs = [], rs = [], qts = lt.toLowerCase().substring(7).split(","), i = 0; i < qts.length; i++) mqs[mqs.length] = objects.mediaQuery(qts[i], o);
            var rts = s.match(regExp.BLOCKS_INSIDE);
            if (null !== rts) for (i = 0; i < rts.length; i++) rs[rs.length] = objects.rule(rts[i], o);
            return o.getMediaQueries = function() {
                return mqs;
            }, o.getRules = function() {
                return rs;
            }, o.getListText = function() {
                return lt;
            }, o.getCssText = function() {
                return s;
            }, o;
        },
        mediaQuery: function(s, mql) {
            s = s || "";
            for (var type, not = !1, exp = [], valid = !0, tokens = s.match(regExp.NOT_WHITESPACE), i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                if (type || "not" !== token && "only" !== token) if (type) {
                    if ("(" === token.charAt(0)) {
                        var pair = token.substring(1, token.length - 1).split(":");
                        exp[exp.length] = {
                            mediaFeature: pair[0],
                            value: pair[1] || null
                        };
                    }
                } else type = token; else "not" === token && (not = !0);
            }
            return {
                getList: function() {
                    return mql || null;
                },
                getValid: function() {
                    return valid;
                },
                getNot: function() {
                    return not;
                },
                getMediaType: function() {
                    return type;
                },
                getExpressions: function() {
                    return exp;
                }
            };
        },
        rule: function(s, mql) {
            for (var o = {}, idx = s.indexOf("{"), st = s.substring(0, idx), ss = st.split(","), ds = [], dts = s.substring(idx + 1, s.length - 1).split(";"), i = 0; i < dts.length; i++) ds[ds.length] = objects.declaration(dts[i], o);
            return o.getMediaQueryList = function() {
                return mql || null;
            }, o.getSelectors = function() {
                return ss;
            }, o.getSelectorText = function() {
                return st;
            }, o.getDeclarations = function() {
                return ds;
            }, o.getPropertyValue = function(n) {
                for (var i = 0; i < ds.length; i++) if (ds[i].getProperty() === n) return ds[i].getValue();
                return null;
            }, o;
        },
        declaration: function(s, r) {
            var idx = s.indexOf(":"), p = s.substring(0, idx), v = s.substring(idx + 1);
            return {
                getRule: function() {
                    return r || null;
                },
                getProperty: function() {
                    return p;
                },
                getValue: function() {
                    return v;
                }
            };
        }
    }, parseText = function(el) {
        if ("string" == typeof el.cssHelperText) {
            var o = {
                mediaQueryLists: [],
                rules: [],
                selectors: {},
                declarations: [],
                properties: {}
            }, mqls = o.mediaQueryLists, ors = o.rules, blocks = el.cssHelperText.match(regExp.BLOCKS);
            if (null !== blocks) for (var i = 0; i < blocks.length; i++) "@media " === blocks[i].substring(0, 7) ? (mqls[mqls.length] = objects.mediaQueryList(blocks[i]), 
            ors = o.rules = ors.concat(mqls[mqls.length - 1].getRules())) : ors[ors.length] = objects.rule(blocks[i]);
            var oss = o.selectors, collectSelectors = function(r) {
                for (var ss = r.getSelectors(), i = 0; i < ss.length; i++) {
                    var n = ss[i];
                    oss[n] || (oss[n] = []), oss[n][oss[n].length] = r;
                }
            };
            for (i = 0; i < ors.length; i++) collectSelectors(ors[i]);
            var ods = o.declarations;
            for (i = 0; i < ors.length; i++) ods = o.declarations = ods.concat(ors[i].getDeclarations());
            var ops = o.properties;
            for (i = 0; i < ods.length; i++) {
                var n = ods[i].getProperty();
                ops[n] || (ops[n] = []), ops[n][ops[n].length] = ods[i];
            }
            return el.cssHelperParsed = o, parsed[parsed.length] = el, o;
        }
    }, parseEmbedded = function(el, s) {
        return el.cssHelperText = sanitize(s || el.innerHTML), parseText(el);
    }, parse = function() {
        parsing = !0, parsed = [];
        for (var linked = [], finish = function() {
            for (var i = 0; i < linked.length; i++) parseText(linked[i]);
            var styles = document.getElementsByTagName("style");
            for (i = 0; i < styles.length; i++) parseEmbedded(styles[i]);
            parsing = !1, ready();
        }, links = document.getElementsByTagName("link"), i = 0; i < links.length; i++) {
            var link = links[i];
            link.getAttribute("rel").indexOf("style") > -1 && link.href && 0 !== link.href.length && !link.disabled && (linked[linked.length] = link);
        }
        if (linked.length > 0) {
            var c = 0, checkForFinish = function() {
                c++, c === linked.length && finish();
            }, processLink = function(link) {
                var href = link.href;
                requestText(href, function(text) {
                    text = sanitize(text).replace(regExp.RELATIVE_URLS, "url(" + href.substring(0, href.lastIndexOf("/")) + "/$1)"), 
                    link.cssHelperText = text, checkForFinish();
                }, checkForFinish);
            };
            for (i = 0; i < linked.length; i++) processLink(linked[i]);
        } else finish();
    }, types = {
        mediaQueryLists: "array",
        rules: "array",
        selectors: "object",
        declarations: "array",
        properties: "object"
    }, collections = {
        mediaQueryLists: null,
        rules: null,
        selectors: null,
        declarations: null,
        properties: null
    }, addToCollection = function(name, v) {
        if (null !== collections[name]) {
            if ("array" === types[name]) return collections[name] = collections[name].concat(v);
            var c = collections[name];
            for (var n in v) v.hasOwnProperty(n) && (c[n] = c[n] ? c[n].concat(v[n]) : v[n]);
            return c;
        }
    }, collect = function(name) {
        collections[name] = "array" === types[name] ? [] : {};
        for (var i = 0; i < parsed.length; i++) addToCollection(name, parsed[i].cssHelperParsed[name]);
        return collections[name];
    };
    domReady(function() {
        for (var els = document.body.getElementsByTagName("*"), i = 0; i < els.length; i++) els[i].checkedByCssHelper = !0;
        document.implementation.hasFeature("MutationEvents", "2.0") || window.MutationEvent ? document.body.addEventListener("DOMNodeInserted", function(e) {
            var el = e.target;
            1 === el.nodeType && (broadcast("DOMElementInserted", el), el.checkedByCssHelper = !0);
        }, !1) : setInterval(function() {
            for (var els = document.body.getElementsByTagName("*"), i = 0; i < els.length; i++) els[i].checkedByCssHelper || (broadcast("DOMElementInserted", els[i]), 
            els[i].checkedByCssHelper = !0);
        }, 1e3);
    });
    var getViewportSize = function(d) {
        return "undefined" != typeof window.innerWidth ? window["inner" + d] : "undefined" != typeof document.documentElement && "undefined" != typeof document.documentElement.clientWidth && 0 != document.documentElement.clientWidth ? document.documentElement["client" + d] : void 0;
    };
    return {
        addStyle: function(s, process) {
            var el;
            return null !== document.getElementById("css-mediaqueries-js") ? el = document.getElementById("css-mediaqueries-js") : (el = document.createElement("style"), 
            el.setAttribute("type", "text/css"), el.setAttribute("id", "css-mediaqueries-js"), 
            document.getElementsByTagName("head")[0].appendChild(el)), el.styleSheet ? el.styleSheet.cssText += s : el.appendChild(document.createTextNode(s)), 
            el.addedWithCssHelper = !0, "undefined" == typeof process || process === !0 ? cssHelper.parsed(function() {
                var o = parseEmbedded(el, s);
                for (var n in o) o.hasOwnProperty(n) && addToCollection(n, o[n]);
                broadcast("newStyleParsed", el);
            }) : el.parsingDisallowed = !0, el;
        },
        removeStyle: function(el) {
            return el.parentNode ? el.parentNode.removeChild(el) : void 0;
        },
        parsed: function(fn) {
            parsing ? wait(fn) : "undefined" != typeof parsed ? "function" == typeof fn && fn(parsed) : (wait(fn), 
            parse());
        },
        mediaQueryLists: function(fn) {
            cssHelper.parsed(function() {
                fn(collections.mediaQueryLists || collect("mediaQueryLists"));
            });
        },
        rules: function(fn) {
            cssHelper.parsed(function() {
                fn(collections.rules || collect("rules"));
            });
        },
        selectors: function(fn) {
            cssHelper.parsed(function() {
                fn(collections.selectors || collect("selectors"));
            });
        },
        declarations: function(fn) {
            cssHelper.parsed(function() {
                fn(collections.declarations || collect("declarations"));
            });
        },
        properties: function(fn) {
            cssHelper.parsed(function() {
                fn(collections.properties || collect("properties"));
            });
        },
        broadcast: broadcast,
        addListener: function(n, fn) {
            "function" == typeof fn && (events[n] || (events[n] = {
                listeners: []
            }), events[n].listeners[events[n].listeners.length] = fn);
        },
        removeListener: function(n, fn) {
            if ("function" == typeof fn && events[n]) for (var ls = events[n].listeners, i = 0; i < ls.length; i++) ls[i] === fn && (ls.splice(i, 1), 
            i -= 1);
        },
        getViewportWidth: function() {
            return getViewportSize("Width");
        },
        getViewportHeight: function() {
            return getViewportSize("Height");
        }
    };
}();

domReady(function() {
    var meter, regExp = {
        LENGTH_UNIT: /[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,
        RESOLUTION_UNIT: /[0-9]+(dpi|dpcm)$/,
        ASPECT_RATIO: /^[0-9]+\/[0-9]+$/,
        ABSOLUTE_VALUE: /^[0-9]*(\.[0-9]+)*$/
    }, styles = [], nativeSupport = function() {
        var id = "css3-mediaqueries-test", el = document.createElement("div");
        el.id = id;
        var style = cssHelper.addStyle("@media all and (width) { #" + id + " { width: 1px !important; } }", !1);
        document.body.appendChild(el);
        var ret = 1 === el.offsetWidth;
        return style.parentNode.removeChild(style), el.parentNode.removeChild(el), nativeSupport = function() {
            return ret;
        }, ret;
    }, createMeter = function() {
        meter = document.createElement("div"), meter.style.cssText = "position:absolute;top:-9999em;left:-9999em;margin:0;border:none;padding:0;width:1em;font-size:1em;", 
        document.body.appendChild(meter), 16 !== meter.offsetWidth && (meter.style.fontSize = 16 / meter.offsetWidth + "em"), 
        meter.style.width = "";
    }, measure = function(value) {
        meter.style.width = value;
        var amount = meter.offsetWidth;
        return meter.style.width = "", amount;
    }, testMediaFeature = function(feature, value) {
        var l = feature.length, min = "min-" === feature.substring(0, 4), max = !min && "max-" === feature.substring(0, 4);
        if (null !== value) {
            var valueType, amount;
            if (regExp.LENGTH_UNIT.exec(value)) valueType = "length", amount = measure(value); else if (regExp.RESOLUTION_UNIT.exec(value)) {
                valueType = "resolution", amount = parseInt(value, 10);
                var unit = value.substring((amount + "").length);
            } else regExp.ASPECT_RATIO.exec(value) ? (valueType = "aspect-ratio", amount = value.split("/")) : regExp.ABSOLUTE_VALUE ? (valueType = "absolute", 
            amount = value) : valueType = "unknown";
        }
        var width, height;
        if ("device-width" === feature.substring(l - 12, l)) return width = screen.width, 
        null !== value ? "length" === valueType ? min && width >= amount || max && amount > width || !min && !max && width === amount : !1 : width > 0;
        if ("device-height" === feature.substring(l - 13, l)) return height = screen.height, 
        null !== value ? "length" === valueType ? min && height >= amount || max && amount > height || !min && !max && height === amount : !1 : height > 0;
        if ("width" === feature.substring(l - 5, l)) return width = document.documentElement.clientWidth || document.body.clientWidth, 
        null !== value ? "length" === valueType ? min && width >= amount || max && amount > width || !min && !max && width === amount : !1 : width > 0;
        if ("height" === feature.substring(l - 6, l)) return height = document.documentElement.clientHeight || document.body.clientHeight, 
        null !== value ? "length" === valueType ? min && height >= amount || max && amount > height || !min && !max && height === amount : !1 : height > 0;
        if ("orientation" === feature.substring(l - 11, l)) return width = document.documentElement.clientWidth || document.body.clientWidth, 
        height = document.documentElement.clientHeight || document.body.clientHeight, "absolute" === valueType ? "portrait" === amount ? height >= width : width > height : !1;
        if ("aspect-ratio" === feature.substring(l - 12, l)) {
            width = document.documentElement.clientWidth || document.body.clientWidth, height = document.documentElement.clientHeight || document.body.clientHeight;
            var curRatio = width / height, ratio = amount[1] / amount[0];
            return "aspect-ratio" === valueType ? min && curRatio >= ratio || max && ratio > curRatio || !min && !max && curRatio === ratio : !1;
        }
        if ("device-aspect-ratio" === feature.substring(l - 19, l)) return "aspect-ratio" === valueType && screen.width * amount[1] === screen.height * amount[0];
        if ("color-index" === feature.substring(l - 11, l)) {
            var colors = Math.pow(2, screen.colorDepth);
            return null !== value ? "absolute" === valueType ? min && colors >= amount || max && amount > colors || !min && !max && colors === amount : !1 : colors > 0;
        }
        if ("color" === feature.substring(l - 5, l)) {
            var color = screen.colorDepth;
            return null !== value ? "absolute" === valueType ? min && color >= amount || max && amount > color || !min && !max && color === amount : !1 : color > 0;
        }
        if ("resolution" === feature.substring(l - 10, l)) {
            var res;
            return res = measure("dpcm" === unit ? "1cm" : "1in"), null !== value ? "resolution" === valueType ? min && res >= amount || max && amount > res || !min && !max && res === amount : !1 : res > 0;
        }
        return !1;
    }, testMediaQuery = function(mq) {
        var test = mq.getValid(), expressions = mq.getExpressions(), l = expressions.length;
        if (l > 0) {
            for (var i = 0; l > i && test; i++) test = testMediaFeature(expressions[i].mediaFeature, expressions[i].value);
            var not = mq.getNot();
            return test && !not || not && !test;
        }
    }, testMediaQueryList = function(mql) {
        for (var mqs = mql.getMediaQueries(), t = {}, i = 0; i < mqs.length; i++) testMediaQuery(mqs[i]) && (t[mqs[i].getMediaType()] = !0);
        var s = [], c = 0;
        for (var n in t) t.hasOwnProperty(n) && (c > 0 && (s[c++] = ","), s[c++] = n);
        s.length > 0 && (styles[styles.length] = cssHelper.addStyle("@media " + s.join("") + "{" + mql.getCssText() + "}", !1));
    }, testMediaQueryLists = function(mqls) {
        for (var i = 0; i < mqls.length; i++) testMediaQueryList(mqls[i]);
        ua.ie ? (document.documentElement.style.display = "block", setTimeout(function() {
            document.documentElement.style.display = "";
        }, 0), setTimeout(function() {
            cssHelper.broadcast("cssMediaQueriesTested");
        }, 100)) : cssHelper.broadcast("cssMediaQueriesTested");
    }, test = function() {
        for (var i = 0; i < styles.length; i++) cssHelper.removeStyle(styles[i]);
        styles = [], cssHelper.mediaQueryLists(testMediaQueryLists);
    }, scrollbarWidth = 0, checkForResize = function() {
        var cvpw = cssHelper.getViewportWidth(), cvph = cssHelper.getViewportHeight();
        if (ua.ie) {
            var el = document.createElement("div");
            el.style.width = "100px", el.style.height = "100px", el.style.position = "absolute", 
            el.style.top = "-9999em", el.style.overflow = "scroll", document.body.appendChild(el), 
            scrollbarWidth = el.offsetWidth - el.clientWidth, document.body.removeChild(el);
        }
        var timer, resizeHandler = function() {
            var vpw = cssHelper.getViewportWidth(), vph = cssHelper.getViewportHeight();
            (Math.abs(vpw - cvpw) > scrollbarWidth || Math.abs(vph - cvph) > scrollbarWidth) && (cvpw = vpw, 
            cvph = vph, clearTimeout(timer), timer = setTimeout(function() {
                nativeSupport() ? cssHelper.broadcast("cssMediaQueriesTested") : test();
            }, 500));
        };
        window.onresize = function() {
            var x = window.onresize || function() {};
            return function() {
                x(), resizeHandler();
            };
        }();
    }, docEl = document.documentElement;
    return docEl.style.marginLeft = "-32767px", setTimeout(function() {
        docEl.style.marginTop = "";
    }, 2e4), function() {
        nativeSupport() ? docEl.style.marginLeft = "" : (cssHelper.addListener("newStyleParsed", function(el) {
            testMediaQueryLists(el.cssHelperParsed.mediaQueryLists);
        }), cssHelper.addListener("cssMediaQueriesTested", function() {
            ua.ie && (docEl.style.width = "1px"), setTimeout(function() {
                docEl.style.width = "", docEl.style.marginLeft = "";
            }, 0), cssHelper.removeListener("cssMediaQueriesTested", arguments.callee);
        }), createMeter(), test()), checkForResize();
    };
}());

try {
    document.execCommand("BackgroundImageCache", !1, !0);
} catch (e) {}