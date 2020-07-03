// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allMovies: [
      {
        title: "院线热映",
        url: "/v2/movie/in_theaters",
        movies: []
      },
      {
        title: "新片榜",
        url: "/v2/movie/new_movies",
        movies: []
      },
      {
        title: "口碑榜",
        url: "/v2/movie/weekly",
        movies: []
      },
      {
        title: "北美票房榜",
        url: "/v2/movie/us_box",
        movies: []
      },
      {
        title: "Top250",
        url: "/v2/movie/top250",
        movies: []
      },
    ]
  },
  onLoad: function () {
    this.loadLocalData();
    this.getCity((city) => {
      this.loadData(0, { city: city, apikey: '0df993c66c0c636e29ecbb5344252a4a' })
    });
    this.loadData(1, { apikey: '0df993c66c0c636e29ecbb5344252a4a' })
    this.loadData(2, { apikey: '0df993c66c0c636e29ecbb5344252a4a' })
    this.loadData(3, { apikey: '0df993c66c0c636e29ecbb5344252a4a' })
    this.loadData(4, { apikey: '0df993c66c0c636e29ecbb5344252a4a' })
  },

  loadData: function (idx, params) {
    let obj = this.data.allMovies[idx];
    wx.request({
      url: wx.db.url(obj.url),
      // data: {
      //   city:city,
      //   apikey:'0df993c66c0c636e29ecbb5344252a4a'
      // },
      data: params,
      header: { 'content-type': 'json' },
      success: (res) => {
        console.log(res);
        let movies = res.data.subjects;
        let obj = this.data.allMovies[idx];
        obj.movies = [];
        for (let index = 0; index < movies.length; index++) {
          let element = movies[index]
          let movie = element.subject || element
          this.updateMovie(movie)
          obj.movies.push(movie)
        }
        this.setData(this.data);
        wx.setStorage({
          key: obj.title,
          data: obj.movies
        });

      },
      fail: () => { console.log('获取热映失败'); }
    });

  },

  loadLocalData: function () {
    let allMovies = this.data.allMovies;
    for (let index = 0; index < allMovies.length; index++) {
      let obj = allMovies[index]
      obj.movies = wx.getStorageSync(obj.title) || [];
    }
    this.setData(this.data)
  },
  getCity: function (success) {
    wx.getLocation({
      success: (res) => {
        // console.log(res.longitude, res.latitude);
        var reqTask = wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            ak: 'uXDG6lrpKFg36aUkGnzzcrizuPfTdcVH',
            output: 'json',
            coordtype: 'wgs84ll',
            location: `${res.latitude},${res.longitude}`
          },
          success: (res) => {
            // console.log(res);
            let city = res.data.result.addressComponent.city;
            success && success(city);
          },
          fail: () => { console.log('获取城市失败'); }
        });

      },
      fail: () => {
        console.log('获取位置失败');
      }
    })
  },
  updateMovie: (movie) => {
    if (!movie.rating.stars) {
      return
    }
    movie.numberStars = parseInt(movie.rating.stars)
  },
  viewMore: function (e) {
    let index = e.currentTarget.dataset.index
    let obj = this.data.allMovies[index]
    wx.navigateTo({
      url: `/pages/list/list?title=${obj.title}&url=${obj.url}`,
    });

  },
  search:function(){
    wx.navigateTo({
      url: '/pages/search/search'
    });
      
  }
})