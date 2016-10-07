/**
 * @fileOverview The boilerplate uses a config module to enable hot code reloading.
 * Changes in the config will be immediately be visible for all other modules.
 */
module.exports = {
    "vhosts": ["127.0.0.1", "localhost", "my-public-endpoint.ngrok.io"],
    "server": {
        "http": {
            "host": "127.0.0.1",
            "port": 8080
        }
    },
    messenger: {
        // this needs to be the absolute path of the webhook
        callbackPath: "/messenger/supersecret-webhook-path",

        // Facebook-specific configuration options
        verifyToken: "webhook-verify-token",
        pageId: "insertPageId",
        pageToken: "insertToken",
        appSecret: "insert app secret"
    }
};
