import * as crypto from 'crypto'

export function hash(value: string) {
    const hashed = crypto
        .createHmac(process.env.ALGORITM_DECODE_PASSWORD!, value)
        .update(value)
        .digest('hex')

    return hashed
}