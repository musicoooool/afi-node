const state = {
    isLoading: false,
    userInfo: {

    },
    addInfo: {
        county_id: '',
        zipcode: ''
    },
    sport: {
        id: 1,
        isLogin: true,
        name: "2018人民币反假货币有奖答题",
        loadWXInfo: true,
        startDate: "20180901",
        endDate: "20180930",
        timeLength: 500, //每题持续时长,设为0时不显示进度条
        questionNum: 10, //共选择题目数
        scoreDoLottery: 80, //多少分以上抽奖
    },
    cdnUrl: 'https://api.cbpc.ltd/',
    wxUrl: 'https://api.cbpc.ltd',
    sportUrl: 'https://www.cbpc.ltd/public/topic/201809/',
    _KEY: {
        weixin: 'wx_userinfo', //微信身份信息
        county: 'user_county', //县级位置
        performance: '_performance', //系统加载性能分析
        paper: 'paper', //当前答题进度信息
        paperSrc: 'paperSrc', //40道题目中的抽中顺序
        time_used: 'time_used', //活动耗时
        prize: 'prize', //奖品等级0为不中奖
        lottery_address: "lottery_address", //中奖信息
        zipcode: 'user_zipcode', //邮编
        addrSaved: 'addrSaved', // 抽奖地址是否存储
    }
}

module.exports = state