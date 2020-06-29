// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title)
    this.setData({title:options.title})
      
    wx.getStorage({
      key: options.title,
      success: (res) => {
        console.log(res)
        this.setData({
          movies:res.data
        })
      },
    });
      
  },
})