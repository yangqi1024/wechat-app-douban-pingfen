// component/ratingStar/ratingStar.js
const STAR_ON = "/assets/imgs/rating_star_small_on.png";
const STAR_OFF = "/assets/imgs/rating_star_small_off.png";
const STAR_HALF = "/assets/imgs/rating_star_small_half.png";
const DEFAULT_ITEMS = [STAR_OFF, STAR_OFF, STAR_OFF, STAR_OFF, STAR_OFF];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number,
      observer: function(new_val, old_val, path) {
        let stars = DEFAULT_ITEMS;
        if (new_val > 0) {
          let halfVal = new_val / 2;
          let floor = Math.floor(halfVal);
          console.log("halfVal:" + halfVal);
          console.log("floor:" + floor);
          if (floor != halfVal) {
            stars[floor] = STAR_HALF;
          }
          for (let i = 0; i < floor; i++) {
            stars[i] = STAR_ON;
          }
        }
        this.setData({
          stars: stars
        });
      }
    },
    iconSize:{
      type:String,
      value:"26rpx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    stars: DEFAULT_ITEMS
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});