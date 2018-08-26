const statusList = ['pending', 'fullfilled', 'rejected']

module.exports = class MyPromise {
  static all () {}
  static some () {}

  constructor (asyncFn) {
    this.cureentStatus = null
    this.asyncFn = asyncFn
    this.resolveCb = []
    this.rejectCb = null
    this.finallyCb = null
    this.result = null
    this.err = null

    this.start(this.asyncFn)
  }

  start (asyncFn) {
    this.cureentStatus = 0

    asyncFn((res) => {
      this.cureentStatus = 1
      this.result = res
      this.handleReslove()
    }, (err) => {
      this.err = err
      this.cureentStatus = 2
      this.handleReject()
    })
  }

  handleReslove(){
    let timer = 0

    if (this.cureentStatus === 1 && this.resolveCb.length > 0 && typeof (this.resolveCb)[0] === 'function') {
      let cbRes = (this.resolveCb)[0](this.result)
      if(cbRes && cbRes instanceof MyPromise) {
        timer = setInterval(() => {
          if(cbRes.cureentStatus > 0)  {
            clearInterval(timer)

            this.result = cbRes.result
            this.err = cbRes.err
            this.resolveCb.shift()

            this.handleReslove()
          }
        }, 100)
      } else {
        this.finally()
        return this
      }
    }
  }

  handleReject(){
    if (this.cureentStatus === 2 && this.rejectCb && typeof this.rejectCb === 'function') {
      let cbRes = this.rejectCb(this.err)
      if(cbRes && cbRes instanceof MyPromise){
        this.finally()
      } else {
        this.finally()
        return this
      }
    }
  }

  then (resolveCb) {
    if (resolveCb) {
      this.resolveCb.push(resolveCb)
      return this
    }
  }

  catch (rejectCb) {
    if (rejectCb) {
      this.rejectCb = rejectCb
      return this
    }
  }

  finally (finallyCb) {
    if (finallyCb) {
      this.finallyCb = finallyCb
    } else {
      if (this.cureentStatus >= 2 && this.finallyCb && typeof this.finallyCb === 'function') {
        this.finallyCb({msg: 'finally'})
      }
    }
  }
}
