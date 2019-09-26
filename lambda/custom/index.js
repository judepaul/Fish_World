/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const launch_data = require('./data/launch_data.json');

const SKILL_NAME = "fish world";

//const WELCOME_MESSAGE_FIRST = "Welcome to Fish World! You can ask for help at any time to learn more about this skill.";
// commented by Jude on 07/22/2019 - Updated text for Fish Feeding schedule
//const WELCOME_MESSAGE_NEW_USER = "Welcome to Fish World! I love to take care of fishes. I\'ll help you to track your fish feeding schedule. You can say the word help at anytime for more information about this skill. ";
// Added by Jude on 07/22/2019 - Response message with Fish Feeding schedule
const WELCOME_MESSAGE_NEW_USER = ' Welcome to Fish World <break time="300ms"/> I help you take care of fishes <break time="300ms"/>  Let\’s setup your feeding schedule <break time="300ms"/> Typically <break time="100ms"/> owners feed their fish <break time="100ms"/> either <break time="100ms"/> once a day <break time="100ms"/> or <break time="100ms"/> every two days <break time="100ms"/> and so on <break time="300ms"/>  You can say <break time="100ms"/> any number between <break time="100ms"/> one <break time="100ms"/> to <break time="50ms"/> ten <break time="100ms"/> to setup the fish feed frequency <break time="300ms"/> So how often do you want to feed';
//const WELCOME_MESSAGE_EXISTING_USER_CONTINUE = '<break time="300ms"/> By the way, <break time="300ms"/> I will help you to schedule <break time="100ms"/> your tank cleaning process <break time="100ms"/> which makes the fishes healthy <break time="300ms"/> You can name your tank to setup now';
const WELCOME_MESSAGE_EXISTING_USER_CONTINUE = '';


// const WELCOME_MESSAGE_EXISTING_USER = "Welcome to Fish World! <break time='500ms'/> You can ask for help at any time to learn more about this skill. <break time='500ms'/>";
const WELCOME_MESSAGE_EXISTING_USER = "Welcome to Fish World! <break time='500ms'/>";

const INTERVAL_IN_SECONDS = "Fishes were fed just a few seconds ago.";

// commented and added new constant - by Jude on 07/22/2019 - Updated text corresponds to fish feeding schedule

// const INTERVAL_IN_1_MIN_10MINS = "Fishes were fed just a few minutes ago. <break time='300ms'/> I don\'t think they will be hungry so soon.<break time='300ms'/> Come back in a day to feed them.";
// const INTERVAL_IN_10_MINS_30MINS = "Fishes were fed less than half an-hour ago. <break time='300ms'/> Probably they wouldn\'t be hungry so soon. Come back in a day to feed them.";
// const INTERVAL_IN_30_MINS_60MINS = "Fishes were fed less than an hour ago. <break time='300ms'/> Probably they wouldn\'t be hungry so soon. Come back in a day to feed them.";

// const INTERVAL_IN_1HOUR_4HOURS = "Fishes were fed just a few hours ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet. Come back in a day to feed them.";
// const INTERVAL_IN_4HOURS_6HOURS = "Fishes were fed less than 6 hrs ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet. Please come back later to to feed them.";
// const INTERVAL_IN_6HOURS_10HOURS = "Fishes were fed less than 10 hrs ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet. Please come back later to to feed them.";
// const INTERVAL_IN_10HOURS_15HOURS = "Fishes were fed about 15 hrs ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet. Please come back later to feed them.";
// const INTERVAL_IN_15HOURS_20HOURS = "Fishes were fed about 20 hrs ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet. Please come back later to feed them.";
// const INTERVAL_IN_20HOURS_24HOURS = "Fishes were fed about a day ago. <break time='300ms'/> Would you like to feed the fishes now?";

// const INTERVAL_IN_1DAY_2DAYS = "Fishes were fed more than a day ago. If you feed them once a day, then it\'s time to feed again. <break time='300ms'/> Would you like to feed the fishes?";
// const INTERVAL_IN_2DAYS_AGO = "Fishes were fed more than 2 days ago. They must be very hungry. If you feed them once a day, then it\'s time to feed again. <break time='300ms'/> Would you like to feed the fishes?";

const INTERVAL_IN_1_MIN_10MINS = "Fishes were fed just a few minutes ago. <break time='300ms'/> I don\'t think they will be hungry so soon";
const INTERVAL_IN_10_MINS_30MINS = "Fishes were fed less than half an-hour ago. <break time='300ms'/> Probably they wouldn\'t be hungry so soon";
const INTERVAL_IN_30_MINS_60MINS = "Fishes were fed less than an hour ago. <break time='300ms'/> Probably they wouldn\'t be hungry so soon";

const INTERVAL_IN_1HOUR_6HOURS = "Fishes were fed just a few hours ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet";
const INTERVAL_IN_6HOURS_12HOURS = "Fishes were fed less than 12 hrs ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet";
const INTERVAL_IN_12HOURS_24HOURS = "Fishes were fed less than a day ago. <break time='300ms'/> Probably they wouldn\'t be hungry yet";

const INTERVAL_IN_1DAY_2DAYS = 'Fishes were fed <break time="100ms"/> more than a day ago';
const INTERVAL_IN_1DAY_2DAYS_FEED_INTERVAL_1 = '<break time="100ms"/> it\'s time to feed them';

const INTERVAL_IN_2DAYS_AGO = 'Fishes were fed <break time="100ms"/> more than 2 days ago';
const INTERVAL_IN_2DAYS_FEED_INTERVAL_2 = '<break time="100ms"/> it\'s time to feed them';

const EARLIER_SCHEDULED_FEEDING_MESSAGE = '<break time="300ms"/> If you want to feed your fishes <break time="100ms"/> earlier than scheduled <break time="100ms"/> you can feed them now <break time="100ms"/>';
const LATER_SCHEDULED_FEEDING_MESSAGE = '<break time="300ms"/> They must be very hungry <break time="100ms"/> it\'s time to feed again <break time="100ms"/>';

const FEED_SCHEDULE_MESSAGE = 'Great <break time="300ms"/> your fish feed cycle is setup with <break time="100ms"/> once every <break time="100ms"/> ';


const HELP_MESSAGE = "You can ask me When did I fed the fishes. and I\’ll let you know if it\’s time to feed the fishes yet. You can also tell me that  you have fed the fishes by saying I\’ve fed the fishes and I\’ll note that down in my memory. ";

