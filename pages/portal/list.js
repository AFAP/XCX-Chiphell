const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Html2Json = require('../../libs/html2json.js');

const allModuleInfo = {
  '评测': [{
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
  ],
  '电脑': [{
      name: '配件开箱',
      catid: 98,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '整机搭建',
      catid: 99,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '升级改造',
      catid: 100,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '桌面书房',
      catid: 101,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '掌设': [{
      name: '智能手机',
      catid: 40,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '智能穿戴',
      catid: 89,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '笔电平板',
      catid: 41,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '周边附件',
      catid: 92,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '摄影': [{
      name: '微单卡片',
      catid: 52,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '单反单电',
      catid: 51,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '经典旁轴',
      catid: 53,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '怀旧菲林',
      catid: 54,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '影音摄像',
      catid: 57,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '周边附件',
      catid: 55,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '照片': [{
      name: '人物肖像',
      catid: 102,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '风景游记',
      catid: 103,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '微距静物',
      catid: 104,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '人文扫街',
      catid: 105,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '动物植物',
      catid: 106,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '其它作品',
      catid: 107,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '汽车': [{
      name: '买菜车',
      catid: 58,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '商务车',
      catid: 59,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '性能车',
      catid: 63,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '旅行车',
      catid: 60,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: 'SUV',
      catid: 61,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: 'MPV',
      catid: 95,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '摩托轻骑',
      catid: 65,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '改装配件',
      catid: 96,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: 'CHH Auto Club',
      catid: 138,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '单车': [{
      name: '山地车',
      catid: 108,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '公路车',
      catid: 109,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '折叠车',
      catid: 110,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '休旅车',
      catid: 111,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '模型': [{
      name: '人偶手办',
      catid: 112,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '比例成品',
      catid: 113,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '拼装自组',
      catid: 114,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: 'RC遥控',
      catid: 115,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '败家': [{
      name: '收藏爱好',
      catid: 47,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '品质生活',
      catid: 45,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '数码前沿',
      catid: 46,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '小资情调',
      catid: 44,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '女王最大',
      catid: 48,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '吃喝玩乐',
      catid: 49,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '育儿分享',
      catid: 87,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '时尚': [{
      name: '鞋类',
      catid: 122,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '服饰',
      catid: 123,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '箱包',
      catid: 124,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '腕表': [{
      name: '机械表',
      catid: 128,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '电子表',
      catid: 126,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '视听': [{
      name: '耳机耳放',
      catid: 71,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '音箱功放',
      catid: 72,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '解码转盘',
      catid: 73,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '随身设备',
      catid: 74,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '唱片录音',
      catid: 75,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],
  '美食': [{
      name: '当地美食',
      catid: 68,
      pageIndex: 1,
      totalPage: 1,
      list: []
    },
    {
      name: '世界美食',
      catid: 117,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '私房菜品',
      catid: 69,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '美食器材',
      catid: 70,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '',
      catid: 0,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '',
      catid: 0,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '',
      catid: 0,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }, {
      name: '',
      catid: 0,
      pageIndex: 1,
      totalPage: 1,
      list: []
    }
  ],

  '家居': [{
    name: '家居',
    catid: 132,
    pageIndex: 1,
    totalPage: 1,
    list: []
  }],

  '活宠': [{
    name: '活宠',
    catid: 133,
    pageIndex: 1,
    totalPage: 1,
    list: []
  }]
};


Page({
  data: {
    actionSheetShow: false,
    sheetAction:'评测',
    sheetActions: [{
        name: '评测'
      },
      {
        name: '电脑'
      },
      {
        name: '掌设'
      },
      {
        name: '摄影'
      },
      {
        name: '照片'
      },
      {
        name: '汽车'
      },
      {
        name: '单车'
      },
      {
        name: '模型'
      },
      {
        name: '败家'
      },
      {
        name: '时尚'
      },
      {
        name: '腕表'
      },
      {
        name: '视听'
      },
      {
        name: '美食'
      },
      {
        name: '家居'
      },
      {
        name: '活宠'
      }
    ],
    tabIndex: 1,
    categorys: []
  },
  onLoad: function() {
    this.setData({
      categorys: allModuleInfo['评测']
    })
    this.getList(1)
  },
  onClickDisabled: function(event) {
    console.log(event)
    this.setData({
      actionSheetShow: true
    })
  },
  onActionSheetClose: function() {
    this.setData({
      actionSheetShow: false
    })
    this.getList(1)
  },
  onActionSheetSelect: function(event) {
    console.log(event)
    let categorys = allModuleInfo[event.detail.name];
    this.setData({
      actionSheetShow: false,
      sheetAction: event.detail.name,
      tabIndex: 1,
      categorys
    })
    this.getList(1)
  },
  onTabChange: function(event) {
    console.log(event)
    this.setData({
      tabIndex: event.detail.name
    });
    let orgList = this.data.categorys[this.data.tabIndex - 1].list;
    if (orgList.length == 0) {
      this.getList(1)
    }
  },
  onPullDownRefresh: function() {
    this.getList(1)
  },
  onReachBottom: function(event) {
    let pageIndex = this.data.categorys[this.data.tabIndex - 1].pageIndex;
    let totalPage = this.data.categorys[this.data.tabIndex - 1].totalPage;
    if (pageIndex < totalPage) {
      this.getList(pageIndex + 1)
    } else {
      console.log('没有更多数据了');
    }
  },
  getList(tarPage) {
    let catid = this.data.categorys[this.data.tabIndex - 1].catid;
    let orgList = this.data.categorys[this.data.tabIndex - 1].list;
    let pageIndexProp = `categorys[${this.data.tabIndex - 1}].pageIndex`;
    let totalPageProp = `categorys[${this.data.tabIndex - 1}].totalPage`;
    let listProp = `categorys[${this.data.tabIndex - 1}].list`;

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
          console.log(pageInfoNode)
          if (pageInfoNode) {
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
        }
        if (!dlParentNode.child) {
          console.log('没有更多数据');
          return;
        }
        let dlNodes = dlParentNode.child.filter(element => {
          return element.node == "element"
        })
        console.log(dlNodes);
        let list = [];
        if (tarPage != 1) {
          list = [...orgList];
        }

        dlNodes.forEach(element => {
          try {
            let obj = {
              title: element.child[1].child[0].child[0].text,
              href: element.child[3].child[1].child[0].attr.href,
              description: element.child[3].child[2].text,
              imgurl: element.child[3].child[1].child[0].child[0].attr.src,
              time: element.child[5].child[1].child[0].text
            };
            list.push(obj);
          } catch (e) {
            console.log(e)
          }
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
    console.log(item.href)
    if (this.data.sheetAction == '评测'){
      wx.navigateTo({
        url: '/pages/article/detail?href=' + item.href,
      })
    }else{
      wx.navigateTo({
        url: '/pages/thread/detail?href=' + item.href,
      })
    }
   
  }
})