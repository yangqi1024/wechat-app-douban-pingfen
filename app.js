//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.db = {}
    wx.db.url = (url) => {
      return `https://api.douban.com${url}`
    }

    let info = wx.getSystemInfoSync();
    wx.db.statusBarHeight = info.statusBarHeight

    if (info.platform === 'android') {
      wx.db.navBarHeight = 48
    } else {
      wx.db.navBarHeight = 44
    }

  },
  globalData: {
    userInfo: null
  }
})