// pages/cart/cart.js
const app = getApp()
const apihost = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll:false,
    totalPrice:0,// 默认是0
    goodsList:[],// 购物车列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取购物车列表
    this.getCartlist();
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

  },
  /**
   * 获取购物车列表数据
   */
  getCartlist:function () {
      // console.log(1111);
    let access_token = wx.getStorageSync('token');// 获取access_token
      let _this = this;
      wx.request({
        url:apihost + '/api/cart-list?token='+access_token,
        data:{
          access_token:access_token
        },
        success:function (e) {
          if(e.data.error==0){
            _this.setData({
              goodsList:e.data.data.list
            })
          }else{
            console.log("接口请求错误");
          }
        }
      })
  },
  /**
   * 全选或全不选
   */
  selectAll:function () {
     let _this = this;
     let isSelectAll = !_this.data.isSelectAll;
     // 全选
    if(isSelectAll){
      console.log("全选");
    }else{
      console.log("全部不选");
    }
    _this.setData({
      isSelectAll:isSelectAll,
    })
  },
  /**
   * 增加库存数量
   */
  addCount:function(res){
    let goods_id = res.currentTarget.dataset.cartid;
    let access_token = wx.getStorageSync('token');// 获取access_token
    wx.request({
      url:apihost + '/api/addCount?token='+access_token,
      data:{
        access_token:access_token,
        goods_id:goods_id
      },
      success:function (e) {
        console.log("接口成功")
      }
    })
  },
  /**
   * 减少库存数量
   */
  minusCount:function (res) {
    let goods_id = res.currentTarget.dataset.cartid;
    let access_token = wx.getStorageSync('token');// 获取access_token
    wx.request({
      url: apihost + '/api/minusCount?token=' + access_token,
      data: {
        access_token: access_token,
        goods_id: goods_id
      },
      success: function (e) {
        console.log("接口成功")
      }
    })
  }
})