export declare class ConfigService {
    getOrThrow<T = string>(key: string): T;
    get<T = string>(key: string): T | undefined;
}
export declare class ConfigModule {
    static forRoot(_options?: unknown): {
        module: typeof ConfigModule;
        global: boolean;
        providers: (typeof ConfigService)[];
        exports: (typeof ConfigService)[];
    };
}
