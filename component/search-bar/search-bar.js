// component/search-bar/search-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "搜索"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindinput: function (e) {
      let timer = this.data.timer
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        let value = e.detail.value
        this.triggerEvent('search', {"result":value})
      }, 300)
      this.setData({ timer })
    },
    bindconfirm:function(e){
      this.triggerEvent('search', {"result":e.detail.value})
    }
  }
})
