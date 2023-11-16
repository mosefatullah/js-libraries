(function (global, factory) {
 if (typeof define === "function" && define.amd) {
  define([], factory);
 } else if (typeof module !== "undefined" && module.exports) {
  module.exports = factory();
 } else {
  global.Observer = factory();
 }
})(this, function () {
 "use strict";

 var Observer = function ($, $$) {
  if (window.IntersectionObserver) {
   this._target = $;
   this._io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      if (typeof $$ == "function") $$(entry.target);
     }
    });
   });
   let io = function (el) {
    this._io.observe(el);
   }.bind(this);
   if (typeof $$ !== "function") throw new Error("Callback is not a function!");
   if ($ === undefined) throw new Error("Target is undefined!");
   if ($.length === 0) throw new Error("Target is empty!");
   if ($.length > 1) {
    $.forEach((el) => {
     io(el);
    });
   } else {
    io($);
   }
  } else {
   throw new Error("IntersectionObserver not supported!");
  }
 };

 Observer.prototype = {
  self: function ($$) {
   let io = this._io;
   if (typeof $$ == "function") $$(io, this._target);
  },
  stop: function ($$) {
   let t = this._target;
   if (t.length > 1) {
    t.forEach((el) => {
     this._io.unobserve(el);
     if (typeof $$ == "function") $$(el);
    });
   } else {
    this._io.unobserve(this._target);
    if (typeof $$ == "function") $$(this._target);
   }
  },
  start: function ($$) {
   let t = this._target;
   if (t.length > 1) {
    t.forEach((el) => {
     this._io.observe(el);
     if (typeof $$ == "function") $$(el);
    });
   } else {
    this._io.observe(this._target);
    if (typeof $$ == "function") $$(this._target);
   }
  },
 };

 return Observer;
});
