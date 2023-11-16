/*!
 * Slize v1.0 (https://ubeyin.github.io/slize)
 * Copyright 2011-2021 The Slize Authors
 * Copyright 2011-2021 Ubeyin, LLC.
 * Licensed under Apache 2.0 (https://github.com/ubeyin/slize/blob/main/LICENSE)
 */
(function () {
    "use strict";
    var Slize;
    var sl;
    sl = function (selector) {
        if (!(this instanceof sl)) {
            return new sl(selector)
        }
        if (typeof selector !== undefined) {
            this.data = selector
        }
        return this
    };
    try {
        Slize = class Slize {
            constructor(slize) {
                this.go = function (go) {
                    return go(sl)
                }
            }
        }
    } catch (e) {
        Slize = function (slize) {};
        (function () {
            this.go = function (go) {
                return go(sl)
            }
        }).call(Slize.prototype)
    }(function () {
        this.prototype.fetch = function (success, error) {
            try {
                let _val = this.data;
                var valOf = function (element) {
                    try {
                        return element.value, element.innerHTML
                    } catch (e) {}
                };
                try {
                    _val = valOf(document.querySelector(this.data)).trim()
                } catch (e) {
                    try {
                        _val = this.data.trim()
                    } catch (e) {}
                }
                var httpObj;
                var method;
                if (!method) {
                    method = "GET"
                }
                if (window.XMLHttpRequest) {
                    httpObj = new XMLHttpRequest()
                } else if (window.ActiveXObject) {
                    httpObj = new ActiveXObject("Microsoft.XMLHTTP")
                }
                if (httpObj) {
                    httpObj.onreadystatechange = function () {
                        if (httpObj.readyState == 4 && httpObj.status == 200) {
                            if (success) {
                                return success(httpObj.responseText, httpObj)
                            }
                        } else {
                            if (error) {
                                return error(httpObj.status)
                            }
                        }
                    };
                    httpObj.open(method, _val, true);
                    httpObj.send(null)
                }
            } catch (e) {
                console.error("Failed to fetch!");
                return false
            }
        };
        this.prototype.include = function (success, error) {
            try {
                var z, i, elmnt, file, xhttp;
                z = document.getElementsByTagName("*");
                for (i = 0; i < z.length; i += 1) {
                    elmnt = z[i];
                    file;
                    try {
                        file = elmnt.getAttribute(this.data)
                    } catch (e) {
                        file = this.data
                    }
                    if (file) {
                        xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                if (this.status == 200) {
                                    elmnt.innerHTML = this.responseText;
                                    if (success) {
                                        return success(this)
                                    }
                                }
                                if (this.status == 404) {
                                    elmnt.innerHTML = "Page not found.";
                                    if (error) {
                                        return error(this)
                                    }
                                }
                            }
                            try {
                                elmnt.removeAttribute(this.data)
                            } catch (e) {}
                        }
                    }
                    xhttp.open("GET", file, true);
                    xhttp.send();
                    return
                }
            } catch (e) {
                throw new Error("Failed to include files!")
            }
        };
        this.prototype.scope = function (_obj) {
            var valOf = function (element) {
                try {
                    return element.value, element.innerHTML
                } catch (e) {}
            };
            var val = function (element, v) {
                if (v) {
                    try {
                        element.value = v;
                        element.innerHTML = v
                    } catch (e) {}
                }
            };
            try {
                var _data;
                try {
                    _data = document.querySelectorAll(this.data.trim())
                } catch (e) {
                    try {
                        _data = element.trim()
                    } catch (e) {}
                }
                for (var i = 0; i <= _data.length; i += 1) {
                    let el = _data[i];
                    for (var x in _obj) {
                        if (valOf(el).includes(x) == true) {
                            val(el, valOf(el).replaceAll("{{" + x + "}}", _obj[x]))
                        }
                        el.classList.replace("{{" + x + "}}", _obj[x])
                    }
                }
            } catch (e) {}
        };
        this.prototype.cursor = function (val) {
            try {
                let _val;
                try {
                    _val = document.querySelector(this.data)
                } catch (e) {
                    try {
                        _val = this.data
                    } catch (e) {}
                }
                for (var i = 0; i <= _val.length; i += 1) {
                    _val[i].focus();
                    _val[i].setRangeText(val, _val[i].selectionStart, _val[i].selectionEnd, "end")
                }
            } catch (e) {}
        };
        this.prototype.copy = function (load) {
            let _val = this.data;
            var valOf = function (element) {
                try {
                    return element.value, element.innerText
                } catch (e) {}
            };
            var val = function (element, v) {
                if (v) {
                    try {
                        element.value = v;
                        element.innerHTML = v
                    } catch (e) {}
                }
            };
            try {
                _val = valOf(document.querySelector(this.data)).trim()
            } catch (e) {
                try {
                    _val = this.data.trim()
                } catch (e) {}
            }
            try {
                var valarea = document.createElement("textarea");
                valarea.innerText = _val;
                valarea.style.opacity = 0;
                valarea.style.position = "fixed";
                valarea.style.left = "-1000px";
                document.body.appendChild(valarea);
                valarea.select();
                valarea.disabled = true;
                document.execCommand("copy");
                document.body.removeChild(valarea);
                if (!navigator.clipboard) {
                    return
                }
                navigator.clipboard.writeText(_val)
            } catch (e) {
                console.error("Copy to clipboard failed!");
                return false
            }
        };
        this.prototype.download = function (name, format) {
            try {
                var a = document.createElement("a");
                var val = this.data;
                var file;
                val = this.data;
                var valOf = function (element) {
                    try {
                        return element.value, element.innerHTML
                    } catch (e) {}
                };
                try {
                    val = valOf(document.querySelector(this.data)).trim()
                } catch (e) {
                    try {
                        val = this.data.trim()
                    } catch (e) {}
                }
                file = new Blob([val], {
                    type: format ? format : "octet/stream"
                });
                a.href = URL.createObjectURL(file);
                a.innerHTML = name;
                a.download = name;
                var func = function () {
                    document.body.appendChild(a)
                };
                if (document.body) {
                    func()
                } else {
                    window.onload = func
                }
                a.onclick = function () {
                    document.body.removeChild(a)
                };
                a.click()
            } catch (e) {
                console.error("Failed to downlonload!");
                return false
            }
        };
        this.prototype.share = function (title, text) {
            let _val = this.data;
            var valOf = function (element) {
                try {
                    return element.value, element.innerHTML
                } catch (e) {}
            };
            try {
                _val = valOf(document.querySelector(this.data)).trim()
            } catch (e) {
                try {
                    _val = this.data.trim()
                } catch (e) {}
            }
            try {
                return navigator.share({
                    title: title,
                    text: text,
                    url: _val
                })
            } catch (e) {
                console.error("Failed to share!");
                return false
            }
        };
        this.prototype.vurl = function (name) {
            window.onload = function () {
                function querySt(ji) {
                    hu = window.location.search.substring(1);
                    gy = hu.split("&");
                    for (i = 0; i < gy.length; i += 1) {
                        ft = gy[i].split("=");
                        if (ft[0] == ji) {
                            return ft[1]
                        }
                    }
                }
                var fieldName = querySt(name);
                if (fieldName == null) {} else {
                    let _val = this.data;
                    var valOf = function (element) {
                        try {
                            return element.value, element.innerHTML
                        } catch (e) {}
                    };
                    try {
                        _val = document.querySelector(this.data)
                    } catch (e) {
                        try {
                            _val = this.data
                        } catch (e) {}
                    }
                    for (var i = 0; i < _val.length; i += 1) {
                        return valueOf(_val[i], fieldName)
                    }
                }
            }
        };
        this.prototype.slide = function (ms, func) {
            try {
                var i, k;
                var ss;
                var x, y = this.data;
                try {
                    x = document.querySelector(this.data).getElementsByClassName("item")
                } catch (e) {
                    x = y
                }
                var l = x.length;
                ss = {};
                ss.current = 1;
                ss.x = x;
                ss.ondisplaychange = func;
                if (!isNaN(ms) || ms == 0) {
                    ss.milliseconds = ms
                } else {
                    ss.milliseconds = 1000
                }
                ss.start = function () {
                    ss.show(ss.current);
                    if (ss.ondisplaychange) {
                        ss.index(ss.current);
                        ss.ondisplaychange(ss.current)
                    }
                    if (ss.milliseconds > 0) {
                        window.clearTimeout(ss.timeout);
                        ss.timeout = window.setTimeout(ss.next, ss.milliseconds)
                    }
                };
                ss.next = function () {
                    ss.current += 1;
                    if (ss.current > ss.x.length) {
                        ss.current = 1
                    }
                    ss.start()
                };
                ss.prev = function () {
                    ss.current -= 1;
                    if (ss.current < 1) {
                        ss.current = ss.x.length
                    }
                    ss.start()
                };
                ss.show = function (n) {
                    for (var i = 0; i < ss.x.length; i += 1) {
                        ss.x[i].style.display = "none"
                    }
                    ss.x[n - 1].style.display = "block"
                };
                ss.index = function (uo) {
                    try {
                        var z = document.querySelector(y).querySelectorAll("ul")[0].querySelectorAll("li");
                        try {
                            for (k = 0; k < z.length; k += 1) {
                                z[k].className = z[k].className.replace("active", "")
                            }
                        } finally {
                            z[ss.current - 1].classList.add("active")
                        }
                    } catch (e) {}
                };
                try {
                    var next = document.querySelector(y).querySelectorAll(".next")[0];
                    var prev = document.querySelector(y).querySelectorAll(".prev")[0];
                    next.onclick = ss.next;
                    prev.onclick = ss.prev
                } catch (e) {}
                ss.start();
                return ss
            } catch (e) {
                console.error("Failed to slide!", e);
                return false
            }
        };
        this.prototype.gps = function (success, error) {
            const getPositionErrorMessage = code => {
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
                        return 'An unknown error';
                        break
                }
            };
            if ('geolocation' in navigator === false) {
                console.error(new TypeError('Geolocation is not supported by your browser.'))
            }
            return navigator.geolocation.getCurrentPosition(function (position) {
                return success(position.coords.latitude, position.coords.longitude, position)
            }, function (e) {
                return error(getPositionErrorMessage(e.code))
            })
        };
        this.prototype.sort = function (xy) {
            try {
                var a;
                try {
                    a = document.querySelector(this.data)
                } catch (e) {
                    try {
                        a = this.data
                    } catch (e) {}
                }
                var cc;
                var res;
                var j;
                var k;
                var v1;
                var v2;
                var b;
                var y;
                for (j = 0; j < 2; j += 1) {
                    cc = 0;
                    y = 1;
                    while (y == 1) {
                        y = 0;
                        b = a.querySelectorAll(xy);
                        for (k = 0; k < (b.length - 1); k += 1) {
                            res = 0;
                            v1 = b[k].innerText;
                            v2 = b[k + 1].innerText;
                            v1 = v1.toLowerCase();
                            v2 = v2.toLowerCase();
                            if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
                                res = 1;
                                break
                            }
                        }
                        if (res == 1) {
                            b[k].parentNode.insertBefore(b[k + 1], b[k]);
                            y = 1;
                            cc += 1
                        }
                    }
                    if (cc > 0) {
                        break
                    }
                }
            } catch (e) {
                console.error("Failed to sort!" + e);
                return false
            }
        }
    }).call(sl);
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Slize;
        module.exports = sl
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Slize, sl
        })
    } else {
        window.Slize = Slize;
        window.sl = sl
    }
}(typeof window !== 'undefined' ? window : this));