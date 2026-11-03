export class ConfigService {
  getOrThrow<T = string>(key: string): T {
    const value = process.env[key];

    if (value === undefined) {
      throw new Error(`Configuration manquante : ${key}`);
    }

    return value as T;
  }

  get<T = string>(key: string): T | undefined {
    return process.env[key] as T | undefined;
  }
}

export class ConfigModule {
  static forRoot(_options?: unknown) {
    return {
      module: ConfigModule,
      global: true,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}