const YES_MESSAGE = "Great! I\’ll remember that you have fed the fishes. If you forget you can ask me anytime and I\’ll remind you when you last fed the fishes. Hope to hear from you soon. Bye!";
const NO_MESSAGE = "That\’s alright. Hope to hear from you soon. Bye!";

const FALLBACK_MESSAGE = "I\'m sorry I do not understand what you said. here are few things for you can do. You can ask me When did I fed the fishes or should I feed the fish/fishes";

// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

function getMemoryAttributes() {
    const memoryAttributes = {
        "history": [],

        // The remaining attributes will be useful after DynamoDB persistence is configured
        "launchCount": 0,
        "lastUseTimestamp": 0,

        "lastSpeechOutput": {},
        "nextIntent": []

        // "favoriteColor":"",
        // "name":"",
        // "namePronounce":"",
        // "email":"",
        // "mobileNumber":"",
        // "city":"",
        // "state":"",
        // "postcode":"",
        // "birthday":"",
        // "bookmark":0,
        // "wishlist":[],
    };
    return memoryAttributes;
};

const maxHistorySize = 20; // remember only latest 20 intents 



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        // return request.type === 'LaunchRequest';
        return handlerInput.requestEnvelope.session.new || handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //let say = 'hello' + ' and welcome to ' + SKILL_NAME + ' ! would you like to start caring your fish? say yes or no';
        let skillTitle = capitalize(SKILL_NAME);

        const attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.keys(attributes).length === 0) {
            attributes.skillAccessCount = 0;
            attributes.feed_date = "";
        }
        attributesManager.setSessionAttributes(attributes);

        // Get Values from DB
        const skillAccessCount = attributes.skillAccessCount;
        let feedScheduleInterval = typeof (attributes.feedInterval) == "undefined" || !attributes.feedInterval ? 0 : attributes.feedInterval;
        console.log("skillAccessCount ==> " + skillAccessCount);
        console.log("feedScheduleInterval ==> " + feedScheduleInterval);
        let feedInterval = '';
        let feedIntervalDisplayMsg = '';
        let fedCount = typeof (sessionAttributes.fedCount) == "undefined" || !sessionAttributes.fedCount ? 0 : sessionAttributes.fedCount
        let displayFeedScheduleInterval = "";
        let nextFeedDateTime = '';
        let say = '';
        let shouldEndSession = true;
        if (typeof (skillAccessCount) == 'undefined' || parseInt(skillAccessCount) == 0) {
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            say += '<prosody volume="loud" rate="medium" pitch="medium">' + WELCOME_MESSAGE_NEW_USER
                + '</prosody>';
            sessionAttributes['lastSpeech'] = say;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            shouldEndSession = false;
        } else if (typeof (skillAccessCount) !== 'undefined' && parseInt(skillAccessCount) != 0 && attributes.feed_date == '') {
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            say += '<prosody volume="loud" rate="medium" pitch="medium">' + WELCOME_MESSAGE_NEW_USER
            sessionAttributes['lastSpeech'] = say;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            shouldEndSession = false;
        } else {
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            let last_fed_date = sessionAttributes.feed_date;
            let feed_info_in_hours = "";
            console.log("last_fed_date -- " + last_fed_date);
            //Check last_fed_date is NULL or Empty. last_fed_date is NULL until the user feed the fishes
            // Check last_fed_date is NULL or Empty starts here
            if (typeof (last_fed_date) !== "undefined" && last_fed_date) {
                console.log("In last_fed_date IF block");
                last_fed_date = new Date(last_fed_date.toString());
                let curr_date = new Date().toISOString();
                feed_info_in_hours = mydiff(last_fed_date, curr_date);
                let dateTime = formatDate(last_fed_date.toString()) + ' ' + getTimePeriod(last_fed_date.toString());
                let hrs = formatAMPM(last_fed_date.toString());
                //let feedInterval = timeSince(last_fed_date);
                feedInterval = getNiceTime(last_fed_date, new Date(), 1, 'ago');
                console.log("feedInterval ==> " + feedInterval);
                let timeInterval = getTimeInterval(feedInterval);
                // say += 'Welcome back. You have fed the fish on ' + dateTime +' Would you like to feed the fishes now? You can say Yes or No.';
                say += '<prosody volume="loud" rate="medium" pitch="medium">' + WELCOME_MESSAGE_EXISTING_USER
                    + ' Glad to have you back. <break time="500ms"/>';
                console.log("timeInterval[1] ==> " + timeInterval[1]);
                console.log("timeInterval ==> " + timeInterval[1]);
                if (timeInterval.length > 0 && timeInterval[1] == 'seconds') {
                    say += '<break time="500ms"/>' + INTERVAL_IN_SECONDS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + '</prosody>';
                } else if (timeInterval.length > 0 && timeInterval[1] == 'minutes') {
                    if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) <= 10) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_1_MIN_10MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 10 && parseInt(timeInterval[0]) <= 30) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_10_MINS_30MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 30 && parseInt(timeInterval[0]) <= 60) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_30_MINS_60MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    }
                } else if (timeInterval.length > 0 && (timeInterval[1] == 'hour' || timeInterval[1] == 'hours')) {
                    if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) <= 6) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_1HOUR_6HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 6 && parseInt(timeInterval[0]) <= 12) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_6HOURS_12HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 12 && parseInt(timeInterval[0]) <= 24) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_12HOURS_24HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                        shouldEndSession = false;
                    } else {
                        say += ' <break time="500ms"/> </prosody>';
                    }
                } else if (timeInterval.length > 0 && (timeInterval[1] == 'day' || timeInterval[1] == 'days')) {
                    console.log("feedScheduleInterval ==> "+feedScheduleInterval);
                    console.log("parseInt(feedInterval) ==> "+parseInt(feedInterval));
                    if (feedScheduleInterval == parseInt(feedInterval)) {
                        feedIntervalDisplayMsg = feedInterval +' [ It is time to feed your fishes ]';
                        if (feedScheduleInterval == 1) {
                            say += '<break time="500ms"/>' + INTERVAL_IN_1DAY_2DAYS + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody>';
                        } else {
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> ' + feedInterval + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody>';
                        }
                    } else if (feedScheduleInterval > parseInt(feedInterval)) {
                        feedIntervalDisplayMsg = feedInterval + ' [ It is not yet time to feed ]';

                        if (feedScheduleInterval == 1) {
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + EARLIER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody> ';
                        }else{
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + EARLIER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody> ';
                        }
                    } else if (feedScheduleInterval < parseInt(feedInterval)) {
                        feedIntervalDisplayMsg = feedInterval +' [ It is time to feed your fishes ]';
                        if (feedScheduleInterval == 1) {
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + LATER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody> ';
                        }else{
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + LATER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody> ';
                        }
                    } else {
                        say += ' <break time="500ms"/> </prosody>';
                    }
                    shouldEndSession = false;
                } else if (timeInterval.length > 0 && (timeInterval[1] == 'month' || timeInterval[1] == 'month')) {
                    console.log("feedScheduleInterval ==> "+feedScheduleInterval);
                    console.log("parseInt(feedInterval) ==> "+parseInt(feedInterval));
                    feedIntervalDisplayMsg = feedInterval +' [ It is time to feed your fishes ]';
                    if (feedScheduleInterval == 1) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_1DAY_2DAYS + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody>';
                    } else {
                        say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> ' + feedInterval + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + ' <break time="300ms"/>' + '. Would you like to feed the fishes now </prosody>';
                    }
                    shouldEndSession = false;
                } else {
                    say += ' <break time="500ms"/> </prosody>';
                }
                // Check last_fed_date is NULL or Empty else
            } else {
                console.log("In last_fed_date else block");
                say += '<prosody volume="loud" rate="medium" pitch="medium">' + WELCOME_MESSAGE_NEW_USER + '</prosody>';
                sessionAttributes['lastSpeech'] = say;
                handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
                shouldEndSession = false;
            }
            // Check last_fed_date is NULL or Empty ends here
        }
        //say += 'Would you like to feed the fishes now? You can say Yes or No.';
        // skillAccessCount += skillAccessCount + 1;
        // const persistentAttributes = {skillAccessCount: skillAccessCount};
        // handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
        // await attributesManager.savePersistentAttributes();
        feedScheduleInterval = 2;
        displayFeedScheduleInterval = (feedScheduleInterval == 1) ? "once every day" : "every "+ feedScheduleInterval + " days"
        console.log("displayFeedScheduleInterval ==> " + displayFeedScheduleInterval);
        console.log("feedIntervalDisplayMsg ==> " +feedIntervalDisplayMsg);
        if (supportsAPL(handlerInput)) {
            return responseBuilder
            .speak(say)
            .withShouldEndSession(shouldEndSession)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: require('./launch.json'),
                datasources: {
                    "fishData": {
                        "timeInterval": displayFeedScheduleInterval, "lastFedInfo": feedIntervalDisplayMsg, "displayText": say, "hintText": "Try, \"Alexa, Launch/Open Fish World\""
                    }
                }
            })
            .withShouldEndSession(false)
            .getResponse();
        }else{
            return responseBuilder
            .speak(say)
            //.reprompt('<prosody volume="loud" rate="medium" pitch="medium"> Say yes to save your feed or no to quit. </prosody>')
            .withStandardCard('Fish World',
                'Simple tracking of feed date & time for your fishes.', '',
                welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .withShouldEndSession(shouldEndSession)
            .getResponse();
        }
    },
};


const FeedingScheduleIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'FeedingScheduleIntent';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent;
        if (request.dialogState && request.dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        let slotValues = getSlotValues(request.intent.slots);
        console.log(slotValues.feedInterval);
        let say = '';
        let feedInterval = slotValues.feedInterval.resolved;
        let slotValueMatches = slotValues.feedInterval.ERstatus;
        // let chkSlotValueWithDays = '';
        // chkSlotValueWithDays = feedInterval.search('day');
        console.log("feedInterval =>" + feedInterval);
        console.log("isFeedFrequencyInternalExist =>" + isFeedFrequencyInternalExist(feedInterval));
        let feedingScheduleDate = getDateTimeBySlotValues(feedInterval);
        console.log("feedingScheduleDate ==> " + feedingScheduleDate);
        console.log("slotValueMatches ==> " + slotValueMatches);
        if (slotValueMatches == "ER_SUCCESS_MATCH") {
            console.log("!!!!!@@@@@@@ => " + handlerInput.requestEnvelope.request.intent.slots.feedInterval.value);
            console.log("$$$$$$$$$$$$ => " + handlerInput.requestEnvelope.request.intent.slots.feedInterval.confirmationStatus);
            if (feedInterval == 1) {
                //say = '<prosody volume="loud" rate="medium" pitch="medium"> Great, you are almost setup now <break time="200ms"/> Going forward <break time="100ms"/> I\'ll notify you on every' + feedInterval + 'day <break time="100ms"/> Would you like to feed the fishes now? </prosody>';
                say = '<prosody volume="loud" rate="medium" pitch="medium">' + FEED_SCHEDULE_MESSAGE + feedInterval + 'day <break time="100ms"/> Would you like to feed the fishes now </prosody>';
            } else {
                //say = '<prosody volume="loud" rate="medium" pitch="medium"> Great, you are almost setup now <break time="200ms"/> Going forward <break time="100ms"/> I\'ll notify you on every' + feedInterval + 'days <break time="100ms"/> Would you like to feed the fishes now? </prosody>';
                say = '<prosody volume="loud" rate="medium" pitch="medium">' + FEED_SCHEDULE_MESSAGE + feedInterval + 'days <break time="100ms"/> Would you like to feed the fishes now </prosody>';
            }
        } else {
            say = '<prosody volume="loud" rate="medium" pitch="medium"> I\'m sorry <break time="100ms"/> Sorry I’m having difficulty understanding.Typically owners feed their fish either once a day or every two days and so on. You can say any number between one to ten to setup your fish feed frequency </prosody>';
        }
        let attributes = { feedInterval: feedInterval, feedingScheduleDate: feedingScheduleDate, lastSpeech: say };
        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    },
};


const getLastFeedInfoHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'getLastFeedInfo';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.keys(attributes).length === 0) {
            attributes.skillAccessCount = 0;
            attributes.feed_date = "";
        }
        attributesManager.setSessionAttributes(attributes);

        // Get Values from DB
        const skillAccessCount = attributes.skillAccessCount;
        let feedScheduleInterval = typeof (attributes.feedInterval) == "undefined" || !attributes.feedInterval ? 0 : attributes.feedInterval;
        console.log("skillAccessCount ==> " + skillAccessCount);
        console.log("feedScheduleInterval ==> " + feedScheduleInterval);

        let fedCount = typeof (sessionAttributes.fedCount) == "undefined" || !sessionAttributes.fedCount ? 0 : sessionAttributes.fedCount

        let say = '<prosody> ';
        let shouldEndSession = true;

            let last_fed_date = sessionAttributes.feed_date;
            let feed_info_in_hours = "";
            console.log("last_fed_date -- " + last_fed_date);
            //Check last_fed_date is NULL or Empty. last_fed_date is NULL until the user feed the fishes
            // Check last_fed_date is NULL or Empty starts here
            if (typeof (last_fed_date) !== "undefined" && last_fed_date) {
                console.log("In last_fed_date IF block");
                last_fed_date = new Date(last_fed_date.toString());
                let curr_date = new Date().toISOString();
                feed_info_in_hours = mydiff(last_fed_date, curr_date);
                let dateTime = formatDate(last_fed_date.toString()) + ' ' + getTimePeriod(last_fed_date.toString());
                let hrs = formatAMPM(last_fed_date.toString());
                //let feedInterval = timeSince(last_fed_date);
                let feedInterval = getNiceTime(last_fed_date, new Date(), 1, 'ago');
                console.log("feedInterval ==> " + feedInterval);
                let timeInterval = getTimeInterval(feedInterval);
                // say += 'Welcome back. You have fed the fish on ' + dateTime +' Would you like to feed the fishes now? You can say Yes or No.';
                // say += '<prosody volume="loud" rate="medium" pitch="medium">' + WELCOME_MESSAGE_EXISTING_USER
                //     + ' Glad to have you back. <break time="500ms"/>';
                console.log("timeInterval[1] ==> " + timeInterval[1]);
                console.log("timeInterval ==> " + timeInterval[1]);
                if (timeInterval.length > 0 && timeInterval[1] == 'seconds') {
                    say += '<break time="500ms"/>' + INTERVAL_IN_SECONDS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + '</prosody>';
                } else if (timeInterval.length > 0 && timeInterval[1] == 'minutes') {
                    if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) <= 10) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_1_MIN_10MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 10 && parseInt(timeInterval[0]) <= 30) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_10_MINS_30MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 30 && parseInt(timeInterval[0]) <= 60) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_30_MINS_60MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    }
                } else if (timeInterval.length > 0 && (timeInterval[1] == 'hour' || timeInterval[1] == 'hours')) {
                    if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) <= 6) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_1HOUR_6HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 6 && parseInt(timeInterval[0]) <= 12) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_6HOURS_12HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                    } else if (parseInt(timeInterval[0]) >= 12 && parseInt(timeInterval[0]) <= 24) {
                        say += '<break time="500ms"/>' + INTERVAL_IN_12HOURS_24HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
                        shouldEndSession = false;
                    } else {
                        say += ' <break time="500ms"/> </prosody>';
                    }
                } else if (timeInterval.length > 0 && (timeInterval[1] == 'day' || timeInterval[1] == 'days')) {
                    console.log("feedScheduleInterval ==> "+feedScheduleInterval);
                    console.log("parseInt(feedInterval) ==> "+parseInt(feedInterval));
                    if (feedScheduleInterval == parseInt(feedInterval)) {
                        if (feedScheduleInterval == 1) {
                            say += '<break time="500ms"/>' + INTERVAL_IN_1DAY_2DAYS + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody>';
                        } else {
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> ' + feedInterval + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody>';
                        }
                    } else if (feedScheduleInterval > parseInt(feedInterval)) {
                        if (feedScheduleInterval == 1) {
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + EARLIER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody> ';
                        }else{
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + EARLIER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody> ';
                        }
                    } else if (feedScheduleInterval < parseInt(feedInterval)) {
                        if (feedScheduleInterval == 1) {
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes <break time="100ms"/> once every day' + ' <break time="300ms"/>' + LATER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody> ';
                        }else{
                            say += '<break time="500ms"/> Fishes were fed <break time="100ms"/> more than ' + parseInt(timeInterval[0]) + ' days ago <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on every <break time="100ms"/> ' + feedScheduleInterval + 'days' + LATER_SCHEDULED_FEEDING_MESSAGE + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody> ';
                        }
                    } else {
                        say += ' <break time="500ms"/> </prosody>';
                    }
                    shouldEndSession = false;
                } else {
                    say += ' <break time="500ms"/> </prosody>';
                }
                // Check last_fed_date is NULL or Empty else
            } 
            // Check last_fed_date is NULL or Empty ends here
        return responseBuilder
            .speak(say)
            .withShouldEndSession(shouldEndSession)
            //.reprompt('try again, ' + say)
            .getResponse();

    },
};


// const getLastFeedInfoHandler = {
//     canHandle(handlerInput) {
//         const request = handlerInput.requestEnvelope.request;
//         return request.type === 'IntentRequest' && request.intent.name === 'getLastFeedInfo';
//     },
//     async handle(handlerInput) {
//         const attributesManager = handlerInput.attributesManager;
//         const request = handlerInput.requestEnvelope.request;
//         const responseBuilder = handlerInput.responseBuilder;
//         const attributes = await attributesManager.getPersistentAttributes() || {};
//         if (Object.keys(attributes).length === 0) {
//             attributes.skillAccessCount = 0;
//         }
//         attributesManager.setSessionAttributes(attributes);

