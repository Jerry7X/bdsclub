var app = getApp();
Page({
    data: {
        userInfo: {},
        amount : 0,
        play:{
            id: 10,
            duration: '2017.4.29 9-11',
            place: '金羽',
        },
        players: '张三 赵四 张三 赵四 \n 张三 赵四 张三 赵四 张三 \n 赵四 张三 赵四',
        applyStatus: true,
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
            /*
            _this.setData({
                userInfo: userInfo,
                //amount: 100,
                //amount: amount,
                //players: players,
                //play: play
            });
            */
            wx.request({
                url: app.globalData.domain + 'BDsClub/get_yue/?name=' + userInfo.nickName,
                //url: app.globalData.domain + 'BDsClub/get_yue/',
                //data: 'name=' + userInfo.nickName,
                success: function(res) {
                    _this.setData({
                        userInfo: userInfo,
                        amount: res.data.amount
                    });
                    console.log(res.data.amount);
                },
                fail: function() {
                    _this.setData({
                        amount: 加载失败
                    });
                },
            });
        });
        /*
        _this.setData({
            amount: 100,
        });
        */
        
        //https://www.free-link.cn/BDsClub/get_yue/?name=xierui
    }
});