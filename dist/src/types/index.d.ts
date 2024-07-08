export interface ILogger {
    init(config: {
        path: string;
        level_error: boolean;
        level_warning: boolean;
        daily: boolean;
    }): void;
    info(message: any, ...params: any[]): void;
    error(message: any, ...params: any[]): void;
    warn(message: any, ...params: any[]): void;
    time(label: string): void;
    timeEnd(label: string): void;
    timersLabel: string[];
    timers: number[];
}
export type TLConfig = {
    path: string;
    level_error: boolean;
    level_warning: boolean;
    daily: boolean;
};
