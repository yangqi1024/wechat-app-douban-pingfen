// component/movieItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },

    movie: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    seeDetail: function(e) {
      console.log(e);
      let movieId = e.currentTarget.dataset.movieid;
      console.log(movieId);
      wx.navigateTo({
        url: `/pages/detail/detail?id=${movieId}`
      });
    }
  }
});
