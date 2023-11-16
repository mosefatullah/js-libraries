/*
 Copyright (C) Ubeyin, Co. 2021
 Distributed under the Apache 2.0 License (license terms are at https://opensource.org/licenses/Apache-2.0).
 */
(function (e, k) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = k() : 'function' == typeof define && define.amd ? define(k) : e.Purein = k()
})(this, function () {
    'use strict';
    let dom;
    class Purein {
        constructor(domain) {
            /* Domain: */
            if (typeof domain !== "undefined" && typeof domain !== "null" && typeof domain !== "function") {
                this.domain = domain;
                dom = domain;
            } else {
                his.domain = undefined;
                dom = undefined;
            }
            /* ![Purein.SCOPE] */
            this.scope = function (a) {
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
                        throw new Error("Purein.scope: Provide an valid name.")
                    }
                } else {
                    throw new Error("Purein.scope: Provide an name of element.")
                }
            }
            /* ![Purein.KEY] */
            this.key = function (a) {
                let d, c;
                let resultName = {};
                let resultCode = [];
                let keyName = [
                    "shift", "ctrl", "alt", /**/
                    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", /**/
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
                    "u", "v", "w", "x", "y", "z", /**/
                    "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", /**/
                    "esc", "capslock", "numlock", "scrollLock", "space", "enter", "backspace", "delete", "insert",
                    "home", "end", "pageup", "pagedown", "arrowup", "arrowdown", "arrowleft", "arrowright", /**/
                    "tab", "print", "pause"
                ];
                let keyCode = [
                    16, 17, 18, /**/
                    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, /**/
                    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
                    90, /**/
                    112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, /**/
                    27, 20, 144, 145, 32, 13, 8, 46, 45, 36, 35, 33, 34, 38, 40, 37, 39, /**/
                    9, 44, 19
                ];
                if (typeof this.domain !== "undefined" && typeof this.domain !== "null" && typeof this.domain === "string") d = document.querySelectorAll(this.domain)[0];
                else d = document;
                if (typeof a !== "undefined" && typeof a !== "null" && typeof a === "object") c = a;
                d.onkeyup = function (e) {
                    let key = e.which || e.keyCode;
                    for (const i in keyCode) {
                        if (Object.hasOwnProperty.call(keyCode, i)) {
                            if (keyCode[i] === key) {
                                resultName[keyName[i]] = true;
                                resultCode.push(keyCode[i]);
                            }
                        }
                    }
                    if (a && a.metadata) a.metadata(resultName, resultCode, e);
                };
                d.onkeydown = function () {
                    setTimeout(() => {
                        resultName = {};
                        resultCode = [];
                    }, 400);
                };
            }
            /* ![Purein.COMPONENT] */
            this.component = function (x, a) {
                var d, c;
                if (typeof this.domain !== "undefined" && typeof this.domain !== "null" && typeof this.domain === "string") d = this.domain;
                else throw new Error("Purein.URL: XMLHttpRequest state must be OPENED with an URL.");
                if (typeof a !== "undefined" && typeof a !== "null" && typeof a === "object") c = a;
                switch (x) {
                    case 'button':
                        let fg = "<style>/*!!!! BUTTONS !!!!*/.purein-button{position:relative;display:inline-block;box-sizing:border-box;border:none;border-radius:4px;padding:0 16px;min-width:64px;height:36px;vertical-align:middle;text-align:center;text-overflow:ellipsis;text-transform:uppercase;color:#fff;background-color:#6200ee;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);font-family:Roboto,'Segoe UI',BlinkMacSystemFont,system-ui,-apple-system;font-size:14px;font-weight:500;line-height:36px;overflow:hidden;outline:0;transition:box-shadow .2s}.purein-button::-moz-focus-inner{border:none}.purein-button-outline{background-color:transparent!important;color:#6200ee;border:1px solid #6200ee;box-shadow:none!important;font-weight:600;height:38px}.purein-button-outline:focus,.purein-button-outline:hover{background-color:rgba(98,0,238,.12)!important}.purein-button::before{content:'';position:absolute;top:0;bottom:0;left:0;right:0;background-color:#fff;opacity:0;transition:opacity .2s}.purein-button::after{content:'';position:absolute;left:50%;top:50%;border-radius:50%;padding:50%;width:32px;height:32px;background-color:#fff;opacity:0;transform:translate(-50%,-50%) scale(1);transition:opacity 1s,transform .5s}.purein-button:focus,.purein-button:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.purein-button:hover::before{opacity:.08}.purein-button:focus::before{opacity:.24}.purein-button:hover:focus::before{opacity:.3}.purein-button:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.purein-button:active::after{opacity:.32;transform:translate(-50%,-50%) scale(0);transition:transform 0s}.purein-button:disabled{color:rgba(0,0,0,.38);background-color:rgba(0,0,0,.12);box-shadow:none;cursor:initial}.purein-button:disabled::before{opacity:0}.purein-button:disabled::after{opacity:0}</style>";
                        document.head.innerHTML += fg;
                        purein_button(c, d);
                        break;
                    default:
                        purein_component(x, c, d);
                        break;
                }

                function purein_button(c, _t) {
                    var a, b, d, k, l, m;
                    var g, f;
                    m = _t;
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
                            for (let i = 0; i < document.querySelectorAll(m).length; i++) {
                                g();
                                document.querySelectorAll(m)[i].appendChild(k);
                            }
                        };
                        return f();
                    } else {
                        throw new Error("Purein.Component: Some arguments are missing - button!");
                    }
                }

                function purein_component(x, y, _t) {
                    var a, b, d, k, m;
                    var g, f;
                    m = _t;
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
                            for (let i = 0; i < document.querySelectorAll(m).length; i++) {
                                g();
                                document.querySelectorAll(m)[i].appendChild(k);
                            }
                        };
                        return f();
                    } else {
                        throw new Error("Purein.Component: Some arguments are missing!");
                    }
                }
            };
            /* ![Purein.CANVAS] */
            this.canvas = {
                get: function () {
                    if (typeof dom !== "undefined" && typeof dom !== "null" && typeof dom === "string") return document.querySelectorAll(dom)[0];
                    else return document;
                },
                text: function (s) {
                    var c = this.get();
                    var ctx = c.getContext("2d");
                    if (typeof s === "object") {
                        if (s.value && s.size && s.font && s.xy && s.xy instanceof Array) {
                            ctx.font = s.size + "px " + s.font;
                            ctx.fillText(s.value, s.xy[0], s.xy[1]);
                        }
                    }
                    this.option(s, ctx);
                },
                line: function (s) {
                    var c = this.get();
                    var ctx = c.getContext("2d");
                    ctx.beginPath();
                    if (typeof s === "object") {
                        if (s.width && typeof s.width === "number") ctx.lineWidth = s.width;
                        if (s.start && s.start instanceof Array && typeof s.start[0] === "number" && typeof s.start[1] === "number") {
                            ctx.moveTo(s.start[0], s.start[1]); /* x, y : start */
                        }
                        if (s.end && s.end instanceof Array) {
                            for (let i = 0; i < s.end.length; i++) {
                                if (typeof s.end[i] === "object" && s.end[i] instanceof Array && typeof s.end[i][0] === "number" && typeof s.end[i][1] === "number") {
                                    ctx.lineTo(s.end[i][0], s.end[i][1]); /* x, y : end */
                                }
                            }
                        }
                    }
                    ctx.closePath();
                    this.option(s, ctx);
                },
                rect: function (s) {
                    var c = this.get();
                    var ctx = c.getContext("2d");
                    if (typeof s === "object") {
                        if (s.width && typeof s.width === "number") ctx.lineWidth = s.width;
                        if (s.end && s.end instanceof Array) {
                            for (let i = 0; i < s.start.length; i++) {
                                for (let k = 0; k < s.end.length; k++) {
                                    if (typeof s.start[i] === "object" && s.start[i] instanceof Array && typeof s.start[i][0] === "number" && typeof s.start[i][1] === "number" && typeof s.end[i] === "object" && s.end[i] instanceof Array && typeof s.end[i][0] === "number" && typeof s.end[i][1] === "number") {
                                        ctx.beginPath();
                                        ctx.rect(s.start[i][0], s.start[i][1], s.end[k][0], s.end[k][1]); /* x, y : end */
                                    }
                                }
                            }
                        }
                    }
                    ctx.closePath();
                    this.option(s, ctx);
                },
                circle: function (s) {
                    var c = this.get();
                    var ctx = c.getContext("2d");
                    if (typeof s === "object") {
                        if (s.width && typeof s.width === "number") ctx.lineWidth = s.width;
                        if (s.xyr && s.start && s.end) {
                            for (let i = 0; i < s.xyr.length; i++) {
                                for (let k = 0; k < s.start.length; k++) {
                                    for (let j = 0; j < s.end.length; j++) {
                                        ctx.beginPath();
                                        ctx.arc(s.xyr[i][0], s.xyr[i][1], s.xyr[i][2], s.start[k], s.end[j]); /* x, y, r, start, end */
                                    }
                                }
                            }
                        }
                    }
                    ctx.closePath();
                    this.option(s, ctx);
                },
                option: function (s, ct) {
                    let ctx, g;
                    if (ct) ctx = ct;
                    else ctx = this.get();
                    if (s.option && typeof s.option === "object") {
                        if (s.option.alpha && typeof s.option.alpha === "number") ctx.globalAlpha = s.option.alpha;
                        if (s.option.rotate && typeof s.option.rotate === "number") ctx.rotate(s.option.rotate);
                        if (s.option.gradient && typeof s.option.gradient === "object" && s.option.gradient instanceof Array) {
                            g = ctx.createLinearGradient(0, 0, this.get().width, 0);
                            for (let i = 0; i < s.option.gradient.length; i++) {
                                g.addColorStop(s.option.gradient[i][0], s.option.gradient[i][1]);
                            }
                        }
                        if (s.option.stroke) {
                            ctx.strokeStyle = s.option.stroke;
                            if (s.option.stroke === "gradient" && g) ctx.strokeStyle = g;
                            ctx.stroke();
                        }
                        if (typeof s.option.shadow === "object" && s.option.shadow instanceof Array && s.option.shadow[0] && typeof s.option.shadow[1] === "number") {
                            ctx.shadowBlur = s.option.shadow[1];
                            ctx.shadowColor = s.option.shadow[0];
                        }
                        if (s.option.fill) {
                            ctx.fillStyle = s.option.fill;
                            if (s.option.fill === "gradient" && g) ctx.fillStyle = g;
                            ctx.fill();
                        }
                    }
                },
                animate: function (animate) {
                    requestAnimationFrame(animate);
                },
                clear: function () {
                    this.get().getContext("2d").clearRect(0, 0, this.get().width, this.get().height);
                },
                save: function () {
                    this.get().getContext("2d").save();
                },
                restore: function () {
                    this.get().getContext("2d").restore();
                },
                url: function () {
                    return this.get().toDataURL("image/svg");
                }
            };
            /* ![Purein.AJAX] */
            this.ajax = function (a) {
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
            this.url = function (a) {
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
            this.gps = function (a) {
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
 ** (Purein 1.1 - A pure frameworks)
 ***/
/***
 * .KEY() [new]
 * .COMPONENT() [update 1]
 * .CANVAS() [new]
 * .(Named Uppercase To Lowercase, Bug Fixed)
 ***/