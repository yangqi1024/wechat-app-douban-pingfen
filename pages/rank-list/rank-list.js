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
    this.setData({ title });
    this.loadData();
  },

  loadData: function() {
    let url = wx.db.url("/v2/movie/weekly");
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
    return subjects.map(item => {
      let subject = item.subject
      let contury = ""
      let genres = subject.genres.join(' ')
      let directors = subject.directors.map((item)=>{
        return item.name
      }).join(' ')

      let casts = subject.casts.map((item)=>{
        return item.name
      }).join(' ')
      item.desc = `${contury}/${genres}/${directors}/${casts}`
      return item
    });
  }
});
