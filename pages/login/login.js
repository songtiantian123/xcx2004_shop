// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 点击登录
   */
  login:function(e){
    // 获取用户信息
    let userinfo = e.detail.userInfo;
    // console.log(userinfo);
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://jd.2004.com/wx/xcxlogin?code='+ res.code,
            method:'post',
            header:{'content-type':'application/json'},
            data: {
              u:userinfo,
            },
            success:function(res){
                console.log("获取token:"+res.data.data.token);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})