// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  annual:function(){
    wx.navigateTo({
      url: `/pages/webview/webview?url=${"https://movie.douban.com/annual/2019?source=movie_navigation"}`
    });
  },

  weekly:function(){
    wx.navigateTo({
      url: `/pages/rank-list/rank-list?title=${"口碑电影"}&url=${'/v2/movie/weekly'}`
    });
  },

  movieTop250:function(){
    wx.navigateTo({
      url: `/pages/rank-list/rank-list?title=${"豆瓣 Top250"}&url=${'/v2/movie/top250'}`
    });
  }
})