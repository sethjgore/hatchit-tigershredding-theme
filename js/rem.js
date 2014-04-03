!function(window) {
    "use strict";
    var cssremunit = function() {
        var div = document.createElement("div");
        return div.style.cssText = "font-size: 1rem;", /rem/.test(div.style.fontSize);
    }, isStyleSheet = function() {
        for (var styles = document.getElementsByTagName("link"), filteredLinks = [], i = 0; i < styles.length; i++) "stylesheet" === styles[i].rel.toLowerCase() && null === styles[i].getAttribute("data-norem") && filteredLinks.push(styles[i].href);
        return filteredLinks;
    }, processLinks = function() {
        0 === links.length && (links = isStyleSheet());
        for (var i = 0; i < links.length; i++) xhr(links[i], storeCSS, links[i], i);
    }, storeCSS = function(response, link) {
        if (preCSS.push(response.responseText), CSSLinks.push(link), CSSLinks.length === links.length) {
            for (var j = 0; j < CSSLinks.length; j++) matchCSS(preCSS[j], CSSLinks[j]);
            (links = importLinks.slice(0)).length > 0 ? (CSSLinks = [], preCSS = [], importLinks = [], 
            processLinks()) : buildCSS();
        }
    }, matchCSS = function(sheetCSS, link) {
        for (var importStatement, clean = removeComments(removeMediaQueries(sheetCSS)), pattern = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g, current = clean.match(pattern), remPattern = /\d*\.?\d+rem/g, remCurrent = clean.match(remPattern), sheetPathPattern = /(.*\/)/, sheetPath = sheetPathPattern.exec(link)[0], importPattern = /@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm; null !== (importStatement = importPattern.exec(sheetCSS)); ) importLinks.push(sheetPath + importStatement[1]);
        null !== current && 0 !== current.length && (found = found.concat(current), foundProps = foundProps.concat(remCurrent));
    }, buildCSS = function() {
        for (var pattern = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g, i = 0; i < found.length; i++) {
            rules += found[i].substr(0, found[i].indexOf("{") + 1);
            for (var current = found[i].match(pattern), j = 0; j < current.length; j++) rules += current[j], 
            j === current.length - 1 && "}" !== rules[rules.length - 1] && (rules += "\n}");
        }
        parseCSS();
    }, parseCSS = function() {
        for (var remSize, i = 0; i < foundProps.length; i++) remSize = parseFloat(foundProps[i].replace(/\D/g, "")), 
        css[i] = Math.round(remSize * fontSize) + "px";
        loadCSS();
    }, loadCSS = function() {
        for (var i = 0; i < css.length; i++) css[i] && (rules = rules.replace(foundProps[i], css[i]));
        var remcss = document.createElement("style");
        remcss.setAttribute("type", "text/css"), remcss.id = "remReplace", document.getElementsByTagName("head")[0].appendChild(remcss), 
        remcss.styleSheet ? remcss.styleSheet.cssText = rules : remcss.appendChild(document.createTextNode(rules));
    }, xhr = function(url, callback, i) {
        try {
            var xhr = getXMLHttpRequest();
            xhr.open("GET", url, !0), xhr.send();
            var ie = function() {
                for (var undef, v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i"); div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->", 
                all[0]; ) ;
                return v > 4 ? v : undef;
            }();
            xhr.onreadystatechange = ie >= 7 ? function() {
                4 === xhr.readyState && callback(xhr, i);
            } : new function() {
                4 === xhr.readyState && callback(xhr, i);
            }();
        } catch (e) {
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest();
                xdr.open("get", url), xdr.onload = function() {
                    callback(xdr, i);
                }, xdr.onerror = function() {
                    return !1;
                }, xdr.send();
            }
        }
    }, removeComments = function(css) {
        for (var start = css.search(/\/\*/), end = css.search(/\*\//); start > -1 && end > start; ) css = css.substring(0, start) + css.substring(end + 2), 
        start = css.search(/\/\*/), end = css.search(/\*\//);
        return css;
    }, mediaQuery = function() {
        return window.matchMedia || window.msMatchMedia ? !0 : !1;
    }, removeMediaQueries = function(css) {
        return mediaQuery() || (css = css.replace(/@media[\s\S]*?\}\s*\}/, "")), css;
    }, getXMLHttpRequest = function() {
        if (window.XMLHttpRequest) return new XMLHttpRequest();
        try {
            return new ActiveXObject("MSXML2.XMLHTTP");
        } catch (e1) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {}
        }
    };
    if (!cssremunit()) {
        var rules = "", links = [], importLinks = [], found = [], foundProps = [], preCSS = [], CSSLinks = [], css = [], body = document.getElementsByTagName("body")[0], fontSize = "";
        body.currentStyle ? fontSize = body.currentStyle.fontSize.indexOf("px") >= 0 ? body.currentStyle.fontSize.replace("px", "") : body.currentStyle.fontSize.indexOf("em") >= 0 ? body.currentStyle.fontSize.replace("em", "") : body.currentStyle.fontSize.indexOf("pt") >= 0 ? body.currentStyle.fontSize.replace("pt", "") : body.currentStyle.fontSize.replace("%", "") / 100 * 16 : window.getComputedStyle && (fontSize = document.defaultView.getComputedStyle(body, null).getPropertyValue("font-size").replace("px", "")), 
        processLinks();
    }
}(window);