import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client';
import { ClsService } from 'nestjs-cls';
import type { ClsStore } from '../common/cls/cls-store.interface';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    readonly scopedClient: any;
    constructor(config: ConfigService, cls: ClsService<ClsStore>);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
