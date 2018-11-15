
const worker = new Worker("./worker.js");


worker.onmessage = (evt) => {
    console.log(evt.data);
};

worker.onerror = (err) => {
    console.error(err);
};

worker.onmessageerror = (err) => {
    console.error(err);
};
