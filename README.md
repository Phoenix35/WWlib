WWlib: Some lazy Web Workers library
====================================

* Author: [Phoenix35](https://github.com/Phoenix35)
* Year: 2012
* Released under GNU/GPL License

Feel free to copy and use at will, but please mention the author.

Usage
-----
## Instanciation

Arguments are the one normally used on calling `new Worker(script_1_URI), new Worker(script_2_URI)`
``` javascript
var workers = new ww([script_1_URI[, ...]]);
```
`workers` is the global object containing every Web Workers

## Accessing a worker
``` javascript
workers[script_1_URI];
```

## Methods

### Adding
You may add a worker to the object simply by using the add method
``` javascript
workers.add(script_2_URI);
```
Look at the console.

### Messages
Use a Web Worker as usual (no methods implemented yet)

### Terminate
You can either use `terminate()` or `kill()`
Look at the console for difference.