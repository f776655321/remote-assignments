import request from "sync-request";
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
const requestSync = (url)=>{
   var start = performance.now()
   var res = request('GET',url)
   console.log(performance.now() - start)
   
}
requestSync(url)
requestSync(url)
requestSync(url)
