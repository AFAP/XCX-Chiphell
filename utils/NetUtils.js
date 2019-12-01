var app = getApp();

function request(url, method, params, header = {
    'content-type': 'application/json'
}, dataType = "json") {
    if (wx.getStorageSync('token') != undefined && wx.getStorageSync('token') != "") {
        header['token'] = wx.getStorageSync('token');
    }

    const promise = new Promise(function(resolve, reject) {
        wx.request({
            url: app.baseurl + url,
            data: params,
            header: header,
            method: method,
            dataType: dataType,
            success: function(res) {
                wx.hideLoading();
                // console.log(res)
                // console.log('进入成功拦截器')
                // 全局拦截403，登录失效
                if (res.statusCode === 403) {
                    wx.reLaunch({
                        url: '/pages/auth/index',
                    })
                    return;
                }
                if (res.data && res.data.code === 401) {
                    wx.showModal({
                        title: '提示',
                        content: '该功能需要您授权以获取用户信息',
                        confirmText: "去授权",
                        success: function() {
                            wx.navigateTo({
                                url: '/pages/auth/bindUserInfo',
                            })
                        }
                    })
                    return;
                }
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            },
            fail: function(res) {
                wx.hideLoading();
                console.log('进入失败拦截器')
                reject(res);
            },
            complete: function(res) {},
        })
    });

    return promise;
}

module.exports = {
    request: request
}