//         let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
//         let last_fed_date = sessionAttributes.feed_date;
//         last_fed_date = new Date(last_fed_date.toString());
//         let say = "";
//         let shouldEndSession = true;
//         //let feedInterval = timeSince(last_fed_date);
//         let feedInterval = getNiceTime(last_fed_date, new Date(), 1, 'ago');
//         console.log("feedInterval ==> "+feedInterval);
//         let timeInterval = getTimeInterval(feedInterval);
//         console.log("timeInterval[1] ==> "+timeInterval[1]);
//         console.log("timeInterval ==> "+timeInterval[1]);
//         let feedScheduleInterval = typeof(attributes.feedInterval) == "undefined" || !attributes.feedInterval ? 0 : attributes.feedInterval;
//         if (timeInterval.length > 0 && timeInterval[1] == 'seconds') {
//             say += '<break time="500ms"/>' + INTERVAL_IN_SECONDS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + '</prosody>';
//         } else if (timeInterval.length > 0 && timeInterval[1] == 'minutes') {
//             if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) <= 10) {
//                 say += '<break time="500ms"/>' + INTERVAL_IN_1_MIN_10MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
//             } else if (parseInt(timeInterval[0]) >= 10 && parseInt(timeInterval[0]) <= 30) {
//                 say += '<break time="500ms"/>' + INTERVAL_IN_10_MINS_30MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
//             } else if (parseInt(timeInterval[0]) >= 30 && parseInt(timeInterval[0]) <= 60) {
//                 say += '<break time="500ms"/>' + INTERVAL_IN_30_MINS_60MINS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
//             }
//         } else if (timeInterval.length > 0 && (timeInterval[1] == 'hour' || timeInterval[1] == 'hours')) {
//             if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) <= 6) {
//                 say += '<break time="500ms"/>' + INTERVAL_IN_1HOUR_6HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
//             } else if (parseInt(timeInterval[0]) >= 6 && parseInt(timeInterval[0]) <= 12) {
//                 say += '<break time="500ms"/>' + INTERVAL_IN_6HOURS_12HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
//             } else if (parseInt(timeInterval[0]) >= 12 && parseInt(timeInterval[0]) <= 24) {
//                 say += '<break time="500ms"/>' + INTERVAL_IN_12HOURS_24HOURS + ' <break time="300ms"/>' + WELCOME_MESSAGE_EXISTING_USER_CONTINUE + ' </prosody>';
//                 shouldEndSession = false;
//             } else {
//                 say += ' <break time="500ms"/> </prosody>';
//             }
//         } else if (timeInterval.length > 0 && (timeInterval[1] == 'day' || timeInterval[1] == 'days')) {
//             if (parseInt(timeInterval[0]) >= 1 && parseInt(timeInterval[0]) < 2) {
//                 if(feedInterval == 1){
//                     say += '<break time="500ms"/>' + INTERVAL_IN_1DAY_2DAYS + ' <break time="300ms"/>' + INTERVAL_IN_1DAY_2DAYS_FEED_INTERVAL_1  + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody>';
//                 }else{
//                     say += '<break time="500ms"/>' + INTERVAL_IN_1DAY_2DAYS + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on <break time="100ms"/> ' + feedScheduleInterval + 'days' + EARLIER_SCHEDULED_FEEDING_MESSAGE  + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody>';
//                 }
//                 shouldEndSession = false;
//             } else if (parseInt(timeInterval[0]) >= 2) {
//                 if(feedInterval == 2){
//                     say += '<break time="500ms"/>' + INTERVAL_IN_2DAYS_AGO + ' <break time="300ms"/>' + INTERVAL_IN_2DAYS_FEED_INTERVAL_2  + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody>';
//                 }else{
//                     say += '<break time="500ms"/>' + INTERVAL_IN_2DAYS_AGO + ' <break time="300ms"/>' + 'you have chosen <break time="100ms"/> to feed the fishes on <break time="100ms"/> ' + feedScheduleInterval + 'days' + EARLIER_SCHEDULED_FEEDING_MESSAGE  + ' <break time="300ms"/>' + ' Would you like to feed the fishes now </prosody>';
//                 }
//                     shouldEndSession = false;
//             } else {
//                 say += ' <break time="500ms"/> </prosody>';
//             }
//         } else {
//             say += ' <break time="500ms"/> </prosody>';
//         }
//         sessionAttributes['lastSpeech'] = say;
//         //const skillAccessCount = sessionAttributes.skillAccessCount += 1;
//         //const persistentAttributes = { skillAccessCount: skillAccessCount, lastSpeech: say };
//         //handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
//         //await attributesManager.savePersistentAttributes();

//         return responseBuilder
//             .speak(say)
//             .withShouldEndSession(shouldEndSession)
//             //.reprompt('try again, ' + say)
//             .getResponse();

//     },
// };


const InprogressFeedFrequencyIntentHandler = {
    // Occurs when the required slots are not filled
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'FeedingScheduleIntent'
            && handlerInput.requestEnvelope.request.dialogState != 'COMPLETED'
    },
    handle(handlerInput) {
        console.log("!!!!!!!!!!!!!");
        let slotValues = getSlotValues(request.intent.slots);

        return handlerInput.responseBuilder
            .speak("I can add some flavor to your coffee. Which would you like, caramel, hazelnut, or vanilla? You can also say no thanks.")
            .reprompt("What flavor would you like added to your coffee, caramel, hazelnut, or vanilla? You can also say no thanks.")
            .addDelegateDirective()
            .getResponse();
    }
};

const FeedFrequencyPromptIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "FeedingScheduleIntent"
            && handlerInput.requestEnvelope.request.intent.slots.drink.value
            && handlerInput.requestEnvelope.request.intent.slots.drink.value === "coffee"
            && handlerInput.requestEnvelope.request.intent.slots.coffeeRoast.value
            && !handlerInput.requestEnvelope.request.intent.slots.flavor.value;
    },
    handle(handlerInput) {
        console.log("FeedFrequencyPromptIntentHandler");
        return handlerInput.responseBuilder
            .getResponse();
    }
};


const FeedFrequencyConfirmSlotIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "FeedingScheduleIntent"
            && handlerInput.requestEnvelope.request.intent.slots.feedInterval.value
            && handlerInput.requestEnvelope.request.intent.slots.feedInterval.value != 0 &&
            handlerInput.requestEnvelope.request.intent.slots.feedInterval.value <= 10
            && handlerInput.requestEnvelope.request.intent.slots.feedInterval.confirmationStatus != "NONE";
    },
    handle(handlerInput) {
        console.log("@@@@@@@@@@@@@@@@");
        let slotValues = getSlotValues(request.intent.slots);
        const feedInterval = handlerInput.requestEnvelope.request.intent.slots.feedInterval.value;
        const speechText = `Adding ${feedInterval} will cost $0.50 extra. Would you like me to add it?`;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .addConfirmSlotDirective("feedInterval")
            .getResponse();
    }
};


