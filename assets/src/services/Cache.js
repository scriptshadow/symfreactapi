const Cache = {}

function set(key, value){
    Cache[key] = {
        data: value,
        cachedAt: new Date().getTime(),
    }
}
function get(key){
    return new Promise((resolve, reject) => {
        resolve(
            Cache[key] && Cache[key].cachedAt + (15 * 60 * 1000) > new Date().getTime()
            ? Cache[key].data
            : null
        )
    })
}
function invalidate(key){
    delete Cache[key]
}
export default {
    set,
    get,
    invalidate
}