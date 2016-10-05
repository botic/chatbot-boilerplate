const config = require("./config");

const logging = require("ringo/logging");
logging.setConfig(getResource(module.resolve("./config/log4j.properties")));
const log = logging.getLogger(module.id);

// the HTTP server itself
const httpServer = require("httpserver");
var server = null;

const stop = exports.stop = function() {
    if (server !== null) {
        server.stop();
    }
};

const start = exports.start = function() {
    log.info("Starting http server and serving application ...");
    // configure the server
    server = httpServer.build()
    // serve applications
        .serveApplication("/", module.resolve("./app/routes"), {
            "virtualHosts": config.vhosts
        })
        .http({
            "host": config.server.http.host,
            "port": config.server.http.port
        });

    if (config.server.https) {
        server.https({
            "host": config.server.https.host,
            "port": config.server.https.port,
            "keyStore": config.server.https.keyStore,
            "keyStorePassword": config.server.https.keyStorePassword,
            "keyManagerPassword": config.server.https.keyManagerPassword,
            "includeCipherSuites": config.server.https.includeCipherSuites
        })
    }

    server.start();

    /*
    // initialize Facebook bot texts
    log.info("Setting thread get started button and greeting text ...");

    const fbmbot = new FBMessenger(config.messenger.pageToken);
    fbmbot.setThreadGetStartedButton(JSON.stringify({ event: "user_started" }));
    fbmbot.setThreadGreetingText("Hello World!");
    fbmbot.setPersistentMenu([
        {
            "type": "postback",
            "title": "One",
            "payload": JSON.stringify({event: 'button_one' })
        },
        {
            "type": "postback",
            "title": "Two",
            "payload": JSON.stringify({event: 'button_two' })
        },
        {
            "type": "postback",
            "title": "Three",
            "payload": JSON.stringify({event: 'button_three' })
        }
    ]);*/
};

if (require.main === module) {
    start();
}
