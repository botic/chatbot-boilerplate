let {MemoryStream} = require("io");

const {Mac} = javax.crypto;
const {SecretKeySpec} = javax.crypto.spec;

exports.middleware = function hubverify(next, app) {
    const config = {
        "secret": "invalid",
        "algorithm": "HmacSHA1"
    };

    const encodeHexString = function(javaByteArray) {
        return ByteArray.wrap(javaByteArray).reduce(function(prev, byteValue) {
            return prev + ("0" + (byteValue & 0xFF).toString(16)).slice(-2);
        }, "");
    };

    app.xhub = function(secret, algorithm) {
        if (secret == null) {
            throw new Error("Invalid xhub config: secret is required!");
        }

        config.secret = secret;
        config.algorithm = algorithm || config.algorithm;
    };

    return function (req) {
        const input = req.input.read();

        const mac = Mac.getInstance("HmacSHA1");
        const secret = new SecretKeySpec(new java.lang.String(config.secret).getBytes("UTF-8"), config.algorithm);
        mac.init(secret);
        const digest = mac.doFinal((new java.lang.String(input)).getBytes());
        const hmac = "sha1=" + encodeHexString(digest);

        req.isXHubValid = (hmac === req.headers["x-hub-signature"]);
        req.input = new Stream(new java.io.ByteArrayInputStream(input.toByteArray()));

        return next(req);
    };
};
