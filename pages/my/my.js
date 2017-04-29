var app = getApp();
Page({
    data: {
        userInfo: {},
        amount: 0,
        play: {
            id: 0,
            duration: '2017.4.29 9-11',
            place: '金羽',
            players: '',
            state: false
        },
    },
    goToList: function () {
        wx.navigateTo({
            url: '/pages/my/my-list'
        });
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '余额'
        });
    },

    loadData: function() {
        var _this = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            wx.request({
                url: app.globalData.domain + 'BDsClub/get_yue/?name=' + userInfo.nickName,
                success: function (res) {
                    _this.setData({
                        userInfo: userInfo,
                        amount: res.data.amount
                    });
                    console.log(res.data.amount);
                },
                fail: function () {
                    console.log('获余额失败');
                },
            });

            wx.request({
                url: app.globalData.domain + 'BDsClub/wx_get_curplay',
                success: function (res) {
                    _this.setData({
                        play: res.data
                    });
                    console.log('获取数据失败');
                },
            });

        });
    },

    onShow: function () {
        this.loadData();
    },

    formSubmit: function (e) {
        var _this = this;
        //var uinfo = _this.getData(userInfo);
        //console.log(uinfo.nickName + '报名');
        app.getUserInfo(function (userInfo) {
            wx.request({
                url: app.globalData.domain + 'BDsClub/wx_apply/?name=' + userInfo.nickName,
                //url: app.globalData.domain + 'BDsClub/get_yue/',
                //data: 'name=' + userInfo.nickName,
                success: function (res) {
                    if (res.data.result == 0) {
                        wx.showToast({
                            title: '报名成功',
                            icon: 'success',
                            duration: 2000,
                            complete: _this.loadData
                        });
                    } 
                    
                    if (res.data.result == 1) {
                        wx.showToast({
                            title: '取消成功',
                            icon: 'success',
                            duration: 2000,
                            complete: _this.loadData
                        });
                    } 

                    if (res.data.result < 0 ) {
                        wx.showToast({
                            title: '操作失败',
                            icon: 'loading',
                            duration: 2000
                        });
                    }
                    console.log(userInfo.nickName + '报名成功');
                },
                fail: function () {
                    console.log('报名失败');
                    wx.showToast({
                        title: '报名失败',
                        icon: 'loading',
                        duration: 2000
                    });
                },
            });
            
        });

    }
});