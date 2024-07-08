"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWrn = exports.logErr = exports.log = void 0;
exports.InitLogger = InitLogger;
const log4js_1 = __importDefault(require("log4js"));
const node_cron_1 = __importDefault(require("node-cron"));
//Initializes the logging system 
function InitLogger(config) {
    //Function to setup the appenders and categories
    function SetupLogs(path, levels, daily) {
        const logAppenders = {
            log: {
                type: 'file',
                filename: `${path}/info${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
            },
        };
        const logCategories = {
            default: { appenders: ['log'], level: 'all' }
        };
        if (levels & 1) {
            logAppenders.err = {
                type: 'file',
                filename: `${path}/error${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
            };
            logCategories.errLog = { appenders: ['err'], level: 'error' };
        }
        if (levels & 2) {
            logAppenders.wrn = {
                type: 'file',
                filename: `${path}/warning${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
            };
            logCategories.wrnLog = { appenders: ['wrn'], level: 'warn' };
        }
        return { logAppenders, logCategories };
    }
    const logg = SetupLogs(config.path, (config.level_error ? 1 : 0) + (config.level_warning ? 2 : 0), config.daily);
    log4js_1.default.configure({
        appenders: logg.logAppenders,
        categories: logg.logCategories
    });
    exports.log = log4js_1.default.getLogger('log');
    exports.logErr = log4js_1.default.getLogger('errLog');
    exports.logWrn = log4js_1.default.getLogger('wrnLog');
    //If the log files are daily, then a cron must be setup to always change daily the log files
    if (config.daily)
        node_cron_1.default.schedule(`1 0 0 * * *`, () => {
            const logg = SetupLogs(config.path, (config.level_error ? 1 : 0) + (config.level_warning ? 1 : 0), config.daily);
            log4js_1.default.configure({
                appenders: logg.logAppenders,
                categories: logg.logCategories
            });
            exports.log = log4js_1.default.getLogger('log');
            exports.logErr = log4js_1.default.getLogger('errLog');
            exports.logWrn = log4js_1.default.getLogger('wrnLog');
        });
}
