export class TrackingException extends Error {
    constructor(message) {
        Error.stackTraceLimit=0
        super(message)

        this.name = this.constructor.name
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor)
        } else {
            this.stack = (new Error(message)).stack
        }

        this.prepareStackTrace = function (err, stack) {
            return stack
        }

    }
}
