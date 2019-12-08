const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Dom = require('../../libs/xmldom/dom-parser.js').DOMParser
const Xpath = require('../../libs/xpath.js')

Page({
  data: {
    articleId: '',
    loading: false,
    pageIndex: 1,
    totalPage: 0,
    list: []
  },
  onLoad: function(options) {
    this.setData({
      articleId: options.articleId
    })
    this.getList(1)
  },
  onPullDownRefresh: function() {
    this.getList(1)
  },
  onReachBottom: function(event) {
    let pageIndex = this.data.pageIndex;
    let totalPage = this.data.totalPage;
    if (pageIndex < totalPage) {
      this.getList(pageIndex + 1)
    } else {
      console.log('没有更多数据了');
    }
  },
  getList(tarPage) {
    this.setData({
      loading: true
    })
    NetUtils.request(`/portal.php?mod=comment&id=${this.data.articleId}&idtype=aid&page=${tarPage}&forcemobile=1`, 'get', {})
      .then((data) => {
        wx.stopPullDownRefresh();
        this.setData({
          loading: false
        })
        const rootDoc = new Dom().parseFromString(data);
        let ctNode = Xpath.select1("//*[@id = 'ct']", rootDoc)
        let ctDoc = new Dom().parseFromString(ctNode.toString());
        let dlNodes = Xpath.select("//*[@class = 'ptm pbm bbda cl']", ctDoc)

        console.log(dlNodes)

        let list = [];
        if (tarPage == 1) {
          let pageInfoNode = Xpath.select1("//*[@class = 'pg']", rootDoc);
          let pageInfoDoc = new Dom().parseFromString(pageInfoNode.toString())
          let totalPageStr = Xpath.select1("string(//*[local-name(.)='span']/@title)", pageInfoDoc);
          totalPageStr = totalPageStr.replace('共', '').replace('页', '').trim();
          this.setData({
            totalPage: Number(totalPageStr)
          })
        } else {
          list = this.data.list;
        }
        dlNodes.forEach(element => {
          let nickname = element.childNodes[1].childNodes[3].childNodes[0].nodeValue;
          let time = element.childNodes[1].childNodes[5].childNodes[0].nodeValue;
          let content = element.childNodes[3].toString();
          list.push({
            nickname: nickname,
            time: time,
            content: content
          })
        })
        this.setData({
          pageIndex: tarPage,
          list
        })
      })
      .catch(res => {
        wx.stopPullDownRefresh();
        this.setData({
          loading: false
        })
      })
  }
})