// component/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    titleColor: {
      type: String,
      value: '#00'
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },

    home: {
      type: String,
      value: 'true'
    },
    back: {
      type: String,
      value: 'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: "",
    navBarStyle: "",
    topHeight: 0
  },

  lifetimes: {

    attached: function () {
      let statusBarStyle = `
      background-color:${this.data.statusBarColor};
      height:${wx.db.statusBarHeight}px
      `
      let navBarStyle = `
      background-color:${this.data.navBarColor};
      height:${wx.db.navBarHeight}px;
      color:${this.data.titleColor};
      `
      let topHeight = wx.db.statusBarHeight + wx.db.navBarHeight
      this.setData({ statusBarStyle, navBarStyle, topHeight })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function () {
      this.triggerEvent('back')
      wx.navigateBack({
        delta: 1
      });

    },
    home: function () {
      this.triggerEvent('home')
      wx.navigateBack({
        delta: 99
      });
    }
  }
})
