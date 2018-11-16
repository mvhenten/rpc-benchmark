const entries = [
    {
        name: "structured clone",
        Rpc: require("./structured-clone/rpc")
    },
    {
        name: "jsonschema & clone",
        Rpc: require("./jsonschema-clone/rpc")
    },
    // {
    //     name: "jsonschema & clone, no worker validation",
    //     Rpc: require("./structured-clone/rpc")
    // },
    {
        name: "jsonschema & msgpack-js",
        Rpc: require("./jsonschema-msgpack-js/rpc")
    },
    // {
    //     name: "jsonschema & msgpack-js, no worker validation",
    //     Rpc: require("./jsonschema-msgpack-js/rpc")
    // },
    {
        name: "pbf",
        Rpc: require("./pbf/rpc")
    },
    {
        name: "protobufjs",
        Rpc: require("./protobufjs/rpc")
    },
    {
        name: "protobufjs & pbf",
        Rpc: require("./protobufjs/rpc")
    }
].reverse();

const runBenchmark = async(Rpc, stringData) => {
    return new Promise((resolve) => {
        const server = new Rpc();

        server.finish = () => resolve(server.report());
        server.initialize();

        for (var i = 0; i < 1000; i++) {
            server.postMessage("AwesomeMessage", {
                messageString: stringData
            });
        }

    });
};

const randomdata = (size) => {
//   return new Array(size).fill(0).map(()=>"x").join(" ");    
  return new Array(size).fill(0).map(()=>(Math.random()*10e16).toString(36)).join(" ");    
};

var nestedObject = (depth=100) => {
    const obj = {leaves:[]};
    let cur = obj;

    while (0 < depth && (depth = depth -1)) {
        const key = (Math.random()*10e16).toString(36);
        const leaf = { [key]: { leaves: [] } };
        
        cur.leaves.push(leaf);
        cur = leaf[key];
    }
    return obj;
};



const data = {
    "JSON blob": JSON.stringify(nestedObject()),
    "10 words": randomdata(10),
    "50 words": randomdata(50),
    "100 words": randomdata(100)
};

const run = async() => {

    for (let key in data) {
        const reports = [];
        for (let entry of entries) {
            let { Rpc, name } = entry;
    
            const report = await runBenchmark(Rpc, data[key]);
            
            let label = name;
            
            reports.push({label, report});
        }
        table(key, reports);
    }
    
    const div = document.createElement("div");
    div.id = "benchmark-complete";
    document.body.append(div);
};

const table = (header, reports) => {
    const rows = reports.map(entry => {
        const {label, report} = entry;
        return `
        <tr>
            <th>${label}</th>
            <td>${report.average}</td>
            <td>${report.min}</td>
            <td>${report.max}</td>
        </tr>`;
    });
    
    const div = document.createElement("div");
    div.innerHTML = `<h2>${header}</h2><table class='benchmark-results'>${rows.join("\n")}</table><hr/>`;
    
    document.body.appendChild(div);
    
    
    console.log(div.innerText);
    
};

// setTimeout(run, 3000);
run();
