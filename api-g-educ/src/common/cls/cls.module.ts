import { Global, Module } from '@nestjs/common';
import { ClsContextService } from './cls-context.service';

@Global()
@Module({
  providers: [ClsContextService],
  exports: [ClsContextService],
})
export class ContextClsModule {}
