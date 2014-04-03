!function(w) {
    "use strict";
    function callMedia() {
        applyMedia(!0);
    }
    var respond = {};
    w.respond = respond, respond.update = function() {};
    var requestQueue = [], xmlHttp = function() {
        var xmlhttpmethod = !1;
        try {
            xmlhttpmethod = new w.XMLHttpRequest();
        } catch (e) {
            xmlhttpmethod = new w.ActiveXObject("Microsoft.XMLHTTP");
        }
        return function() {
            return xmlhttpmethod;
        };
    }(), ajax = function(url, callback) {
        var req = xmlHttp();
        req && (req.open("GET", url, !0), req.onreadystatechange = function() {
            4 !== req.readyState || 200 !== req.status && 304 !== req.status || callback(req.responseText);
        }, 4 !== req.readyState && req.send(null));
    };
    if (respond.ajax = ajax, respond.queue = requestQueue, respond.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
        maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
    }, respond.mediaQueriesSupported = w.matchMedia && null !== w.matchMedia("only all") && w.matchMedia("only all").matches, 
    !respond.mediaQueriesSupported) {
        var lastCall, resizeDefer, eminpx, doc = w.document, docElem = doc.documentElement, mediastyles = [], rules = [], appendedEls = [], parsedSheets = {}, resizeThrottle = 30, head = doc.getElementsByTagName("head")[0] || docElem, base = doc.getElementsByTagName("base")[0], links = head.getElementsByTagName("link"), getEmValue = function() {
            var ret, div = doc.createElement("div"), body = doc.body, originalHTMLFontSize = docElem.style.fontSize, originalBodyFontSize = body && body.style.fontSize, fakeUsed = !1;
            return div.style.cssText = "position:absolute;font-size:1em;width:1em", body || (body = fakeUsed = doc.createElement("body"), 
            body.style.background = "none"), docElem.style.fontSize = "100%", body.style.fontSize = "100%", 
            body.appendChild(div), fakeUsed && docElem.insertBefore(body, docElem.firstChild), 
            ret = div.offsetWidth, fakeUsed ? docElem.removeChild(body) : body.removeChild(div), 
            docElem.style.fontSize = originalHTMLFontSize, originalBodyFontSize && (body.style.fontSize = originalBodyFontSize), 
            ret = eminpx = parseFloat(ret);
        }, applyMedia = function(fromResize) {
            var name = "clientWidth", docElemProp = docElem[name], currWidth = "CSS1Compat" === doc.compatMode && docElemProp || doc.body[name] || docElemProp, styleBlocks = {}, lastLink = links[links.length - 1], now = new Date().getTime();
            if (fromResize && lastCall && resizeThrottle > now - lastCall) return w.clearTimeout(resizeDefer), 
            void (resizeDefer = w.setTimeout(applyMedia, resizeThrottle));
            lastCall = now;
            for (var i in mediastyles) if (mediastyles.hasOwnProperty(i)) {
                var thisstyle = mediastyles[i], min = thisstyle.minw, max = thisstyle.maxw, minnull = null === min, maxnull = null === max, em = "em";
                min && (min = parseFloat(min) * (min.indexOf(em) > -1 ? eminpx || getEmValue() : 1)), 
                max && (max = parseFloat(max) * (max.indexOf(em) > -1 ? eminpx || getEmValue() : 1)), 
                thisstyle.hasquery && (minnull && maxnull || !(minnull || currWidth >= min) || !(maxnull || max >= currWidth)) || (styleBlocks[thisstyle.media] || (styleBlocks[thisstyle.media] = []), 
                styleBlocks[thisstyle.media].push(rules[thisstyle.rules]));
            }
            for (var j in appendedEls) appendedEls.hasOwnProperty(j) && appendedEls[j] && appendedEls[j].parentNode === head && head.removeChild(appendedEls[j]);
            appendedEls.length = 0;
            for (var k in styleBlocks) if (styleBlocks.hasOwnProperty(k)) {
                var ss = doc.createElement("style"), css = styleBlocks[k].join("\n");
                ss.type = "text/css", ss.media = k, head.insertBefore(ss, lastLink.nextSibling), 
                ss.styleSheet ? ss.styleSheet.cssText = css : ss.appendChild(doc.createTextNode(css)), 
                appendedEls.push(ss);
            }
        }, translate = function(styles, href, media) {
            var qs = styles.replace(respond.regex.keyframes, "").match(respond.regex.media), ql = qs && qs.length || 0;
            href = href.substring(0, href.lastIndexOf("/"));
            var repUrls = function(css) {
                return css.replace(respond.regex.urls, "$1" + href + "$2$3");
            }, useMedia = !ql && media;
            href.length && (href += "/"), useMedia && (ql = 1);
            for (var i = 0; ql > i; i++) {
                var fullq, thisq, eachq, eql;
                useMedia ? (fullq = media, rules.push(repUrls(styles))) : (fullq = qs[i].match(respond.regex.findStyles) && RegExp.$1, 
                rules.push(RegExp.$2 && repUrls(RegExp.$2))), eachq = fullq.split(","), eql = eachq.length;
                for (var j = 0; eql > j; j++) thisq = eachq[j], mediastyles.push({
                    media: thisq.split("(")[0].match(respond.regex.only) && RegExp.$2 || "all",
                    rules: rules.length - 1,
                    hasquery: thisq.indexOf("(") > -1,
                    minw: thisq.match(respond.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                    maxw: thisq.match(respond.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                });
            }
            applyMedia();
        }, makeRequests = function() {
            if (requestQueue.length) {
                var thisRequest = requestQueue.shift();
                ajax(thisRequest.href, function(styles) {
                    translate(styles, thisRequest.href, thisRequest.media), parsedSheets[thisRequest.href] = !0, 
                    w.setTimeout(function() {
                        makeRequests();
                    }, 0);
                });
            }
        }, ripCSS = function() {
            for (var i = 0; i < links.length; i++) {
                var sheet = links[i], href = sheet.href, media = sheet.media, isCSS = sheet.rel && "stylesheet" === sheet.rel.toLowerCase();
                href && isCSS && !parsedSheets[href] && (sheet.styleSheet && sheet.styleSheet.rawCssText ? (translate(sheet.styleSheet.rawCssText, href, media), 
                parsedSheets[href] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(href) && !base || href.replace(RegExp.$1, "").split("/")[0] === w.location.host) && ("//" === href.substring(0, 2) && (href = w.location.protocol + href), 
                requestQueue.push({
                    href: href,
                    media: media
                })));
            }
            makeRequests();
        };
        ripCSS(), respond.update = ripCSS, respond.getEmValue = getEmValue, w.addEventListener ? w.addEventListener("resize", callMedia, !1) : w.attachEvent && w.attachEvent("onresize", callMedia);
    }
}(this);