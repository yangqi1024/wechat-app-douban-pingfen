// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    title: "",
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = options.title
    let movie = wx.db.movie
    console.log(movie)
    this.setData({ title, movie })

    this.loadData(movie.id, 0)
  },

  loadData: function (id, start) {
    let url = `${wx.db.url("/v2/movie/subject/")}${id}/comments`;
    var reqTask = wx.request({
      url: url,
      data: {
        apikey: "0df993c66c0c636e29ecbb5344252a4a",
        start: start,
        count: 10
      },
      header: { "content-type": "json" },
      success: res => {
        console.log(res)
        this.setData({
          comments:res.data.comments
        })
      },
      fail: () => {
        console.log("获取详情失败");
      }
    });
  },

  scrolltolower:function(e){
    console.log(e)
  }
})