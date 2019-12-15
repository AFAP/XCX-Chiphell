const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Dom = require('../../libs/xmldom/dom-parser.js').DOMParser
const Xpath = require('../../libs/xpath.js')

Page({
  data: {
    scrollViewHeight: wx.getSystemInfoSync().windowHeight,
    articleId: '',
    totalPage: 1,
    richText: '',
    commentNum: 0
  },
  onLoad: function (options) {
    let href = options.href;
    href = href.replace('article-', '');
    let articleId = href.split('-')[0];
    this.setData({
      articleId
    })
    this.getDetail(1)
  },
  getDetail(tarPage) {
    NetUtils.request(`/article-${this.data.articleId}-${tarPage}.html?&forcemobile=1`, 'get', {})
      .then((data) => {
        const rootDoc = new Dom().parseFromString(data);

        let floor1 = Xpath.select1("//*[@class = 'plc cl']", rootDoc);
        // let ctDoc = new Dom().parseFromString(ctNode.toString());
        // let contentNode = Xpath.select1("//*[@class = 'bm vw']", ctDoc)
        // let contentDoc = new Dom().parseFromString(contentNode.toString());
        // let tableNode = Xpath.select1("//*[@class = 'vwtb']", contentDoc)

         
        let divHtml = floor1.toString();
        divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"').replace(/&amp;nbsp;/g, '&nbsp;').replace(/src=\"/g,'src="https://static.chiphell.com/');
          divHtml = this.data.richText + divHtml; 
          this.setData({
            richText: divHtml
          }) 
      })
  },
  gotoComent: function (event) {
    wx.navigateTo({
      url: '/pages/article/comment?articleId=' + this.data.articleId,
    })
  }
})