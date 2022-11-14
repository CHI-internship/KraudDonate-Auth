const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')
const Queue = require('bull')

export const serverAdapter = new ExpressAdapter()
    .setBasePath('/admin/queues')

const ResetQueue = new Queue('reset')

createBullBoard({
    queues: [new BullAdapter(ResetQueue)],
    serverAdapter: serverAdapter,
});
