const AuthKeys = require('./AuthKeys.js')
let RainbowSDK = require('rainbow-node-sdk');

const optionsSDK = {
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

let rainbowSDK = new RainbowSDK(optionsSDK);

rainbowSDK.start();

// APP STARTS HERE

rainbowSDK.events.on('rainbow_onready', function() {
    console.log('[HHCAMP] RAINBOW READY!')
})

rainbowSDK.events.on('rainbow_onerror', function() {
    console.log('[HHCAMP] ERROR CONNECTING TO RAINBOW! :(')
})

// CHAT MESSAGE EVENT LISTENER

rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
    // Check if the message comes from a user
    if(message.type === "chat") {
        console.log('[HHCAMP] NEW MESSAGE RECEIVED! CONTENT: ', message.content)
        manageMessage(message);
    }
});

// MESSAGE STRINGS

const helloResponse = `Hello, which service would you like to use? \n
                       1. Dentist \n
                       2. Surgeon \n
                       3. Radiology 
                       `
// OPTIONS ARRAYS

let options = []; 
const optionsService = ['Dentist', 'Surgeon', 'Radiology'];
const optionsDate = ['29/03/2019', '01/04/2019', '04/04/2019'];



//MESSAGE RESPONDER


function manageMessage(message) {
    if(message.content === "hello" || message.content === "Hello") {
        rainbowSDK.im.sendMessageToJid(helloResponse, message.fromJid);
        options = optionsService;
    } else if (message.content === '1' || message.content === '2' || message.content === '3'){
        console.log('[HHCAMP] OPTIONS:', options)
        if (compareArrays(options, optionsService)) {
                console.log('[HHCAMP] SENDING OPTIONS')
                rainbowSDK.im.sendMessageToJid('You have chosen ' + options[message.content-1] + '\n Which of the following dates suits you? \n 1. 29/03/2019 \n 2. 01/04/2019 \n 3. 04/04/2019', message.fromJid);
        }


        //TODO - add other options
    }
}





// SERVICE FUNCTIONS

function compareArrays (arr1, arr2) {
    if (!arr1 || !arr2) {
        return false;
    }

    for (let i=0; i<arr1.length; i++){
        if(arr1[i] !== arr2[i]) {
            return false;
        }
    }
    console.log('[HHCAMP] THE ARRAYS ARE THE SAME!')

    return true;
}
