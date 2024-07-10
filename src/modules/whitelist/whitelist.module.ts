import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhitelistService } from './whitelist.service';
import { WhitelistController } from './whitelist.controller';
import { Whitelist } from './entities/whitelist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Whitelist])],
  providers: [WhitelistService],
  controllers: [WhitelistController],
  exports: [TypeOrmModule], // 确保 TypeOrmModule 导出以便在其他模块中使用
})
export class WhitelistModule {}
