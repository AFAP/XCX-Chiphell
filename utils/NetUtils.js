var app = getApp();

function request(url, method, params, header = {
  'content-type': 'application/json'
}, dataType = "json") {

  // header['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36";

  // if (wx.getStorageSync('token') != undefined && wx.getStorageSync('token') != "") {
  //   header['token'] = wx.getStorageSync('token');
  // }

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
        // if (res.statusCode === 403) {
        //   wx.reLaunch({
        //     url: '/pages/auth/index',
        //   })
        //   return;
        // }
        if (res.statusCode === 200) {
          let data = res.data;
          data = data.replace('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">', '')
          data = data.replace('<?xml version="1.0" encoding="utf-8"?>', '')
          data = data.replace('<!DOCTYPE html>', '')
          resolve(data.trim());
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