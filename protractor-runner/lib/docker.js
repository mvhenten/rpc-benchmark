const {spawn} = require("child_process");

const docker = async (args, options = {}) => {
    return await new Promise((resolve, reject) => {
        const executable = "docker";
        const child = spawn(executable, args, options);

        let stdout = "";

        // eslint-disable-next-line no-console
        child.stderr.on("data", (data) => console.error(data.toString()));
        child.stdout.on("data", (data) => {
            stdout += data;
        });

        child.on("error", (error) => reject(error));
        child.on("close", (code) => {
            if (code !== 0) {
                reject(new Error(`${executable} exited with code ${code}`));
            } else {
                resolve(stdout);
            }
        });
    });
};

exports.setup = async (buildpath) => {
    await docker(["build", buildpath, "-t", "c9-headless:latest"]);
};
