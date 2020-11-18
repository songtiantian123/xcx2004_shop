// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  /**
   * 获取当前用户
   */
  onGotUserInfo:function(res){
    console.log(res.detail.rawData);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    console.log(_this);
  },
  userInfo:function(res){
    wx.getUserInfo({
      lang: lang,

    })
    wx.login({

      success (res) {
        let _this = this;
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://www.weixin.com/login',
            data: {
              code: res.code

            },
            success:function(res){
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
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
     let _this = this;
     console.log(_this);
     // 判断是否登录
    let CuserInfo = wx.getStorageSync('CuserInfo');
    Info = CuserInfo
    if(CuserInfo.token){
      // 获取照片和用户名
      let photo = 'http://testbbcimage.leimingtech.com\' + CuserInfo.avatar_url';
      let name= CuserInfo.loginname;
      let user = {}
      user.avatarUrl = photo;
      user.nickName = name;
      _this.setData({userInfo:user})
    }else{
      //调用应用实例的方法获取全局数据
      wx.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
    }
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