const AMAZON_YesIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let userId = handlerInput.requestEnvelope.session.user.userId;
        let sessionId = handlerInput.requestEnvelope.session.sessionId;
        let applicationId = handlerInput.requestEnvelope.session.application.applicationId;
        let deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;

        let last_feed_date = null;
        let last_feed_count = null;
        let last_device_id = null;
        let last_session_id = null;
        let last_appln_id = null;
        let feedInterval = null;
        let feedingScheduleDate = null;

        if (typeof (sessionAttributes.feed_date) !== "undefined") {
            last_feed_date = sessionAttributes.feed_date
        }
        if (typeof (sessionAttributes.fedCount) !== "undefined") {
            last_feed_count = sessionAttributes.fedCount
        }
        if (typeof (sessionAttributes.application_id) !== "undefined") {
            last_appln_id = sessionAttributes.application_id
        }
        if (typeof (sessionAttributes.sessionId) !== "undefined") {
            last_session_id = sessionAttributes.sessionId
        }
        if (typeof (sessionAttributes.device_id) !== "undefined") {
            last_device_id = sessionAttributes.device_id
        }
        if (typeof (sessionAttributes.feedInterval) !== "undefined") {
            feedInterval = sessionAttributes.feedInterval
        }
        if (typeof (sessionAttributes.feedingScheduleDate) !== "undefined") {
            feedingScheduleDate = sessionAttributes.feedingScheduleDate
        }
        //const feed_date = new Date(Date.now()).toString();
        //const feed_date = new Date().toISOString();
        //const feed_date = new Date().toLocaleString();
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        const feed_date = localISOTime;
        let skillAccessCount = typeof sessionAttributes.skillAccessCount === "undefined" || !sessionAttributes.skillAccessCount ? 0 : sessionAttributes.skillAccessCount;
        let fedCount = typeof sessionAttributes.fedCount === "undefined" || !sessionAttributes.fedCount ? 0 : sessionAttributes.fedCount
        skillAccessCount = parseInt(skillAccessCount) + 1;
        fedCount = parseInt(fedCount) + 1;
        let say = '<prosody volume="loud" rate="medium" pitch="medium">' + YES_MESSAGE + '</prosody>';
        // const persistentAttributes = {feed_date: feed_date, skillAccessCount: skillAccessCount, fedCount: fedCount, lastSpeech: say };
        console.log("last_feed_date ==> " + last_feed_date);
        console.log("last_appln_id ==> " + last_appln_id);
        console.log("last_session_id ==> " + last_session_id);
        console.log("last_device_id ==> " + last_device_id);
        console.log("sessionId ==> " + sessionId);
        console.log("applicationId ==> " + applicationId);
        console.log("deviceId ==> " + deviceId);
        console.log("feed_date ==> " + feed_date);
        console.log("skillAccessCount ==> " + skillAccessCount);
        console.log("fedCount ==> " + fedCount);
        console.log("lastSpeech ==> " + say);
        console.log("feedInterval ==> " + feedInterval);
        console.log("feedingScheduleDate ==> " + feedingScheduleDate);
        const persistentAttributes = { last_feed_date: last_feed_date, last_appln_id: last_appln_id, last_session_id: last_session_id, last_device_id: last_device_id, session_id: sessionId, application_id: applicationId, device_id: deviceId, feed_date: feed_date, skillAccessCount: skillAccessCount, fedCount: fedCount, lastSpeech: say, feedInterval: feedInterval, feedingScheduleDate: feedingScheduleDate };
        handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        await attributesManager.savePersistentAttributes();

        // let previousIntent = getPreviousIntent(sessionAttributes);
        // if (previousIntent && !handlerInput.requestEnvelope.session.new) {
        // say += 'Your last intent was ' + previousIntent + '. ';
        // }

        return responseBuilder
            .speak(say)
            //.reprompt('try again, ' + say)
            .getResponse();

    },
};

const AMAZON_NoIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let skillAccessCount = typeof sessionAttributes.skillAccessCount === "undefined" || !sessionAttributes.skillAccessCount ? 0 : sessionAttributes.skillAccessCount;
        skillAccessCount = parseInt(skillAccessCount) + 1;
        attributesManager.setPersistentAttributes(sessionAttributes);
        let say = '<prosody volume="loud" rate="medium" pitch="medium">' + NO_MESSAGE + '</prosody>';
        sessionAttributes['lastSpeech'] = say;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        await attributesManager.savePersistentAttributes();

        // let previousIntent = getPreviousIntent(sessionAttributes);
        // if (previousIntent && !handlerInput.requestEnvelope.session.new) {
        // say += 'Your last intent was ' + previousIntent + '. ';
        // }

        return responseBuilder
            .speak(say)
            //.reprompt('try again, ' + say)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say open/launch fish world, I will tell you the last date and time you have fed them along with feed frequency!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const AMAZON_FallbackIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.FallbackIntent'
                // || request.intent.name === 'AMAZON.YesIntent' ||
                //request.intent.name === 'AMAZON.NoIntent'
            );
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();

        if (sessionAttributes.gameState &&
            sessionAttributes.gameState === 'STARTED') {
            // currently playing

            return handlerInput.responseBuilder
                .speak(FALLBACK_MESSAGE)
                //.reprompt(FALLBACK_REPROMPT_DURING_GAME)
                .getResponse();
        }

        // not playing
        return handlerInput.responseBuilder
            .speak(FALLBACK_MESSAGE)
            //.reprompt(FALLBACK_REPROMPT_OUTSIDE_GAME)
            .withShouldEndSession(false)
            .getResponse();
    },

};

const AMAZON_RepeatIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let previousSpeech = sessionAttributes.lastSpeech;

        return responseBuilder
            .speak('<prosody volume="loud" rate="medium" pitch="medium"> sure, I said, ' + previousSpeech + '</prosody>')
            .withShouldEndSession(false)
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};


// 3.  Helper Functions ===================================================================


// Check the device capability for APL
function supportsAPL(handlerInput) {
	const supportedInterfaces =
		handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
	const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
	return aplInterface != null && aplInterface != undefined;
}

function capitalize(myString) {

    return myString.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}


function randomElement(myArray) {
    return (myArray[Math.floor(Math.random() * myArray.length)]);
}

function stripSpeak(str) {
    return (str.replace('<speak>', '').replace('</speak>', ''));
}




function getSlotValues(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;

        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        ERstatus: 'ER_SUCCESS_MATCH'
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: '',
                        ERstatus: 'ER_SUCCESS_NO_MATCH'
                    };
                    break;
                default:
                    break;
            }
        } else {
            slotValues[name] = {
                heardAs: filledSlots[item].value,
                resolved: '',
                ERstatus: ''
            };
        }
    }, this);

    return slotValues;
}

function getExampleSlotValues(intentName, slotName) {

    let examples = [];
    let slotType = '';
    let slotValuesFull = [];

    let intents = model.interactionModel.languageModel.intents;
    for (let i = 0; i < intents.length; i++) {
        if (intents[i].name == intentName) {
            let slots = intents[i].slots;
            for (let j = 0; j < slots.length; j++) {
                if (slots[j].name === slotName) {
                    slotType = slots[j].type;

                }
            }
        }

    }
    let types = model.interactionModel.languageModel.types;
    for (let i = 0; i < types.length; i++) {
        if (types[i].name === slotType) {
            slotValuesFull = types[i].values;
        }
    }


    examples.push(slotValuesFull[0].name.value);
    examples.push(slotValuesFull[1].name.value);
    if (slotValuesFull.length > 2) {
        examples.push(slotValuesFull[2].name.value);
    }


    return examples;
}

