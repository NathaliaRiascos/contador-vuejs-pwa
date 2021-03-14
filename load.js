if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./serviceWorker.js")
    .then(reg => consolde.log('Registro Exitoso'))
    .catch(err => console.log(err))
}