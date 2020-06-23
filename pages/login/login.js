// pages/login/login.js
Page({
  wxlogin: function(){
    console.log('wxlogin')
  },

  doubanlogin: function(){
    console.log('doubanlogin')
  },
  openAgreement(){
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    });
      
  }
})