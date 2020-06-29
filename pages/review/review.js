// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    review:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = options.title
    let id = options.id
    this.setData({ title })
    this.loadData(id)
  },

  loadData: function (id) {
    let url = `${wx.db.url("/v2/movie/review/")}${id}`;
    var reqTask = wx.request({
      url: url,
      data: {
        apikey: "0df993c66c0c636e29ecbb5344252a4a"
      },
      header: { "content-type": "json" },
      success: res => {
        console.log(res)
        this.setData({
          review:res.data
        })
      },
      fail: () => {
        console.log("获取详情失败");
      }
    });
  },
})