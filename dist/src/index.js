"use strict";
const InitLogger_1 = require("./InitLogger");
//All log functions log the data to the log file and to the console
const logger = {
    //Initializer
    init: InitLogger_1.InitLogger,
    //Info level logger
    info: (message, ...params) => {
        if (params.length > 0) {
            console.log(message, params);
            InitLogger_1.log.info(message, params);
        }
        else {
            console.log(message);
            InitLogger_1.log.info(message);
        }
    },
    //Error level logger
    error: (message, ...params) => {
        if (params.length > 0) {
            console.log(message, params);
            InitLogger_1.logErr.error(message, params);
        }
        else {
            console.log(message);
            InitLogger_1.logErr.error(message);
        }
    },
    //Warning level logger
    warn: (message, ...params) => {
        if (params.length > 0) {
            console.log(message, params);
            InitLogger_1.logWrn.warn(message, params);
        }
        else {
            console.log(message);
            InitLogger_1.logWrn.warn(message);
        }
    },
    //Arrays for storing timers
    timersLabel: [],
    timers: [],
    //Initializes a timer with a label
    time: (label) => {
        if (logger.timersLabel.indexOf(label) == -1) {
            logger.timersLabel.push(label);
            logger.timers.push(new Date(Date.now()).getTime());
        }
        else {
            console.log(`Timer ${label} already running`);
            InitLogger_1.log.info(`Timer ${label} already running`);
        }
    },
    //Ends a timer and logs it
    timeEnd: (label) => {
        const i = logger.timersLabel.indexOf(label);
        if (i != -1) {
            let reqTime = (new Date(Date.now()).getTime() - logger.timers[i]) / 1000;
            reqTime =
                reqTime > 60
                    ? (reqTime / 60).toFixed(2) + ' m'
                    : reqTime.toFixed(2) + ' s';
            logger.info(`${label}: ` + reqTime);
            logger.timers.splice(i, 1);
            logger.timersLabel.splice(i, 1);
        }
        else {
            console.log(`Timer ${label} not started`);
            InitLogger_1.log.info(`Timer ${label} not started`);
        }
    },
};
module.exports = logger;
