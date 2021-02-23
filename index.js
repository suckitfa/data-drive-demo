let filterModule = (function($) {
            let _SELECT = [{
                type: 1,
                name: "苹果",
            }];
            let _DATA = [{
                    type: 1,
                    text: "品牌",
                    content: [
                        "苹果",
                        "小米",
                        "锤子",
                        "魅族",
                        "华为",
                        "三星",
                        "OPPO",
                        "vivo",
                        "乐视",
                        "360",
                        "中兴",
                        "索尼",
                    ],
                },
                {
                    type: 2,
                    text: "尺寸",
                    content: [
                        "3.0英寸以下",
                        "3.0-3.9英寸",
                        "4.0-4.5英寸",
                        "4.6-4.9英寸",
                        "5.0-5.5英寸",
                        "6.0英寸以上",
                    ],
                },
                {
                    type: 3,
                    text: "系统",
                    content: [
                        "安卓(Android)",
                        "苹果(IOS)",
                        "微软(WindowsPhone)",
                        "无",
                        "其他",
                    ],
                },
                {
                    type: 4,
                    text: "网络",
                    content: ["联通3G", "双卡单4G", "双卡双4G", "联通4G", "电信4G", "移动4G"],
                },
            ];
            // 准备元素代操作的元素
            let $typeBox = $("#type"),
                $chooseBox = $("#choose");
            // 根据数据渲染视图
            function render() {
                let str = "";
                // 待选区
                _DATA.forEach((item) => {
                            let { type, text, content } = item;
                            str += `<li _type="${type}">
                ${text}
                ${content
                  .map(function (A) {
                    return `<a href="javascript:;">${A}</a>`;
                  })
                  .join("")}
            </li>
            `;
    });
    $typeBox.html(str);
    // 选择区域
    // 排序
    _SELECT.sort((A,B)=>{A.type - B.type});
    str = `你的选择`;
    _SELECT.forEach((item) => {
      str += `<mark >${item.name}<a _type="${item.type}" href="javascript:;">X</a></mark>`;
    });
    // html会覆盖原有的内容
    $chooseBox.html(str);
    handle();
    handleChoose();
  }
  // 待选区绑定事件
  function handle() {
    $typeBox.find("a").click(function () {
        let $this = $(this);
        let obj = {};
        obj.type = parseFloat($this.parent().attr("_type").trim());
        obj.name = $this.text().trim();
        // 存储之前看原数组只相同类型的删除（同一个类别只存储一个)
        _SELECT.forEach((item,index)=>{
            if (item.type === obj.type) {
                // 删除一项 index
                _SELECT.splice(index,1);
            }
        });
        _SELECT.push(obj);
        render();
    });
  }
  function handleChoose(){
      $chooseBox.find('a').click(function(){
        let $this = $(this),
        _type = parseFloat($this.attr("_type"));
        _SELECT.forEach((item,index)=>{
            if (_type === item.type) {
                _SELECT.splice(index,1);
            }
        });
        render();
      });
  }
  return {
    init() {
      render();
    },
  };
})(jQuery);
filterModule.init();