let Mock = require('mockjs');

let data = [
    { id: 0, title: "标题1", author: "作者1", count: 32, huifu: 21 },
    { id: 1, title: "标题2", author: "作者2", count: 332, huifu: 221 },
    { id: 2, title: "标题3", author: "作者3", count: 132, huifu: 56 },
    { id: 3, title: "标题4", author: "作者4", count: 532, huifu: 241 },
]

// 获取
Mock.mock("/api/homeindex", 'get', function (config) {
    // console.log(config);
    return data;
})

// 修改
Mock.mock(/\/api\/homeindex\/edit\/\d/, 'put', function (config) {
    // console.log(config);
    let arr = config.url.split('/');
    let id = arr.pop();
    let obj = JSON.parse(config.body);
    data[id].title = obj.title;
    data[id].author = obj.author;
    data[id].count = obj.count;
    data[id].huifu = obj.huifu;
    return data;
})

// 删除
Mock.mock(/\/api\/homeindex\/del\/\d/, 'delete', function (config) {
    // console.log(config);
    let arr = config.url.split('/');
    let id = arr.pop();
    data.splice(id, 1);
})

