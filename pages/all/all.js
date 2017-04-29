var app = getApp();

Page({
    data: {
      activity_count : 0,
    },
    onShow: function () {
        var _this = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            wx.request({
                url: app.globalData.domain + 'BDsClub/wx_get_play_history/?name=' + userInfo.nickName,
                success: function(res) {
                    _this.setData({
                        allActivity: res.data,
                        activity_count: res.data.length
                    });
                }
            });
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: '我的活动'
        });
    }
});