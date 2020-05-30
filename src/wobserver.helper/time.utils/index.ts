class TimeUtils {
    public static getCurrent() {
        if (!window || !window.performance || !window.performance.now) {
            return Date.now()
        }
        if (!window.performance.timing.navigationStart) {
            return Date.now()
        }
        return window.performance.now() + window.performance.timing.navigationStart
    }
}

export default TimeUtils