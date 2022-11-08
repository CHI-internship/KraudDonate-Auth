import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { PrismaService } from 'src/services/prisma.service';

@Processor('reset')
export class PasswordProcessor {
    constructor(private prisma: PrismaService) { }

    @Process('delResetToken')
    async handleTranscode(job: Job) {
        await this.prisma.tokens.delete({ where: { id: job.data } })
    }
}