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
    richText: ''
  },
  onLoad: function (options) { 
     this.setData({
       articleId: options.articleId
    })
    this.getList(1) 
  },
  getList(tarPage) {
    NetUtils.request(`/portal.php?mod=comment&id=${this.data.articleId}&idtype=aid&page=${tarPage}&forcemobile=1`, 'get', {})
      .then((data) => {
        const rootDoc = new Dom().parseFromString(data);
        let ctNode = Xpath.select1("//*[@id = 'ct']", rootDoc)
        let ctDoc = new Dom().parseFromString(ctNode.toString());
        let dlNodes = Xpath.select("//*[@class = 'ptm pbm bbda cl']", ctDoc)
        // let contentDoc = new Dom().parseFromString(contentNode.toString());
        // let tableNode = Xpath.select1("//*[@class = 'vwtb']", contentDoc)

        console.log(dlNodes)
        // console.log(tableNode)

        // if (tarPage == 1) {
        //   let pageInfoNode = Xpath.select1("//*[@class = 'ptw pbw cl']", contentNode);
        //   let pageInfoDoc = new Dom().parseFromString(pageInfoNode.toString())
        //   console.log(pageInfoDoc.toString())
        //   let totalPageStr = Xpath.select1("string(//*[local-name(.)='span']/@title)", pageInfoDoc);
        //   totalPageStr = totalPageStr.replace('共', '').replace('页', '').trim();

        //   let divHtml = tableNode.toString();
        //   divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"').replace(/&amp;nbsp;/g, '&nbsp;');
        //   this.setData({
        //     currentPage: tarPage,
        //     totalPage: Number(totalPageStr),
        //     richText: divHtml
        //   })
        // } else {
        //   let divHtml = tableNode.toString();
        //   divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"').replace(/&amp;nbsp;/g, '&nbsp;');
        //   divHtml = this.data.richText + divHtml;
        //   // let divHtml = this.data.richText + tableNode.toString().replace(/<img/g, '<img style="width: 100%;"');
        //   this.setData({
        //     currentPage: tarPage,
        //     richText: divHtml
        //   })
        // }
        
      })
  } 
})