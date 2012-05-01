(function (window) {

var ww = (function() {

var ww = function() {
    return new ww.fn.init(arguments);
}

ww.fn = ww.prototype = {
    constructor: ww,

    FILE_CHECK: false,

    init: function(scripts) {
        for(var i in scripts)
            if(scripts.hasOwnProperty(i))
                this.add(scripts[i]);

        return this;
    },

    add: function (scriptURI) {
        if(typeof scriptURI !== "string")
            throw new this.error(scriptURI+ " must be a string.");

        // https://developer.mozilla.org/en/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
        if(/^(?:data|javascript(?=:))/.test(scriptURI))
            throw new this.error("Spec disallows data: and javascript: URLs");
        
        console.group();
        console.log("Loading " +scriptURI);
        var worker = new Worker(scriptURI);
        // Creating one worker per script is not necessarily wanted
        // TODO: Change -_-
        console.log(scriptURI+ " downloaded.");
        console.warn('It may have silently failed though, sorry!');
        console.groupEnd();
        
        return worker;
    },

    error: function (message) {
        this.name = "Web Workers Library Error";
        this.message = message || "Unknown error";
    }
};

return ww;

})();

ww.fn.init.prototype = ww.fn;


window.ww = ww;

})(window);