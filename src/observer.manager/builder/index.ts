import { ObserverPlugin } from '../../observer.plugins/base.plugin'
import Observer from '../index'

class ObserverBuilder {
    private readonly instance: Observer
    constructor(poolingInterval = 1000) {
        this.instance = new Observer(poolingInterval)
    }
    attachPlugin(plugin: ObserverPlugin): ObserverBuilder {
        this.instance.attachPlugin(plugin)
        return this
    }

    build(): Observer {
        return this.instance
    }
}
// not using currently
export default ObserverBuilder
