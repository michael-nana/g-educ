import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { ClsContextService } from '../../../common/cls/cls-context.service';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    private readonly clsContext;
    constructor(configService: ConfigService, prisma: PrismaService, clsContext: ClsContextService);
    validate(payload: JwtPayload): Promise<AuthenticatedUser>;
}
export {};