function sayArray(myData, penultimateWord = 'and') {
    let result = '';

    myData.forEach(function (element, index, arr) {

        if (index === 0) {
            result = element;
        } else if (index === myData.length - 1) {
            result += ` ${penultimateWord} ${element}`;
        } else {
            result += `, ${element}`;
        }
    });
    return result;
}
function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

    return hasDisplay;
}


function convertUTCDateToLocalDate(someDateTimeStamp) {
    var date = new Date(someDateTimeStamp);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}


function convertLocalDatetoUTCDate(someDateTimeStamp) {
    var date = new Date(someDateTimeStamp);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}


// Last feed time calc
function mydiff(date1, date2) {
    var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    var interval = 'hours';
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            (date2.getFullYear() * 12 + date2.getMonth())
            -
            (date1.getFullYear() * 12 + date1.getMonth())
        );
        case "weeks": return Math.floor(timediff / week);
        case "days": return Math.floor(timediff / day);
        case "hours": return Math.floor(timediff / hour);
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}


var fulldays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function formatDate(someDateTimeStamp) {
    var dt = dt = new Date(someDateTimeStamp),
        date = dt.getDate(),
        month = months[dt.getMonth()],
        // timeDiff = someDateTimeStamp - Date.now(),
        // diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)),
        timeDiff = date - new Date().getDate(),
        diffDays = Math.ceil(timeDiff),
        diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0) {
        return "Today";
    } else if (diffYears === 0 && diffDays === -1) {
        return "Yesterday";
    } else if (diffYears === 0 && (diffDays < -1 && diffDays > -7)) {
        return fulldays[dt.getDay()];
    } else if (diffYears >= 1) {
        return month + " " + date + ", " + new Date(someDateTimeStamp).getFullYear();
    } else {
        return month + " " + date;
    }
}

function getTimePeriod(someDateTimeStamp) {
    var hrs = new Date(someDateTimeStamp).getHours();
    if (hrs < 12)
        return 'Morning';
    else if (hrs >= 12 && hrs <= 17)
        return 'Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        return 'Evening';


}

function formatAMPM(someDateTimeStamp) {
    if (!isNullOrEmpty(someDateTimeStamp)) {
        // var time = new Date(someDateTimeStamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        //var date = new Date(someDateTimeStamp);
        //var localeDateTime = new Date( date.getTime() + ( date.getTimezoneOffset() * 60000 ) );
        //var time = new Date(localeDateTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        //var date = convertUTCDateToLocalDate(new Date(someDateTimeStamp));
        //var localeDateTime = convertUTCDateToLocalDate(new Date(someDateTimeStamp));
        var date = new Date(someDateTimeStamp);
        var time = date.getUTCHours();
        return time;
    } else {
        return ""
    }
}

function timeSince(date) {

    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}



/**
 * Function to print date diffs.
 * 
 * @param {Date} fromDate: The valid start date
 * @param {Date} toDate: The end date. Can be null (if so the function uses "now").
 * @param {Number} levels: The number of details you want to get out (1="in 2 Months",2="in 2 Months, 20 Days",...)
 * @param {Boolean} prefix: adds "in" or "ago" to the return string
 * @return {String} Diffrence between the two dates.
 */
function getNiceTime(fromDate, toDate, levels, prefix) {
    var lang = {
        "date.past": "{0} ago",
        "date.future": "in {0}",
        "date.now": "now",
        "date.year": "{0} year",
        "date.years": "{0} years",
        "date.years.prefixed": "{0} years",
        "date.month": "{0} month",
        "date.months": "{0} months",
        "date.months.prefixed": "{0} months",
        "date.day": "{0} day",
        "date.days": "{0} days",
        "date.days.prefixed": "{0} days",
        "date.hour": "{0} hour",
        "date.hours": "{0} hours",
        "date.hours.prefixed": "{0} hours",
        "date.minute": "{0} minute",
        "date.minutes": "{0} minutes",
        "date.minutes.prefixed": "{0} minutes",
        "date.second": "{0} second",
        "date.seconds": "{0} seconds",
        "date.seconds.prefixed": "{0} seconds",
    },
        langFn = function (id, params) {
            var returnValue = lang[id] || "";
            if (params) {
                for (var i = 0; i < params.length; i++) {
                    returnValue = returnValue.replace("{" + i + "}", params[i]);
                }
            }
            return returnValue;
        },
        toDate = toDate ? toDate : new Date(),
        diff = fromDate - toDate,
        past = diff < 0 ? true : false,
        diff = diff < 0 ? diff * -1 : diff,
        date = new Date(new Date(1970, 0, 1, 0).getTime() + diff),
        returnString = '',
        count = 0,
        years = (date.getFullYear() - 1970);
    if (years > 0) {
        var langSingle = "date.year" + (prefix ? "" : ""),
            langMultiple = "date.years" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ? ', ' : '') + (years > 1 ? langFn(langMultiple, [years]) : langFn(langSingle, [years]));
        count++;
    }
    var months = date.getMonth();
    if (count < levels && months > 0) {
        var langSingle = "date.month" + (prefix ? "" : ""),
            langMultiple = "date.months" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ? ', ' : '') + (months > 1 ? langFn(langMultiple, [months]) : langFn(langSingle, [months]));
        count++;
    } else {
        if (count > 0)
            count = 99;
    }
    var days = date.getDate() - 1;
    if (count < levels && days > 0) {
        var langSingle = "date.day" + (prefix ? "" : ""),
            langMultiple = "date.days" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ? ', ' : '') + (days > 1 ? langFn(langMultiple, [days]) : langFn(langSingle, [days]));
        count++;
    } else {
        if (count > 0)
            count = 99;
    }
    var hours = date.getHours();
    if (count < levels && hours > 0) {
        var langSingle = "date.hour" + (prefix ? "" : ""),
            langMultiple = "date.hours" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ? ', ' : '') + (hours > 1 ? langFn(langMultiple, [hours]) : langFn(langSingle, [hours]));
        count++;
    } else {
        if (count > 0)
            count = 99;
    }
    var minutes = date.getMinutes();
    if (count < levels && minutes > 0) {
        var langSingle = "date.minute" + (prefix ? "" : ""),
            langMultiple = "date.minutes" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ? ', ' : '') + (minutes > 1 ? langFn(langMultiple, [minutes]) : langFn(langSingle, [minutes]));
        count++;
    } else {
        if (count > 0)
            count = 99;
    }
    var seconds = date.getSeconds();
    if (count < levels && seconds > 0) {
        var langSingle = "date.second" + (prefix ? "" : ""),
            langMultiple = "date.seconds" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ? ', ' : '') + (seconds > 1 ? langFn(langMultiple, [seconds]) : langFn(langSingle, [seconds]));
        count++;
    } else {
        if (count > 0)
            count = 99;
    }
    if (prefix) {
        if (returnString == "") {
            returnString = langFn("date.now");
        } else if (past)
            returnString = langFn("date.past", [returnString]);
        else
            returnString = langFn("date.future", [returnString]);
    }
    return returnString;
}

