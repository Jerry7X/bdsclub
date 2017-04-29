var app = getApp();

Page({
    data: {
        dt: 0,
        ct: 0,
    },
    onShow: function () {
        var _this = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            wx.request({
                url: app.globalData.domain + 'BDsClub/wx_get_fee_history/?name=' + userInfo.nickName,
                success: function(res) {
                    _this.setData({
                        allfee: res.data.feelist,
                        dt: res.data.dt,
                        ct: -res.data.ct
                    });
                }
            });
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: '我的消费'
        });
    }
});