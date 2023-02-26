import https from 'https'

const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
function requestCallback(url, callback) {
 // write code to request url asynchronously
    var start = performance.now()
    https.get(url,(res)=>{
        callback(performance.now() - start)
    })
}
function requestPromise(url) {
 // write code to request url asynchronously with Promise
 var start = performance.now()
 return new Promise((resolve,reject)=>{
    https.get(url,()=>{resolve(performance.now() - start)})
 }
 )
}
async function requestAsyncAwait(url) {
 // write code to request url asynchronously
 // you should call requestPromise here and get the result using async/await.

    const res = await requestPromise(url)
    console.log(res)
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then((val)=>console.log(val))
requestAsyncAwait(url);