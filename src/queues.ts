import { ExpressAdapter } from '@bull-board/express';
import * as Queue from 'bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';

export const serverAdapter = new ExpressAdapter().setBasePath('/admin/queues');

const ResetQueue = new Queue('reset');

createBullBoard({
  queues: [new BullAdapter(ResetQueue)],
  serverAdapter: serverAdapter,
});
