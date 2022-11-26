// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createBullBoard } = require('@bull-board/api');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BullAdapter } = require('@bull-board/api/bullAdapter');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ExpressAdapter } = require('@bull-board/express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Queue = require('bull');

export const serverAdapter = new ExpressAdapter().setBasePath('/admin/queues');

const ResetQueue = new Queue('reset');

createBullBoard({
  queues: [new BullAdapter(ResetQueue)],
  serverAdapter: serverAdapter,
});
