const client = require("./client");

async function init() {
    await client.set("msgs:4", "I am Pratyush");
    const result = await client.get("msgs:4");
    console.log(result);
}

init();