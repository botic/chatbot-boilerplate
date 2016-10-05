const log = require("ringo/logging").getLogger(module.id);

const {Application} = require("stick");
const app = exports.app = new Application();
app.configure("mount", "route");

app.mount("/telegram", require("./bot-telegram"));

app.get("/", function(req) {
    return response.text("Hello World!");
});
