const config = require("../config");
const log = require("ringo/logging").getLogger(module.id);

const {Worker} = require("ringo/worker");
const response = require("ringo/jsgi/response");

const fbmUtils = require("fbmessenger/utils");
const {Application} = require("stick");

const app = exports.app = new Application();
app.configure(require("./xhub"), "params", "route");

app.xhub(config.messenger.appSecret);

app.get("/", function (req) {
    return response.text(Date.now());
});

app.get(config.messenger.callbackPath, function(req) {
    if (req.params["hub.verify_token"] === config.messenger.verifyToken) {
        log.info("Successful challenge!");
        return response.text(req.params["hub.challenge"]);
    }

    log.error("Failed validation. Make sure the validation tokens match.");
    return response.setStatus(403).text("Failed validation. Make sure the validation tokens match.");
});

app.post(config.messenger.callbackPath, function(req) {
    if (!req.isXHubValid) {
        return response.bad().json({
            "status": 400,
            "error": "Invalid signature."
        });
    }

    if (req.postParams !== null && fbmUtils.isMessagingCallback(req.postParams)) {
        try {
            const messaging = fbmUtils.getMessagingForPage(req.postParams, config.messenger.pageId);

            // worker = async processors of work; Ringo's workers are JVM threads
            const botWorker = new Worker(module.resolve("./messenger-bot"));
            botWorker.onerror = function(event) {
                log.error("Worker error: ", event.data);
            };

            messaging.forEach(function(message) {
                // this hands over the message to the async worker thread
                botWorker.postMessage(message);
            });

        } catch (e) {
            log.error("Processing error!", e);
        }
    } else {
        log.error("Invalid request", req.toSource());
    }

    return response.json({
        "timestamp": Date.now()
    }).ok();
});
