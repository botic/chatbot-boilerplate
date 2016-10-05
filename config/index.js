module.exports = {
    "vhosts": ["127.0.0.1", "localhost", "my-public-endpoint.ngrok.io"],
    "server": {
        "http": {
            "host": "127.0.0.1",
            "port": 8080
        }
    },
    messenger: {
        callbackPath: "/messenger/supersecret-webhook-path", // this needs to be the absolute path of the webhook
        verifyToken: "webhook-verify-token",
        pageId: "insertPageId",
        pageToken: "insertToken",
        appSecret: "insert app secret"
    }
};
