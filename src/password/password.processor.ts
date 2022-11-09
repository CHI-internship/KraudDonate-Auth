import {Job} from 'bull';
import {Process, Processor} from '@nestjs/bull';
import {PrismaService} from 'src/services/prisma.service';

@Processor('reset')
export class PasswordProcessor {
  constructor(private prisma: PrismaService) {
  }

  @Process('updateDate')
  async handleTranscode(job: Job) {
    await this.prisma.tokens.update({
      where: {
        id: job.data
      }, data: {
        expiredAt: new Date().toISOString()
      }
    })
  }
}