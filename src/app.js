let wx = require('./util/weixin');
let db = require('./util/db');
let getParams = require('./util/paper');

const url = 'http://www.cbpc.ltd/public/topic/201809/';

let doExam = async() => {
    // 此处缺少获取用户微信身份信息接口

    // 1.微信签名
    let signature = await wx.signature(url);
    // 2.记录链接值
    let readNum = await db.addCommonVisitCount(url);

    // 获取投票数据
    let params = getParams();

    // 3.投票
    let voteInfo = await db.submitPaper(params);

    // 中奖信息在voteIno中，无需加载
    // 中奖用户需要增加一次添加中奖信息的逻辑，此机率为1/100，可忽略

    // 后续为数据地图、数据报告相关接口，尚未完工。
    console.log({
        signature,
        readNum,
        params,
        voteInfo
    })
}


// 模拟单用户发送数据
const MAX_USERS = 1;
const init = () => {
    for (let i = 0; i < MAX_USERS; i++) {
        console.log('开始提交第' + i + '份试卷');
        doExam().catch(e => {
            // 报错退出所有请求
            console.log(e);
            i = MAX_USERS;
        })
    }
}

init();