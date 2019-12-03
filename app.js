App({
  onLaunch: function() {
    console.log('启动小程序!!!')
  },
  baseurl: "https://www.chiphell.com",
  globalData: {
    userInfo: null
  },
  config: {
  },
  getNode(node, conditions) {
    if (conditions.id && conditions.classStr) {
      if (node.attr && node.attr.id == conditions.id && node.classStr == conditions.classStr) {
        return node;
      }
    } else if (conditions.id) {
      if (node.attr && node.attr.id == conditions.id) {
        return node;
      }
    } else if (conditions.classStr) {
      if (node.classStr == conditions.classStr) {
        return node;
      }
    } else {
      console.error("没有过滤条件，直接返回NULL");
      return null;
    }

    let result = null;

    // console.log("分析本节点");
    if (Array.isArray(node.child)) {
      // console.log("遍历展开节点");
      for (let i = 0; i < node.child.length; i++) {
        result = this.getNode(node.child[i], conditions);
        // console.log(result);
        if (result) {
          break;
        }
      }
    }
    return result;
  }
})