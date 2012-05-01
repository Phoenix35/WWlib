self.onmessage = function(e) {
    var data = e.data;
    importScripts("date1.js");
    self.postMessage(now+ ": " + data);
}