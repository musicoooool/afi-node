let countyList = require('./data/countylist');
let db = require('./db');
let paper = require('./data/paperData');

let getRandomInt = max => Math.floor(Math.random() * max);

let getRandomStr = (length = 10) => {
    let prefixes = ['-', '_', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr[i] = prefixes[getRandomInt(prefixes.length)];
    }
    return arr.join('');
}

let getCounty = () => countyList[getRandomInt(countyList.length)]

let weChatList = '4.7,4.8,4.9,5.0,5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9,6.0,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9,7.0'.split(',');

const getRandomArr = len => {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
};



let getVoteDetail = () => {
    let questions = getRandomArr(40);
    let arr = new Array(40).fill('');
    paper = paper.map((item, id) => {
        item.id = id;
        return item;
    });
    questions.slice(0, 10).forEach(key => {
        let {
            question
        } = paper[key]
        arr[key] = getRandomInt(question.length)
    });

    let rightNum = Math.ceil(Math.random() * 10);
    return {
        vote_detail: arr.join(';'),
        vote_result: {
            right: questions.slice(0, rightNum),
            error: questions.slice(rightNum, 10)
        },
        score: rightNum * 10
    };

}

// 随机生成试卷
let getRandomPaperParams = () => {
    let openid = `oW0w1v4qftC8xUP3q-` + getRandomStr();
    let prize_id = db.doLottery();
    let time_used = getRandomInt(660);
    let dom_content_loaded = getRandomInt(10000);
    let loaded = getRandomInt(10000);
    let wechat_version = weChatList[getRandomInt(weChatList.length)];
    let phoneList = ['android', 'iphone', 'other'];
    let netList = ['2g', '3g', '4g', 'wifi', 'other'];
    let os_version = phoneList[getRandomInt(phoneList.length)];
    let net_type = netList[getRandomInt(netList.length)];
    let {
        vote_detail,
        vote_result,
        score
    } = getVoteDetail();
    let rec_date = '2018-09-' + (String(getRandomInt(30)).padStart(2, '0')) + ' ' + (String(getRandomInt(24)).padStart(2, '0')) + ':' + (String(getRandomInt(60)).padStart(2, '0')) + ':' + (String(getRandomInt(60)).padStart(2, '0'));

    return {
        "sid": "1",
        "nickname": "测试" + getRandomStr(8),
        openid,
        sex: Math.round(Math.random(), 0),
        "headimgurl": "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7RSAYiaxiaC1lOZYicWic9YZKEFJ2TKEfh3pFJibLvf7IxdLQ/0",
        county_id: getCounty(),
        vote_detail,
        vote_result,
        score,
        prize_id,
        rec_date,
        time_used,
        dom_content_loaded,
        loaded,
        wechat_version,
        os_version,
        net_type
    }
}

module.exports = getRandomPaperParams;