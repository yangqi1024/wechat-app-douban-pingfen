// pages/rank-list/rank-list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    subjects: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let title = options.title;
    let url = options.url;
    this.setData({ title });
    this.loadData(url);
  },

  loadData: function(url) {
    url = wx.db.url(url);
    var reqTask = wx.request({
      url: url,
      data: { apikey: "0df993c66c0c636e29ecbb5344252a4a" },
      header: { "content-type": "json" },
      success: res => {
        console.log(res);
        let subjects = res.data.subjects;
        console.log(subjects);
        this.updateSubjects(subjects);
        this.setData({ subjects });
      },
      fail: () => {
        console.log("获取详情失败");
      }
    });
  },

  updateSubjects: function(subjects) {
    return subjects.map((item,index) => {
      let rank = item.rank || index+1
      let subject = item.subject || item;
      let contury = "";
      let genres = subject.genres.join(" ");
      genres = genres ? `${genres}/` : genres;
      let directors = subject.directors
        .map(item => {
          return item.name;
        })
        .join(" ");
      directors = directors ? `${directors}/` : directors;
      let casts = subject.casts
        .map(item => {
          return item.name;
        })
        .join(" ");
      item.desc = `${contury}${genres}${directors}${casts}`;

      item.imgUrl = subject.images.small 
      item.title = subject.title
      item.average = subject.rating.average
      item.id = subject.id
      item.rank = rank
      return item;
    });
  },

  seeDetail: function(e) {
    let movieId = e.currentTarget.dataset.movieid;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${movieId}&title=${title}`
    });
  }
});
