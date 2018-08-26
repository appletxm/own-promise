const MyPromise = require('./my-promise')

let myPromise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.info('promise 1 async function completed.....')
    resolve({res: true})
    // reject(new Error('failed get data'))
  }, 2000)
})
// .then(res => {
//   console.info('---------res-------', res)
// }).catch(err => {
//   console.info('@@@@@@@@err', err)
// }).finally(res => {
//   console.info('#######res', res)
// })

let myPromise2 = new MyPromise(function(resolve, reject){
  setTimeout(() => {
    console.info('promise 2 async function completed.....')
    resolve({res: '0000000'})
  }, 1000)
})

let myPromise3 = new MyPromise(function(resolve, reject){
  setTimeout(() => {
    console.info('promise 3 async function completed.....')
    resolve({res: '555555'})
  }, 6000)
})

myPromise1.then(res => {
  console.info('res 1:', res)
  return myPromise2
}).then(res => {
  console.info('res2:', res)
  return myPromise3
}).then(res => {
  console.info('res3:', res)
}).catch(err => {
  console.info('err:', err)
}).finally(res => {
  console.info('finally:', res)
})


// let myPromise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.info('promise 1 async function completed.....')
//     resolve({res: true})
//     // reject(new Error('failed get data'))
//   }, 2000)
// })

// let myPromise2 = new Promise(function(resolve, reject){
//   setTimeout(() => {
//     console.info('promise 2 async function completed.....')
//     resolve({res: '0000000'})
//   }, 1000)
// })

// myPromise1.then(res => {
//   console.info('====1=====', res)
//   return myPromise2
// }).then(res => {
//   console.info('====2=====', res)
//   // throw new Error('this is an error')
// }).catch(err => {console.error(err)}).finally(res => {})
