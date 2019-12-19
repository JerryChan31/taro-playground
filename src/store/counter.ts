import Taro from '@tarojs/taro'
import { observable, flow, computed } from 'mobx'

class counterStore {
  @observable arr = new Map()
  @observable counter:number = 0
  requestArr = flow(function * () {
    return Taro.request({
      url: 'http://rest.apizza.net/mock/10a6d62e83e84f7aaf7cb3ea4cd08db5/test'
    }).then(res => {
      const posts = res.data || {}
      const row = new Map()
      Object.values(posts).map(data => {
        row.set(
          data.id,
          Object.assign({}, data)
        )
      })
      this.arr = row
    })
  })

  @computed get computedArr () {
    let temp:{id: string, exp: number}[] = []
    this.arr.forEach(item => {
      temp.push({
        id: item.id,
        exp: item.val
      })
    })
    return temp
  }

  counterStore() {
    this.counter++
  }
  increment() {
    this.counter++
  }
  decrement() {
    this.counter--
  }
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
}


// const counterStore = observable({
//   counter: 0,
//   // arr: new Map(),
//   // requestArr() {
//   //   return Taro.request({
//   //     url: 'http://rest.apizza.net/mock/10a6d62e83e84f7aaf7cb3ea4cd08db5/test'
//   //   }).then(res => {
//   //     const posts = res.data || {}
//   //     const row = new Map()
//   //     Object.values(posts).map(data => {
//   //       row.set(
//   //         data.id,
//   //         Object.assign({}, data)
//   //       )
//   //     })
//   //     this.arr = row
//   //   })
//   // },
//   // get computedArr () {
//   //   let temp:{id: string, exp: number}[] = []
//   //   this.arr.forEach(item => {
//   //     temp.push({
//   //       id: item.id,
//   //       exp: item.val
//   //     })
//   //   })
//   //   return temp
//   // },
//   increment() {
//     debugger
//     this.counter++
//   },
//   decrement() {
//     this.counter--
//   },
//   incrementAsync() {
//     setTimeout(() => {
//       this.counter++
//     }, 1000)
//   }
// })
export default new counterStore()