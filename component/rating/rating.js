// component/rating/rating.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    average:{
      type:Number,
      value:0
    },
    score:{
      type:Number,
      value:0
    },
    rating:{
      type:Array,
      value:[0,0,0,0,0],
      observer: function(new_val, old_val, path) {
        console.log(new_val)
        let sum = 0
        for (let index = 0; index < new_val.length; index++) {
          sum += new_val[index];
        }
       let percent =  new_val.map((item) => {
        return (Math.round(item / sum * 10000) / 100.00)
        })
        this.setData({sum,percent})
      }
    },
    width:{
      type:Number,
      value:0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    percent:[],
    sum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
