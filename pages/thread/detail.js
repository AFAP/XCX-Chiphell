const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Dom = require('../../libs/xmldom/dom-parser.js').DOMParser
const Xpath = require('../../libs/xpath.js')
const Html2Json = require('../../libs/html2json.js');

Page({
  data: {
    scrollViewHeight: wx.getSystemInfoSync().windowHeight,
    articleId: '',
    totalPage: 1,
    richText: '',
    commentNum: 0,
    nodes: {}
  },
  onLoad: function(options) {
    let href = options.href;
    href = href.replace('article-', '');
    let articleId = href.split('-')[0];
    this.setData({
      articleId
    })
    this.getDetail(1)
  },
  getDetail(tarPage) {
    //https://www.chiphell.com/thread-2166781-1-1.html?mobile=2
    NetUtils.request(`/thread-2166781-1-1.html`, 'get', {})
      .then((data) => {
        const rootDoc = new Dom().parseFromString(data);
        let floor1 = Xpath.select1("//*[@class = 'plc cl']", rootDoc);
        // let floor1Doc = new Dom().parseFromString(ctNode.toString());
        // let doc = Html2Json.html2json(floor1.toString());
        // this.setData({
        //   nodes:doc.child[0]
        // })
        // console.log(doc)
        // let ctNode = app.getNode(floor1Doc, {
        //   id: 'ct'
        // })

        // let ctDoc = new Dom().parseFromString(ctNode.toString());
        // let contentNode = Xpath.select1("//*[@class = 'bm vw']", ctDoc)
        // let contentDoc = new Dom().parseFromString(contentNode.toString());
        // let tableNode = Xpath.select1("//*[@class = 'vwtb']", contentDoc)


        let divHtml = floor1.toString();
        divHtml = divHtml.replace(/&amp;/g, '&')
        // 处理文章图片
        divHtml = divHtml.replace(/forum.php\?mod=image&aid=[^"]*"/g, function(value, index) {
          const arr = value.split('&');
          let aid = arr[1].split('=')[1];
          let size = arr[2].split('=')[1];
          aid = aid.padStart(9, '0');
          let pp = aid.substring(0, 3) + '/' + aid.substring(3, 5) + '/' + aid.substring(5, 7) + '/' + aid.substring(7, 9);
          let size2 = size.replace('x', '_')
          const src = `https://static.chiphell.com/image/${pp}_${size2}.jpg`;
          // console.log(value);
          // console.log(aid);
          // console.log(src);
          return src + '" ';
        })
        // 处理头像
        divHtml = divHtml.replace(/https:\/\/www.chiphell.com\/uc_server\/avatar.php\?uid=[^"]*"/g, function (value, index) {
          const arr = value.split('?')[1].split('&');
          let aid = arr[0].split('=')[1];
          aid = aid.padStart(9, '0');
          let pp = aid.substring(0, 3) + '/' + aid.substring(3, 5) + '/' + aid.substring(5, 7) + '/' + aid.substring(7, 9);
          const src = `https://www.chiphell.com/uc_server/data/avatar/${pp}_avatar_small.jpg`;
          // console.log(value);
          // console.log(aid);
          // console.log(src);
          return src + '" ';
        })
        // divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"').replace(/&amp;nbsp;/g, '&nbsp;');
        divHtml = this.data.richText + divHtml;
        this.setData({
          richText: divHtml
        })
      })
  },
  gotoComent: function(event) {
    wx.navigateTo({
      url: '/pages/article/comment?articleId=' + this.data.articleId,
    })
  }
})