/*
 Copyright (C) Ubeyin, Co. 2021
 Distributed under the Apache 2.0 License (license terms are at https://opensource.org/licenses/Apache-2.0).
 */
 (function (e, k) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = k() : 'function' == typeof define && define.amd ? define(k) : e.Purein = k()
})(this, function () {
    'use strict';
    class Purein {
        constructor(domain) {
            /* Domain: */
            if (typeof domain !== "undefined" && typeof domain !== "null" && typeof domain !== "function") this.domain = domain;
            else this.domain = undefined;
            /* ![Purein.SCOPE] */
            this.SCOPE = function (a) {
                var d = this.domain;
                if (typeof d === 'string' && typeof d !== "undefined") {
                    if (document.querySelectorAll(d)[0].nodeName && typeof document.querySelectorAll(d)[0] === "object") {
                        for (const k in a) {
                            if (Object.hasOwnProperty.call(a, k)) {
                                for (let i = 0; i < document.querySelectorAll(d).length; i++) {
                                    document.querySelectorAll(d)[i].innerHTML = document.querySelectorAll(d)[i].innerHTML.replaceAll("<" + k + ">", a[k]);
                                }
                            }
                        }
                    } else {
                        throw new Error("Purein.scope: Provide an valid name of element.")
                    }
                } else {
                    throw new Error("Purein.scope: Provide an name of element.")
                }
            }
            /* ![Purein.COMPONENT] */
            this.COMPONENT = function (x, y) {
                switch (x) {
                    case 'button':
                        let fg = "<style>/*!!!! BUTTONS !!!!*/.purein-button{position:relative;display:inline-block;box-sizing:border-box;border:none;border-radius:4px;padding:0 16px;min-width:64px;height:36px;vertical-align:middle;text-align:center;text-overflow:ellipsis;text-transform:uppercase;color:#fff;background-color:#6200ee;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);font-family:Roboto,'Segoe UI',BlinkMacSystemFont,system-ui,-apple-system;font-size:14px;font-weight:500;line-height:36px;overflow:hidden;outline:0;transition:box-shadow .2s}.purein-button::-moz-focus-inner{border:none}.purein-button-outline{background-color:transparent!important;color:#6200ee;border:1px solid #6200ee;box-shadow:none!important;font-weight:600;height:38px}.purein-button-outline:focus,.purein-button-outline:hover{background-color:rgba(98,0,238,.12)!important}.purein-button::before{content:'';position:absolute;top:0;bottom:0;left:0;right:0;background-color:#fff;opacity:0;transition:opacity .2s}.purein-button::after{content:'';position:absolute;left:50%;top:50%;border-radius:50%;padding:50%;width:32px;height:32px;background-color:#fff;opacity:0;transform:translate(-50%,-50%) scale(1);transition:opacity 1s,transform .5s}.purein-button:focus,.purein-button:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.purein-button:hover::before{opacity:.08}.purein-button:focus::before{opacity:.24}.purein-button:hover:focus::before{opacity:.3}.purein-button:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.purein-button:active::after{opacity:.32;transform:translate(-50%,-50%) scale(0);transition:transform 0s}.purein-button:disabled{color:rgba(0,0,0,.38);background-color:rgba(0,0,0,.12);box-shadow:none;cursor:initial}.purein-button:disabled::before{opacity:0}.purein-button:disabled::after{opacity:0}</style>";
                        document.head.innerHTML += fg;
                        purein_button(y, this);
                        break;
                    default:
                        purein_component(x, y, this);
                        break;
                }
                function purein_button(c, _t) {
                    var a, b, d, k, l, m;
                    var g, f;
                    m = _t.domain;
            
                    if (_t) {
                        g = function () {
                            if (c) a = c;
                            else a = {};
                            l = 'purein-button', b = a.value, d = a.attr;
                            k = document.createElement('button');
                            if (a.value) k.innerHTML = b;
                            if (a.style == 'outline') k.classList.add('purein-button-outline');
                            if (typeof d === "object") {
                                for (const key in d) {
                                    if (Object.hasOwnProperty.call(d, key)) {
                                        if (typeof d[key] === 'function') k.addEventListener(key, d[key]);
                                        else if (typeof d[key] === 'string') k.setAttribute(key, d[key]);
                                    }
                                }
                            }
                            k.classList.add(l);
                        };
            
                        f = function () {
            
                            if (m.nodeName && typeof m == 'object') {
                                g();
                                m.appendChild(k)
                            } else if (typeof m === "string") {
                                for (let i = 0; i < document.querySelectorAll(m).length; i++) {
                                    g();
                                    document.querySelectorAll(m)[i].appendChild(k);
                                }
                            }
                        };
            
                        return f();
                    } else {
                        throw new Error("Purein.Component->['Some arguments are missing!']");
                    }
                }
                function purein_component(x, y, _t) {
                    var a, b, d, k, m;
                    var g, f;
                    m = _t.domain;
            
                    if (x && _t) {
                        g = function () {
                            if (y) a = y;
                            else a = {};
                            b = a.value, d = a.attr;
                            k = document.createElement(x);
                            if (a.value) k.value = b;
                            if (typeof d === "object") {
                                for (const key in d) {
                                    if (Object.hasOwnProperty.call(d, key)) {
                                        if (typeof d[key] === 'function') k.addEventListener(key, d[key]);
                                        else if (typeof d[key] === 'string') k.setAttribute(key, d[key]);
                                    }
                                }
                            }
                        };
            
                        f = function () {
                            if (m.nodeName && typeof m == 'object') {
                                g();
                                m.appendChild(k)
                            } else if (typeof m === "string") {
                                for (let i = 0; i < document.querySelectorAll(m).length; i++) {
                                    g();
                                    document.querySelectorAll(m)[i].appendChild(k);
                                }
                            }
                        };
                        return f();
                    } else {
                        throw new Error("Purein.Component->['Some arguments are missing!']");
                    }
                }
            };
            /* ![Purein.AJAX] */
            this.AJAX = function (a) {
                let d, c;
                let x;
                if (typeof this.domain !== "undefined" && typeof this.domain !== "null" && typeof this.domain === "string") d = this.domain;
                else throw new Error("Purein.URL: XMLHttpRequest state must be OPENED with an URL.");
                if (typeof a !== "undefined" && typeof a !== "null" && typeof a === "object") c = a;
                if (window.XMLHttpRequest) /* Firefox, Opera, IE7, and other browsers will use the native object */ x = new XMLHttpRequest();
                else
                    /* IE 5 and 6 will use the ActiveX control */
                    x = new ActiveXObject("Microsoft.XMLHTTP");
                if (x && d) x.open("GET", d, 0);
                else if (x && d && typeof c.method !== "undefined" && typeof c.method !== "null" && typeof c.method === "string") x.open(c.method, d, 0);
                x.addEventListener("load", function () {
                    if (this.readyState == 4 && this.status == 200) {
                        if (c && c.metadata && typeof c.metadata === "function") return c.metadata(x.responseText, x);
                    }
                });
                x.addEventListener("error", function () {
                    if (c && c.metaerr && typeof c.metaerr === "function") return c.metaerr(x);
                });
                x.send(c.method ? c.method : null);
            };
            /* ![Purein.URL] */
            this.URL = function (a) {
                let d, c;
                let v1, v4;
                if (typeof this.domain !== "undefined" && typeof this.domain !== "null" && typeof this.domain === "string") d = this.domain;
                else throw new Error("Purein.getURL: Provide an URL Parameter.");
                if (typeof a !== "undefined" && typeof a !== "null" && typeof a === "object") c = a;
                v1 = (k) => {
                    v4 = (a2) => {
                        let hu = window.location.search.substring(1),
                            gy = hu.split("&"),
                            ft, i;
                        for (i = 0; i < gy.length; i += 1) {
                            ft = gy[i].split("=");
                            if (ft[0] == a2) {
                                return ft[1]
                            }
                        }
                    }
                    if (c && c.metadata) return c.metadata(v4(k));
                };
                if (d) return v1(d);
            };
            /* ![Purein.GPS] */
            this.GPS = function (a) {
                var c;
                if (typeof a !== "undefined" && typeof a !== "null" && typeof a === "object") c = a;
                const getPositionErrorMessage = (code) => {
                    switch (code) {
                        case 1:
                            return 'Permission denied.';
                            break;
                        case 2:
                            return 'Position unavailable.';
                            break;
                        case 3:
                            return 'Timeout reached.';
                            break;
                        default:
                            return 'An unknown error.';
                            break
                    }
                };
                if ('geolocation' in navigator === false && c && c.metaerr) return c.metaerr('Geolocation is not supported by your browser.');
                if ('geolocation' in navigator !== false) return navigator.geolocation.getCurrentPosition(function (p) {
                    if (c && c.metadata) return c.metadata(p.coords.latitude, p.coords.longitude, p)
                }, function (e) {
                    if (c && c.metaerr) return c.metaerr(getPositionErrorMessage(e.code))
                })
            };
            /* ![end] */
        }
    }
    return Purein;
});

/***
 ** Purein 1.0 - A pure frameworks
 ***/
/***
 * .AJAX() [new]
 * .URL()  [new]
 * .GPS()  [new]
 * .SCOPE() [new]
 * .COMPONENT() [new]
 ***/