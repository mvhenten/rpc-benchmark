const schema = require("./schema.js");
const {awesomepackage} = schema;
const Methods = awesomepackage;

/**
 * from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */
async function sha256(message) {
    if (!crypto.subtle)
        return "crypto.subtle is not available on insecure contexts"
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}


const decode = (message) => {
    const {method, params} = message;
    console.log(typeof params);
    console.log(params);
    const handler = Methods[method];

    const uint8 = new Uint8Array(params);

    return handler.decode(uint8);
};

onmessage = async (evt) => {

    const params = decode(evt.data);
    const {jsonrpc, id} = evt.data;

    console.log("hello params", params);

    postMessage({
        jsonrpc,
        method: "ack",
        params: {
            hash: await sha256(params.awesome_field)
        },
        id
    });
};

