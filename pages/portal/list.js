const app = getApp()
const NetUtils = require('../../utils/NetUtils.js');
const Html2Json = require('../../libs/html2json.js');


Page({
  data: {
    catid: 19,
    pageIndex: 1
  },
  onLoad: function() {
    this.getList(1)

  },
  getList(tarPage) {

    NetUtils.request(`/portal.php?mod=list&catid=${this.data.catid}&page=${tarPage}&&forcemobile=1`, 'get', {})
      .then((data) => {
        console.log(data)
        let doc = Html2Json.html2json(data);
        console.log(JSON.stringify(doc))

        let ctNode = this.getNode(doc)


      })
      .catch((res) => {})


  },
  getNode(node) {
    if (node.attr && node.attr.id == 'ct') {
      console.log("Bingo!！！！！！！！！！！！！！！！！！！！！！！！！！!");
      return node;
    }
    console.log("分析本节点");
    if (Array.isArray(node.child)) {
      console.log("遍历展开节点");
      for (let i = 0; i < node.child.length; i++) {
       let aaa =  this.getNode(node.child[i])
        console.log(aaa);
      }
    }


    return null;



  }
})