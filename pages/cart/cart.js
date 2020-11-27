// pages/cart/cart.js
const app = getApp()
const apihost = app.globalData.apiUrl;
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,// 是否全选 默认全不选
    selectAll:false, // 默认全不选
    totalPrice: 0,// 价格默认是0
    goodsList: [],// 购物车列表
    goodsCount: 2,// 商品总数量
    num: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartlist();// 获取购物车列表
    this.goodsCount();
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
    wx.showToast({
      title:'加载中',
      icon:"loading",
      duration:1000
    })
    this.totalPrice();
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
  selectAll:function (e) {
    let _this = this;
    let isSelectAll = !_this.data.isSelectAll; // 取反
    let list = _this.data.goodsList;// 数据
    let total = 0;// 价格默认是0
    list.forEach((item)=>{
      if(isSelectAll){
        item.checked = true; // 全选
        total += item.goods_num * item.shop_price // 计算价格
      }else{
        item.checked = false; // 不全选
      }
      this.setData({
        goodsList:list,
        isSelectAll:isSelectAll,
        totalPrice:total
      });
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
  },
  /**
   * 统计商品数量
   */
  goodsCount:function (res) {
    let _this = this;
    let goods_id = res.currentTarget.dataset.cartid;
    let access_token = wx.getStorageSync('token');// 获取access_token
    wx.request({
      url: apihost + '/api/goodsCount?token=' + access_token,
      data: {
        access_token: access_token,
        goods_id: goods_id
      },
      success: function (e) {
        console.log(e);
        if(e.data.error==0){
          _this.setData({
            goodsCount:e.data.goodsCount
          })
        }
      }
    })
  },
  /**
   * 删除
   */
  deleteList:function (res) {
    console.log("删除");
  },
  /**
   * 跳转详情页
   */
  CartDetail:function () {
    wx.switchTab({
      url: '/pages/detail/detail',
    })
  },
})