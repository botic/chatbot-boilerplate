const log = require("ringo/logging").getLogger(module.id);
const config = require("../config");
const {FBMessenger, GraphApiError} = require("fbmessenger");

const bot = new FBMessenger(config.messenger.pageToken);

const onmessage = function(event) {
    const message = event.data;

    try {
        // we asume that the payload is a arbitrary string with JSON data
        // if postback or quick reply, parse the payload
        if (fbmUtils.isPostback(message) || fbmUtils.isQuickReply(message)) {
            try {
                let payload;

                if (fbmUtils.isPostback(message)) {
                    payload = JSON.parse(message.postback.payload);
                } else {
                    payload = JSON.parse(message.message.quick_reply.payload);
                }

                processPayload(message, payload);
            } catch (e) {
                log.error("[messenger] Invalid payload in postback!", e);
                return;
            }
        } else if (fbmUtils.isMessage(message)) {
            processMessage(message);
        }
    } catch(e) {
        if (e instanceof GraphApiError && e.response != null) {
            let error = e.response.error;
            if (error.code >= 200 && error.code < 300 && message.sender && message.sender.id) {
                // the user dropped the conversation,
                // the bot is no longer authorized to talk with the user

                /* drop user data connected with the unauthorized sender id */

            } else {
                log.error("Graph API Error:", JSON.stringify(error));
            }
        } else {
            log.error("Unknow error", e);
        }
    }
};

const processMessage = function(message) {
    bot.sendTextMessage(message.sender.id, "Hello back!");
};

const processPayload = function(message, payload) {
    bot.sendTextMessage(message.sender.id, "Hello back!");
};
