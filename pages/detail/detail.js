// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    summaryOpen: false,
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let title = options.title;
    this.setData({ title })
    this.loadData(id);
    this.loadLocalData(id);
  },

  loadData: function (id) {
    let url = `${wx.db.url("/v2/movie/subject/")}${id}`;
    var reqTask = wx.request({
      url: url,
      data: { apikey: "0df993c66c0c636e29ecbb5344252a4a" },
      header: { "content-type": "json" },
      success: res => {
        let data = res.data;
        this.updateMovie(data);
        this.setData({
          movie: data
        });
        console.log(data);
        wx.setStorage({
          key: url,
          data: data
        });
      },
      fail: () => {
        console.log("获取详情失败");
      }
    });
  },

  loadLocalData: function (id) {
    let url = `${wx.db.url("/v2/movie/subject/")}${id}`;
    let cache = wx.getStorageSync(url) || {};
    console.log(cache);
    this.setData({
      movie: cache
    });
  },

  updateMovie: function (movie) {
    let genres = movie.genres.join(" ");
    let countries = movie.countries.join(" ");
    let duration = movie.durations && `片长${movie.durations[0]}`;
    movie.desc = `${genres}/${countries}/${duration}`;

    let title = movie.title;
    let originalTitle = movie.original_title;
    let year = movie.year;
    movie.titleDesc = `${title} (${year})`;
    movie.originalTitleDesc = `${originalTitle}(${year})`;

    movie.numberStars = parseInt(movie.rating.stars);

  },
  // // 获取影人条目信息
  //   loadCelebrity:function(id){
  //     let url = `${wx.db.url("/v2/movie/celebrity/")}${id}`;
  //     var reqTask = wx.request({
  //       url: url,
  //       data: { apikey: "0df993c66c0c636e29ecbb5344252a4a" },
  //       header: { "content-type": "json" },
  //       success: res => {
  //         console.log(res);
  //         // let data = res.data;
  //         // this.updateMovie(data);
  //         // this.setData({
  //         //   movie: data
  //         // });

  //         // wx.setStorage({
  //         //   key: url,
  //         //   data: data
  //         // });
  //       },
  //       fail: () => {
  //         console.log("获取影人失败");
  //       }
  //     });
  //   },

  openSummary: function () {
    this.setData({
      summaryOpen: !this.data.summaryOpen
    });
    console.log(this.data);
  },

  toComment: function () {
    wx.db.movie = this.data.movie
    wx.navigateTo({
      url: `/pages/comment/comment?title=${this.data.title}`
    });

  },
  review:function(e){
    wx.navigateTo({
      url: `/pages/review/review?title=${this.data.title}&id=${e.currentTarget.dataset.id}`
    });

  }
});
