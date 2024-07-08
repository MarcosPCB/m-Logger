import log4js from "log4js";
import { TLConfig } from "./types";
export declare var log: log4js.Logger;
export declare var logErr: log4js.Logger;
export declare var logWrn: log4js.Logger;
export declare function InitLogger(config: TLConfig): void;
