import { init as initApm } from "@elastic/apm-rum"

var apm = initApm({
    serviceName: 'SOM-Frtontend_svelte',
    serviceVersion: '1.0.0',
    serverUrl: 'http://192.168.140.254:8200',
})

export default apm