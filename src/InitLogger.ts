import log4js from "log4js";
import { TLConfig } from "./types";
import cron from 'node-cron'

//Variables for keeping the log references
export var log: log4js.Logger;
export var logErr: log4js.Logger;
export var logWrn: log4js.Logger;

//Initializes the logging system 
export function InitLogger(config: TLConfig) {

    //Function to setup the appenders and categories
    function SetupLogs(path: string, levels: number, daily: boolean) {
        const logAppenders: any = {
            log: {
                type: 'file',
                filename: `${path}/info${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
            },
        }

        const logCategories: any = {
            default: { appenders: ['log'], level: 'all' }
        }

        if(levels & 1) {
            logAppenders.err = {
                type: 'file',
                filename: `${path}/error${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
            }

            logCategories.errLog = { appenders: ['err'], level: 'error' };
        }

        if(levels & 2) {
        logAppenders.wrn = {
            type: 'file',
            filename: `${path}/warning${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
        }

        logCategories.wrnLog = { appenders: ['wrn'], level: 'warn' };
        }

        return { logAppenders, logCategories };
    }

    const logg = SetupLogs(config.path, (config.level_error ? 1 : 0) + (config.level_warning ? 2 : 0), config.daily);

    log4js.configure({
        appenders: logg.logAppenders,
        categories: logg.logCategories
    });

    log = log4js.getLogger('log');
    logErr = log4js.getLogger('errLog');
    logWrn = log4js.getLogger('wrnLog');

    //If the log files are daily, then a cron must be setup to always change daily the log files
    if(config.daily)
        cron.schedule(`1 0 0 * * *`, () => {
        const logg = SetupLogs(config.path, (config.level_error ? 1 : 0) + (config.level_warning ? 1 : 0), config.daily);

        log4js.configure({
            appenders: logg.logAppenders,
            categories: logg.logCategories
        });
        
        log = log4js.getLogger('log');
        logErr = log4js.getLogger('errLog');
        logWrn = log4js.getLogger('wrnLog');
    });
}
