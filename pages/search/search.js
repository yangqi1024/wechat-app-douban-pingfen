// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    musics: [],
    movies: [],
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let books = wx.getStorageSync("/v2/book/search");
    console.log(books);
    this.setData({books})
  },

  bindSearch: function(e) {
    let result = e.detail.result;
    console.log(result);
    this.search(result);
  },

  search: function(key) {
    this.searchBook(key);
    // this.searchMusic(key);
  },

  searchBook: function(key) {
    let url = wx.db.url("/v2/book/search");
    var reqTask = wx.request({
      url: url,
      data: { apikey: "0df993c66c0c636e29ecbb5344252a4a", q: key },
      header: { "content-type": "json" },
      success: res => {
        let books = this.updateBookInfo(res.data.books);
        console.log(books);
        this.setData({ books });

        wx.setStorage({
          key: "/v2/book/search",
          data: books
        });
      },
      fail: () => {
        console.log("搜索失败");
      }
    });
  },
  searchMusic: function(key) {
    var reqTask = wx.request({
      url: wx.db.url("/v2/music/search"),
      data: { apikey: "0df993c66c0c636e29ecbb5344252a4a", q: key },
      header: { "content-type": "json" },
      success: res => {
        this.setData({
          musics: this.updateBookInfo(res.data.musics)
        });
      },
      fail: () => {
        console.log("搜索失败");
      }
    });
  },

  updateBookInfo: function(items) {
    return items.map(item => {
      let author = item.author.join(" ");
      let publisher = item.publisher;
      let pubdate = item.pubdate;
      item.authorInfo = `${author}/${pubdate}/${publisher}`;
      return item;
    });
  }
});
