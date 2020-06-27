//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.db = {}
    wx.db.url = (url)=>{
      return `https://api.douban.com${url}`
    }
  },
  globalData: {
    userInfo: null
  }
})