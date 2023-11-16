(function (global, factory) {
    if (typeof define === "function" && define.amd) {
     define([], factory);
    } else if (typeof module !== "undefined" && module.exports) {
     module.exports = factory();
    } else {
     global.PDF = factory();
    }
   })(this, function () {
    "use strict";
   
    var PDF = function ($, $$) {
        
    };
   
    PDF.prototype = {
        
    };
   
    return PDF;
   });
   