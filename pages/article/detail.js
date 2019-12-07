const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Dom = require('../../libs/xmldom/dom-parser.js').DOMParser
const Xpath = require('../../libs/xpath.js')

Page({
  data: {
    scrollViewHeight: wx.getSystemInfoSync().windowHeight,
    articleId: '',
    currentPage: 1,
    totalPage: 1,
    richText: '',
    commentNum: 0
  },
  onLoad: function(options) {
    let href = options.href;
    href = href.replace('article-', '');
    let articleId = href.split('-')[0];
    this.setData({
      articleId
    })
    this.getDetail(1)
    // href=article-22734-1.html
  },
  getDetail(tarPage) {
    NetUtils.request(`/article-${this.data.articleId}-${tarPage}.html?&forcemobile=1`, 'get', {})
      .then((data) => {
        const rootDoc = new Dom().parseFromString(data);

        let ctNode = Xpath.select1("//*[@id = 'ct']", rootDoc);
        let ctDoc = new Dom().parseFromString(ctNode.toString());
        let contentNode = Xpath.select1("//*[@class = 'bm vw']", ctDoc)
        let contentDoc = new Dom().parseFromString(contentNode.toString());
        let tableNode = Xpath.select1("//*[@class = 'vwtb']", contentDoc)

        if (tarPage == 1) {
          let commentNumNode = Xpath.select1("//*[@id = '_commentnum']", rootDoc);
          console.log(commentNumNode)

          let pageInfoNode = Xpath.select1("//*[@class = 'ptw pbw cl']", contentDoc);
          let pageInfoDoc = new Dom().parseFromString(pageInfoNode.toString())
          console.log(pageInfoDoc.toString())
          let totalPageStr = Xpath.select1("string(//*[local-name(.)='span']/@title)", pageInfoDoc);
          totalPageStr = totalPageStr.replace('共', '').replace('页', '').trim();

          let divHtml = tableNode.toString();
          divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"').replace(/&amp;nbsp;/g, '&nbsp;');
          let commentNum = Number(commentNumNode.childNodes[0].nodeValue);
          if (commentNum > 99) {
            commentNum = 99;
          }
          this.setData({
            commentNum,
            currentPage: tarPage,
            totalPage: Number(totalPageStr),
            richText: divHtml
          })
        } else {
          let divHtml = tableNode.toString();
          divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"').replace(/&amp;nbsp;/g, '&nbsp;');
          divHtml = this.data.richText + divHtml;
          // let divHtml = this.data.richText + tableNode.toString().replace(/<img/g, '<img style="width: 100%;"');
          this.setData({
            currentPage: tarPage,
            richText: divHtml
          })
        }
        if (tarPage < this.data.totalPage) {
          this.getDetail(tarPage + 1)
        }
      })
  },
  gotoComent: function(event) {
    wx.navigateTo({
      url: '/pages/article/comment?articleId=' + this.data.articleId,
    })
  }
})