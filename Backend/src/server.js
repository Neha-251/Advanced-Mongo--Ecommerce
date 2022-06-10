const app = require("./index.js");
const connect = require("./config/db");

app.listen(4080, async()=>{
    try {
        await connect();
        console.log("listening on port 4080");
    } catch (error) {
        console.log("error", error);
    }
    
});