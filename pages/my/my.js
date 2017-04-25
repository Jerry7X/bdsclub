var app = getApp();
Page({
    data: {
        userInfo: {},
    },
    goToList: function() {
        wx.navigateTo({
            url: '/pages/my/my-list'
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: '余额'
        });
        var _this = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            _this.setData({
                userInfo: userInfo
            });
        });
    }
});