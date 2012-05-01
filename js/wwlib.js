(function (window) {

window.idadd = 0;

var ww = (function() {

var ww = function() {
    return new ww.fn.init(arguments);
}

ww.fn = ww.prototype = {
    constructor: ww,

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
        
        // Increment number of global workers. Easier for id recognition
        this.idadd = ++window.idadd;
        
        console.groupCollapsed("#" +this.idadd+ " " +scriptURI);
        console.log("Downloading...");
        console.time(scriptURI);
        
        // Creating one worker per script is not necessarily wanted
        // TODO: Change -_-
        worker = new Worker(scriptURI);
        
        worker.id = this.idadd;
        worker.send = function (data) {
            
        }
        // bind allows to display the right id of the Worker
        worker.kill = (function() {
            console.log("Worker #" +this.id+ " terminated at " +new Date().toTimeString());
            worker.terminate();
        }).bind(worker);
        
        this[scriptURI] = this[worker.id] = worker;
        
        console.log(scriptURI+ " downloaded.");
        console.timeEnd(scriptURI);
        console.warn("Because Web Workers fails SILENTLY if path is invalid, check for any network error.");
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