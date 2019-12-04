const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Html2Json = require('../../libs/html2json.js');

const Xpath = require('../../libs/xpath.js')
const Dom = require('../../libs/xmldom/dom-parser.js').DOMParser


Page({
  data: {
    href: '',
    catid: 19,
    aaa: ''
  },
  onLoad: function(options) {
    this.getDetail(1)
    // href=article-22734-1.html
  },

  onPullDownRefresh: function() {
    this.getList(1)
  },

  getDetail(tarPage) {
    NetUtils.request(`/article-22771-1.html?&forcemobile=1`, 'get', {})
      .then((data) => {

        const rootNode = new Dom().parseFromString(data)
        let ctNode = Xpath.select1("//*[@id = 'ct']", rootNode)
        let contentNode = Xpath.select1("//*[@class = 'bm vw']", ctNode)
        let tableNode = Xpath.select1("//*[@class = 'vwtb']", contentNode)

        console.log(contentNode)
        console.log(tableNode)


        let divHtml = tableNode.toString();
        divHtml = divHtml.replace(/<img/g, '<img style="width: 100%;"')


        this.setData({
          aaa: divHtml
        })

        // let doc = Html2Json.html2json(data);
        // let ctNode = app.getNode(doc, {
        //   id: 'ct'
        // })
        // console.log(ctNode)
        // let dlParentNode = app.getNode(doc, {
        //   'classStr': 'bm_c xld'
        // })
        // 获取首页数据时获取总页数信息
        // if (tarPage == 1) {
        //   let pageInfoNode = app.getNode(doc, {
        //     'classStr': 'pgs cl'
        //   })
        //   let labelNode = {};
        //   for (let i = 0; i < pageInfoNode.child[0].child.length; i++) {
        //     if (pageInfoNode.child[0].child[i].tag == 'label') {
        //       labelNode = pageInfoNode.child[0].child[i]
        //     }
        //   }
        //   let totalPageStr = labelNode.child[1].child[0].text;
        //   totalPageStr = totalPageStr.replace('/', '').replace('页', '').trim();
        //   this.setData({
        //     [totalPageProp]: Number(totalPageStr)
        //   })
        // }

      })
  },
  openDetail: function(event) {
    // console.log(event)
    let item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/article/detail?href=' + item.href,
    })
  }
})