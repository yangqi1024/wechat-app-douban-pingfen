// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  bindSearch: function(e) {
    let result = e.detail.result;
    console.log(result);
    this.search(result)
  },

  search: function(key) {
    let url = wx.db.url("/v2/movie/search");
    var reqTask = wx.request({
      url: url,
      data: { apikey: "0df993c66c0c636e29ecbb5344252a4a", q: key },
      header: { "content-type": "json" },
      success: res => {
        console.log(res);
      },
      fail: () => {
        console.log("搜索失败");
      }
    });
  }
});
