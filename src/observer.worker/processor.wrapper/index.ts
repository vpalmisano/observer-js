import type {
    RawStats
} from '../../observer.collector/rtc.collector'
import {
    logger
} from '../../observer.logger'
import type {
    ClientPayload,
    InitialConfig,
    WorkerCallback,
    WorkerPayload
} from '../types'


class ProcessorWorker {
    private _workerScope?: any
    constructor (private readonly _workerCallback?: WorkerCallback) {
        this.setWorkerScope = this.setWorkerScope.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.requestInitialConfig = this.requestInitialConfig.bind(this)
        this.requestRawStats = this.requestRawStats.bind(this)
    }

    setWorkerScope (workerScope: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this._workerScope = workerScope
    }

    onMessage (msg: MessageEvent): void {
        const data = msg.data as ClientPayload
        switch (data.what) {
            case 'onRequestRawStats':
                this._workerCallback?.onResponseRawStats(data.data as RawStats[])
                return
            case 'onRequestInitialConfig':
                this._workerCallback?.onResponseInitialConfig(data.data as InitialConfig)
                return
            default:
                logger.warn(
                    'unknown types',
                    data
                )
        }
    }

    requestInitialConfig (): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        this._workerScope.postMessage({'what': 'requestInitialConfig'} as WorkerPayload)
    }

    requestRawStats (): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        this._workerScope.postMessage({'what': 'requestRawStats'} as WorkerPayload)
    }
}

export {
    ProcessorWorker
}
