import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { OccurrencesModule } from './occurrences/occurrences.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, OccurrencesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
