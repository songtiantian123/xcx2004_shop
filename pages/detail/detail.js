// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      is_shoucang:0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      current:0,
      goods_info: {goods_id:217,goods_name:'AMD (AM3架构)938针 速龙X4 640 3.0G 2M 二包',shop_price:'4000',goods_number:1000,keywords:'详情'},
      goods_img:[
         {'img':'/images/rabbit.jpg'},
         {'img':'/images/timg.jpg'},
         {'img':'/images/perfume.png'},
       ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let goods_id = options.id;// 获取商品id
    let access_token = wx.getStorageSync('token');
    console.log(access_token);
    wx.request({
      url:'http://jd.2004.com/api/getDetails?goods_id='+goods_id,
      data:{
          access_token:access_token
      },
        header: {'content-type':'application/json'},
        success(res){
        _this.setData({
          goods_img:[res.data.data.res.goods_img],
          goods_info:res.data.info,
          goods_id:goods_id,
        })
      }
    })
  },
    /**
     * 加入购物车
     * @param res
     */
    addCart:function(res){
      let _this = this;
      let goods_id = res.currentTarget.dataset.goods_id;
      console.log(goods_id);
      let access_token = wx.getStorageSync('token');
      wx.request({
          url:'http://jd.2004.com/api/addCart?token='+access_token,
          method:'POST',
          dataType:'json',
          data:{
              goods_id:goods_id
          },
          header: {'content-type':'application/x-www-form-urlencoded'},
          success:function (res) {
              console.log(res);
          }
      })
      /**goods.userSelect=false;/** 如果加入购物 没有数据 则不显示加入购物车成功 **/

      wx.setStorage({
          key:'cart',
          url:'http://jd.2004.com/api/cart?goods_id='+goods_id,
          success:function(res) {
              console.log(res)
              wx.showToast({
                  title:"加入购物车成功",
                  cart:"success",
                  durantion:2000,
              })
          }

      })
     // var total=0;
     //  cart.find(function (ele) {
     //      total +=parseInt(ele.num);
     //  })
     //    _this.setData({cartNum:total});
},
  /**
   * 轮播图切换事件
   */
  swipperChange:function(res){
    let current = res.detail.current;
    this.setData({
      current:res.detail.current
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