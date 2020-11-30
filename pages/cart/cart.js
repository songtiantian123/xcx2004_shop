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
    isChooseGoods:false,// 当前项是否选中
    totalPrice: 0,// 价格默认是0
    goodsList: [],// 购物车列表
    goodsCount: [],// 商品总数量
    delete:true,
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
   * 接口 数据库增加库存数量
   */
  addCount:function(res){
    let _this = this;
    // let goods_id = res.currentTarget.dataset.cartid;
    let access_token = wx.getStorageSync('token');// 获取access_token
    let list = this.data.goodsList; // 当前页面的商品列表数据
    let index = res.currentTarget.dataset.index;
    let goods_id = list[index].goods_id // 获取添加数量的商品id
    list[index].goods_num++; // 商品数量+1
    wx.request({
      url:apihost + '/api/addCount',
      method: 'post',
      data:{
        access_token:access_token,
        goods_id:goods_id
      },
      success:function (e) {
        if(e.data.error==0){
          _this.setData({
            goodsList:list
          })
          wx.showToast({
            title:'添加成功',
            icon: 'success',
            duration: 2000,
          })
        }else{
          console.log('请求接口错误')
        }
      }
    })
  },
  /**
   * 接口 数据库减少库存数量
   */
  minusCount:function (res) {
    let _this = this;
    // let goods_id = res.currentTarget.dataset.cartid;
    let access_token = wx.getStorageSync('token');// 获取access_token
    let list = this.data.goodsList;// 获取当前页列表数据
    let index = res.currentTarget.dataset.index;
    let goods_id = list[index].goods_id; // 获取添加数量的商品id
    list[index].goods_num--; // 商品数量-1
    wx.request({
      url: apihost + '/api/minusCount?access_token='+access_token,
      method:'post',
      data: {
        access_token: access_token,
        goods_id: goods_id
      },
      success: function (e) {
        if(e.data.error==0){
          _this.setData({
            goodsList:list,
          })
          wx.showToast({
            title:'减少成功',
            icon:'success',
            duration:2000,
          })
        }else{
          console.log('请求接口错误');
        }
      }
    })
  },
  /**
   * 接口 数据库中统计商品数量
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
        if(e.data.error==0){
          _this.setData({
            goodsCount:e.data.data.goodsCount,
          })
        }
      }
    })
  },
  /**
   * 接口 清空购物车
   */
  deleteList:function (res) {
    let _this = this;
    let checkboxChange = [];
    let list = _this.data.goodsList;
    let access_token = wx.getStorageSync('token');// 获取access_token
    list.forEach(item=>{
      if(item.checked){
        checkboxChange.push(item.goods_id)
      }
    })
    if(checkboxChange.length>0){
      wx.showModal({
        title: '提示',
        content:'是否清空购物车?',
        success(res){
          if(res.confirm){
            console.log('清空')
          }
        }
      })
    }
    // let access_token = wx.getStorageSync('token');// 获取access_token
    // wx.request({
    //   url:apihost + '/api/deleteList',
    //   data:{
    //     access_token:access_token,
    //   },
    //   success:function (e) {
    //      console.log(e)
    //   }
    // })
  },
  /**
   * 接口 数据库中删除
   */
  delete:function(res){
    let _this = this; // 当前对象
    let checkboxChange = [];
    let list = _this.data.goodsList; // 当前页的列表数据
    let access_token = wx.getStorageSync('token');// 获取access_token
    list.forEach(item=>{
      if(item.checked){
        checkboxChange.push(item.goods_id)
      }
    })
    if(checkboxChange.length>0){
      wx.showModal({
        title: '提示',
        content:'是否删除选中的商品?',
        success(res){
          if(res.confirm){
            wx.request({
              url: apihost + '/api/delete?access_token='+access_token,
              method:'post',
              data:{
                goods:checkboxChange.toString(),
                access_token:access_token
              },
              header: {'content-type':'application/json'},
              success(res){
                console.log('删除成功')
                _this.getCartlist();
                _this.setData({
                  isSelectAll:false,
                  totalPrice:0,
                })
              }
            })
          }else if(res.cancel){
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showToast({
        title:'请选择要删除的商品',
        icon:'none',
        duration:2000,
      })
    }
  },
  /**
   * 单选
   */
  checkboxChange:function (e) {
    let goods = e.detail.value; // 获取checked中的value
    let list = this.data.goodsList; // 获取当前页的商品列表
    let total = 0; // 默认价格0
    list.forEach((item)=>{
      item.checked = false; // 自定义checked是false
      goods.forEach((item2)=>{ // 循环goods 也就是循环里面的value的值
        if(item.goods_id==item2){
          item.checked = true; // 选中的状态
          total += item.shop_price + item.goods_num; // 计算新的总价
        }
      })
    })
    let isSelectAll = list.every(function (item) {
        return item.checked;
    })
    this.setData({
      totalPrice:total,
      isselectAll:isSelectAll
    })
  }
})