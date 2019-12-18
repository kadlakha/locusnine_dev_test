var http = require('http');
var querystring = require('querystring');


module.exports = {
    callBack: requestCallBack,
    promise: requestPromise,
    resolveAllPromises: promiseAll,
    plainHttpRequest: plainHttpRequest
}

/**
 * Resolve all Promises in the promise Array
 * 
 * @param {Promise[]} promises 
 * @param {Function} callback 
 */
function promiseAll(promises, callback) {
    if (promises instanceof Array && typeof callback === "function") {
        Promise.all(promises).then(function (values) {
            callback(null, values);
        }, function (error) {
            callback(error, null);
        }).catch(function (error) {
            callback(error, null);
        });
    } else if (typeof callback === "function") {
        callback("Please provide valid Promise Array", null);
    }
}

function requestPromise(options) {
    return new Promise(function (resolve, reject) {
        // Set up the request`
        var post_options = resolveOptions(options);
        var post_req = http.request(post_options, function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('requestPromise.statusCode: ' + res.statusCode));
            }

            res.setEncoding('utf8');

            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });

        post_req.on('error', (e) => {
            reject(e);
        });

        // post the datadata
        post_req.write(options.post_data);
        post_req.end();
    }).catch(error => {
    });
}

/**
 * Execute asyc http request with given callback for defined options.
 * Expects JSON data in options.json and contenttype application/json for JSON POST APIs
 * @param {json} options 
 * @param {function} callback 
 * @returns nothing
 */
function requestCallBack(options, callback) {

    var post_options = resolveOptions(options);
    // Set up the request
    var post_req = http.request(post_options, function (res) {
        if (res.statusCode < 200 || res.statusCode >= 300) {
            callback('requestCallBack.statusCode: ' + res.statusCode, null, options.parentResponse);
        }

        res.setEncoding('utf8');

        var data = "";
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            callback(null, data, options.parentResponse);
        });
    });


    post_req.on('error', (e) => {
        callback(e, null, options.parentResponse);
    });

    // post the data
    post_req.write(options.post_data);
    post_req.end();
}

function resolveOptions(options) {

    let emp_id = options.request.cookies['X-eid'];
    let branch_code = options.request.cookies['X-br'];
    let roleTypeAmount = options.request.cookies['roleTypeAmount'];
    let roleTypeApprover = options.request.cookies['roleTypeApprover'];
    let roleId = options.request.cookies['X-role-id'];
    let token = options.request.cookies['token'];
    let XView = options.request.headers['x-view'];
    let XDesginationId = options.request.cookies['X-desgination-id'];

    

    let post_data = options.post_data ? querystring.stringify(options.post_data) : "";
    if (typeof options.json != 'undefined' && options.json != "") {
        post_data = JSON.stringify(options.json);
    }
    options.post_data = post_data;

    let headers = {
        'X-eid': emp_id,
        'X-br': branch_code,
        'authorization': token,
        'Content-Type': (typeof options.contentType == 'undefined' || options.contentType == '') ? 'application/x-www-form-urlencoded' : options.contentType,
        'Content-Length': Buffer.byteLength(post_data),
        'X-view': (typeof XView === 'undefined') ? "" : XView,
        'X-desgination-id': XDesginationId,
        'X-role-id': roleId
    }
    for (var key in options.headers) {
        headers[key] = options.headers[key]
    }

    return {
        host: options.ip,
        port: options.port,
        path: options.url,
        method: options.method,
        headers: headers
    }
}


function plainHttpRequest(options) {
    return new Promise(function (resolve, reject) {
        // Set up the request
        var post_req = http.request(options, function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('plainHttpRequest.statusCode: ' + res.statusCode));
            }

            res.setEncoding('utf8');

            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });

        post_req.on('error', (e) => {
            reject(e);
        });

        // post the datadata
        var post_data = options.post_data ? querystring.stringify(options.post_data) : "";
        if (typeof options.json != 'undefined' && options.json != "") {
            post_data = JSON.stringify(options.json);
        }
        post_req.write(post_data);
        post_req.end();
    }).catch(error => {
    });
}