function getTimeInterval(feedInterval) {
    var interval = feedInterval.split(/\s+/, 2);
    return interval;
}

function isNullOrEmpty(value) {
    return value == null || value === ""; // value == null is shorthand for value === null || value === undefined
}

const welcomeCardImg = {
    smallImageUrl: "https://s3.amazonaws.com/fish-world/fish-tank-card-image-small-720x480.jpg",
    largeImageUrl: "https://s3.amazonaws.com/fish-world/fish-tank-card-image-large-1200x800.jpg"


};

const DisplayImg1 = {
    title: 'Jet Plane',
    url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png'
};
const DisplayImg2 = {
    title: 'Starry Sky',
    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png'

};

function getCustomIntents() {
    const modelIntents = model.interactionModel.languageModel.intents;

    let customIntents = [];


    for (let i = 0; i < modelIntents.length; i++) {

        if (modelIntents[i].name.substring(0, 7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest") {
            customIntents.push(modelIntents[i]);
        }
    }
    return customIntents;
}

function getSampleUtterance(intent) {

    return randomElement(intent.samples);

}

function getPreviousIntent(attrs) {

    if (attrs.history && attrs.history.length > 1) {
        return attrs.history[attrs.history.length - 2].IntentRequest;

    } else {
        return false;
    }

}

function getPreviousSpeechOutput(attrs) {

    if (attrs.lastSpeech) {
        return attrs.lastSpeech;

    } else {
        return false;
    }

}

function timeDelta(t1, t2) {

    const dt1 = new Date(t1);
    const dt2 = new Date(t2);
    const timeSpanMS = dt2.getTime() - dt1.getTime();
    const span = {
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60)),
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)),
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)),
        "timeSpanDesc": ""
    };


    if (span.timeSpanHR < 2) {
        span.timeSpanDesc = span.timeSpanMIN + " minutes";
    } else if (span.timeSpanDAY < 2) {
        span.timeSpanDesc = span.timeSpanHR + " hours";
    } else {
        span.timeSpanDesc = span.timeSpanDAY + " days";
    }


    return span;

}


const InitMemoryAttributesInterceptor = {
    process(handlerInput) {
        let sessionAttributes = {};
        if (handlerInput.requestEnvelope.session['new']) {

            sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

            let memoryAttributes = getMemoryAttributes();

            if (Object.keys(sessionAttributes).length === 0) {

                Object.keys(memoryAttributes).forEach(function (key) {  // initialize all attributes from global list 

                    sessionAttributes[key] = memoryAttributes[key];

                });

            }
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);


        }
    }
};

const RequestHistoryInterceptor = {
    process(handlerInput) {

        const thisRequest = handlerInput.requestEnvelope.request;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let history = sessionAttributes['history'] || [];

        let IntentRequest = {};
        if (thisRequest.type === 'IntentRequest') {

            let slots = [];

            IntentRequest = {
                'IntentRequest': thisRequest.intent.name
            };

            if (thisRequest.intent.slots) {

                for (let slot in thisRequest.intent.slots) {
                    let slotObj = {};
                    slotObj[slot] = thisRequest.intent.slots[slot].value;
                    slots.push(slotObj);
                }

                IntentRequest = {
                    'IntentRequest': thisRequest.intent.name,
                    'slots': slots
                };

            }

        } else {
            IntentRequest = { 'IntentRequest': thisRequest.type };
        }
        if (history.length > maxHistorySize - 1) {
            history.shift();
        }
        history.push(IntentRequest);

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    }

};




const RequestPersistenceInterceptor = {
    process(handlerInput) {

        if (handlerInput.requestEnvelope.session['new']) {

            return new Promise((resolve, reject) => {

                handlerInput.attributesManager.getPersistentAttributes()

                    .then((sessionAttributes) => {
                        sessionAttributes = sessionAttributes || {};


                        sessionAttributes['launchCount'] += 1;

                        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

                        handlerInput.attributesManager.savePersistentAttributes()
                            .then(() => {
                                resolve();
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });

            });

        } // end session['new'] 
    }
};


const ResponseRecordSpeechOutputInterceptor = {
    process(handlerInput, responseOutput) {

        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let lastSpeechOutput = {
            "outputSpeech": responseOutput.outputSpeech.ssml,
            "reprompt": responseOutput.reprompt.outputSpeech.ssml
        };

        sessionAttributes['lastSpeechOutput'] = lastSpeechOutput;

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    }
};

const ResponsePersistenceInterceptor = {
    process(handlerInput, responseOutput) {

        const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession);

        if (ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 

            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

            sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime();

            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);

            return new Promise((resolve, reject) => {
                handlerInput.attributesManager.savePersistentAttributes()
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });

            });

        }

    }
};

function getDateTimeBySlotValues(feedInterval) {
    var date = new Date();
    var nextScheduleDate = new Date(date.setDate(date.getDate() + +parseInt(feedInterval)));
    return nextScheduleDate.toISOString();
}


function isFeedFrequencyInternalExist(frequency) {
    var filterArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    if (filterArr.includes(frequency)) {
        return true;
    } else {
        return false;
    }
}


const Adapter = require('ask-sdk-dynamodb-persistence-adapter');

const config = {
    tableName: 'fish_world',
    createTable: false
};
const DynamoDBAdapter = new Adapter.DynamoDbPersistenceAdapter(config);


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        FeedingScheduleIntentHandler,
        getLastFeedInfoHandler,
        AMAZON_YesIntent_Handler,
        AMAZON_NoIntent_Handler,
        AMAZON_FallbackIntent_Handler,
        HelpIntentHandler,
        AMAZON_RepeatIntent_Handler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        FeedFrequencyPromptIntentHandler,
        FeedFrequencyConfirmSlotIntentHandler,
        InprogressFeedFrequencyIntentHandler

    )
    .withPersistenceAdapter(DynamoDBAdapter)
    .addErrorHandlers(ErrorHandler)
    .lambda();
