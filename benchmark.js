const entries = [
    {
        name: "structured clone",
        Rpc: require("./structured-clone/rpc")
    },
    {
        name: "jsonschema & structured clone",
        Rpc: require("./jsonschema-clone/rpc")
    },
    {
        name: "jsonschema & JSON.stringify",
        Rpc: require("./jsonschema-json-stringify/rpc")
    },
    {
        name: "jsonschema & msgpack-js",
        Rpc: require("./jsonschema-msgpack-js/rpc")
    },
    {
        name: "protobufjs",
        Rpc: require("./protobufjs/rpc")
    },
    {
        name: "pbf",
        Rpc: require("./pbf/rpc")
    },
    {
        name: "protobufjs & pbf",
        Rpc: require("./protobufjs/rpc")
    }
];

const runBenchmark = async(Rpc, stringData) => {
    return new Promise((resolve) => {
        const server = new Rpc();

        server.finish = () => resolve(server.report());
        server.initialize();

        for (var i = 0; i < 100; i++) {
            server.postMessage("AwesomeMessage", {
                messageString: stringData
            });
        }

    });
};

var data = {};

function fib(n) {
    const result = [];
    let a = 0;
    let b = 1;

    for (let i = 0; i < n; i++) {
        let c = a + b;
        result.push(c);
        a = b;
        b = c;
    }
    return result;
}

fib(15).forEach((kb) => {
    let str = "";
    const max = kb * 1024;
    
    do {
        str  += (Math.random() * 10e16).toString(36);
    }
    while (str.length < max);
    data[`${kb}kb`] = str.slice(0, max);
});

function reportToKbps(reports, byteSize) {
    return reports.map(entry => {
        let {label, report} = entry;
        let bits = byteSize * 8;
        let average = report.average;
        
        let kbs = (bits/average).toFixed(2);
        
        report.kbs = kbs;

        return {label, report};
    });
    
}

const run = async() => {
    const fullreport = [];
    

    for (let key in data) {
        let reports = [];

        for (let entry of entries) {
            let { Rpc, name } = entry;
            
            let report = await runBenchmark(Rpc, data[key]);
            let label = name;

            reports.push({label, report});
        }

        const bytes = (new TextEncoder('utf-8').encode(data[key])).length;
        reports = reportToKbps(reports, bytes);
        report(key, reports);

        fullreport.push({key, reports});
    }
    
    const div = document.createElement("div");
    div.id = "benchmark-complete";
    document.body.append(div);
    window.drawChart(fullreport);
};


const report = (header, reports) => {
    const results = document.getElementById("benchmark-results");
    results.innerText += JSON.stringify(reports, null, 2);
};

const result = document.createElement("pre");
result.id = "benchmark-results";
document.body.append(result);

// setTimeout(run, 3000);
run();
