const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Html2Json = require('../../libs/html2json.js');

Page({
  data: {
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
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      },
      {
        name: '',
        catid: 0,
        pageIndex: 1,
        totalPage: 1,
        list: []
      }
    ]
  },
  onLoad: function() {
    this.getList(1)
  },
  onTanChange: function(event) {
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