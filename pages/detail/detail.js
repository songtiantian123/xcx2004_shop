// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     is_shoucang:0,
     goods_info: {goods_id:217,goods_name:'AMD (AM3架构)938针 速龙X4 640 3.0G 2M 二包',shop_price:'4000',goods_number:1000,keywords:'详情'},
     goods_img:[
       {'img':'https://img.alicdn.com/imgextra/i2/2206434878500/O1CN01FrVvMm2Cf3BNGIjSd_!!2206434878500.jpg_430x430q90.jpg'},
       {'img':'https://img.alicdn.com/imgextra/i2/2206434878500/O1CN01FrVvMm2Cf3BNGIjSd_!!2206434878500.jpg_430x430q90.jpg'},
       {'img':'https://img.alicdn.com/imgextra/i2/2206434878500/O1CN01FrVvMm2Cf3BNGIjSd_!!2206434878500.jpg_430x430q90.jpg'},
     ],
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imglist// 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let _this = this;
     // 转json
    let goods_id = options.id;
    wx.request({
      url:'http://jd.2004.com/api/getDetails?goods_id='+goods_id,
      success(res){
        _this.setData({
          goods_info:res.data.res,
          goods_id:goods_id
        })
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