const AuthKeys = require('./AuthKeys.js')
let RainbowSDK = require('rainbow-node-sdk');

const options = {
    rainbow: {
        host: 'sandbox'
    },
    credentials: {
        login: AuthKeys.login,
        password: AuthKeys.password
    },
    application: {
        appID: AuthKeys.appID,
        appSecret: AuthKeys.appSecret
    },
    logs: {
        enableConsoleLogs: true,
        enableFileLogs: false,
        file: {
            path: "var/tmp/rainbowsdk/",
            level: 'debug'
        }
    },
    im: {
        sendReadReceipt: true
    }


}

let rainbowSDK = new RainbowSDK(options);

rainbowSDK.start();
