//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    "bnrUrl":[{
      "url":"/images/discount-banner.jpg"
    },{
      "url":"/images/draw-banner.jpg"
    },{
      "url":"/images/nursing-banner.jpg"
    }],
    list:['全部','猫粮','玩具','保健','零食'],
    person:{
      name:"小黑",
      age:18,
    }
    // motto: 'Hello World',
    // name:'张三',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 点击登录
  btnLogin:function(res){
    // console.log(11);
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://jd.2004.com/wx/xcxlogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this = this;
    // 发起网络请求
    wx.request({
      url: 'http://jd.2004.com/wx/details',
      success (res) {
        _this.setData({
          goods:res.data
        })
      }
    })


    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      name1:'zhangsan111'
    })
  }
})
