export default function Timer(duration, id) {
    const endTime = new Date().now() + duration;
    return {
        id: id,
        endTime: endTime,
        getTimeRemaining() {
            const remainingTime = endTime - new Date().now();
            return remainingTime > 0 ? remainingTime : 0;
        },
    };
}
