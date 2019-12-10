const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Html2Json = require('../../libs/html2json.js');

Page({
  data: {
    modules: [
      { text: '评测', value: '评测' },
      { text: '电脑', value: '电脑' },
      { text: '掌设', value: '掌设' },
      { text: '摄影', value: '摄影' },
      { text: '照片', value: '照片' },
      { text: '汽车', value: '汽车' },
      { text: '单车', value: '单车' },
      { text: '模型', value: '模型' },
      { text: '败家', value: '败家' },
      { text: '时尚', value: '时尚' },
      { text: '腕表', value: '腕表' },
      { text: '视听', value: '视听' },
      { text: '美食', value: '美食' },
      { text: '家居', value: '家居' },
      { text: '活宠', value: '活宠' }
    ],
    tabIndex: 0,
    catid: 19,
    categorys: [{
        name: '笔记本',
        catid: 19,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '机箱',
        catid: 11,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '处理器',
        catid: 13,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '散热器',
        catid: 14,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '主板',
        catid: 15,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '内存',
        catid: 137,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '外设',
        catid: 18,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '电源',
        catid: 35,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '存储',
        catid: 23,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '显示设备',
        catid: 21,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '台式机',
        catid: 88,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '显卡',
        catid: 10,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '相机',
        catid: 116,
        pageIndex: 1,
        totalPage: 1,
        list: []
      }
    ]
  },
  onLoad: function() {
    this.getList(1)
  },
  onModuleChange: function (event){
    console.log(event)
  },
  onTabChange: function(event) {
    console.log(event)
    this.setData({
      tabIndex: event.detail.name
    });
    let orgList = this.data.categorys[this.data.tabIndex].list;
    if (orgList.length == 0) {
      this.getList(1)
    }
  },
  onPullDownRefresh: function() {
    this.getList(1)
  },
  onReachBottom: function(event) {
    let pageIndex = this.data.categorys[this.data.tabIndex].pageIndex;
    let totalPage = this.data.categorys[this.data.tabIndex].totalPage;
    if (pageIndex < totalPage) {
      this.getList(pageIndex + 1)
    } else {
      console.log('没有更多数据了');
    }
  },
  getList(tarPage) {
    let catid = this.data.categorys[this.data.tabIndex].catid;
    let orgList = this.data.categorys[this.data.tabIndex].list;
    let pageIndexProp = `categorys[${this.data.tabIndex}].pageIndex`;
    let totalPageProp = `categorys[${this.data.tabIndex}].totalPage`;
    let listProp = `categorys[${this.data.tabIndex}].list`;

    NetUtils.request(`/portal.php?mod=list&catid=${catid}&page=${tarPage}&&forcemobile=1`, 'get', {})
      .then((data) => {
        let doc = Html2Json.html2json(data);
        let ctNode = app.getNode(doc, {
          id: 'ct'
        })
        let dlParentNode = app.getNode(doc, {
          'classStr': 'bm_c xld'
        })
        // 获取首页数据时获取总页数信息
        if (tarPage == 1) {
          let pageInfoNode = app.getNode(doc, {
            'classStr': 'pgs cl'
          })
          let labelNode = {};
          for (let i = 0; i < pageInfoNode.child[0].child.length; i++) {
            if (pageInfoNode.child[0].child[i].tag == 'label') {
              labelNode = pageInfoNode.child[0].child[i]
            }
          }
          let totalPageStr = labelNode.child[1].child[0].text;
          totalPageStr = totalPageStr.replace('/', '').replace('页', '').trim();
          this.setData({
            [totalPageProp]: Number(totalPageStr)
          })
        }
        if (!dlParentNode.child) {
          console.log('没有更多数据');
          return;
        }
        let dlNodes = dlParentNode.child.filter(element => {
          return element.node == "element"
        })
        // console.log(dlNodes);
        let list = [];
        if (tarPage != 1) {
          list = [...orgList];
        }

        dlNodes.forEach(element => {
          let obj = {
            title: element.child[1].child[0].child[0].text,
            href: element.child[3].child[1].child[0].attr.href,
            description: element.child[3].child[2].text,
            imgurl: element.child[3].child[1].child[0].child[0].attr.src,
            time: element.child[5].child[1].child[0].text
          };
          list.push(obj);
        });
        this.setData({
          [pageIndexProp]: tarPage,
          [listProp]: list
        })
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