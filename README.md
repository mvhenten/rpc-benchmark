Measure performance of serialization over postMessage


* Use JSON rpc (?)


Sending something back and forth:

        Rpc.postMessage({
            target: "dialog",
            method: "alert",
            args: [message],
        }),
        
        

