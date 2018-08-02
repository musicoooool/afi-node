/**
 * 代码风格约定：除微信认证外的所有与数据库有关操作全部移到此处
 */

import {
    axios
} from './axios';
import state from '../store/state';

/**
 *   @database: { 微信开发 }
 *   @desc:     { 更新url阅读数 } 
 */
export const addCommonVisitCount = async url => await axios({
    url: '/5/4c908bffac.json',
    params: {
        url
    },
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 查询县级单位邮政编码 } 
 */
export const getVoteCount = async county_id => await axios({
    url: '/6/caa0249444.json',
    params: {
        county_id
    },
}).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 异常数据上报 } 
    const { err_type, err_url, err_desc, network_type, device_platform, device_user_agent, device_app_version, hook, remark, rec_time, ip } = params;
*/
export const addCommonErrorLog = async params => await axios({
    url: '/22/6768cba468.json',
    params,
}).then(res => res);

// 20W奖品/2000W人，中奖率1%;
export const doLottery = (rate = 5) => 100 * Math.random() <= rate ? 1 : 0;

/**
*   @database: { 微信开发 }
*   @desc:     { 提交反假答题数据 } 
    const { sid, nickname, openid, sex, headimgurl, county_id,  vote_detail, score, prize_id, time_used, rec_date, dom_content_loaded, loaded, net_type, os_version, wechat_version } = params;
*/
// export const addVoteMain = async params => await axios({
//     url: '/23/dbaed1fa25.json',
//     params,
// }).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 提交反假答题数据 } 
    const { sid, nickname, openid, sex, headimgurl, county_id,  vote_detail, score, prize_id, time_used, rec_date, dom_content_loaded, loaded, net_type, os_version, wechat_version } = params;
*/
export const submitPaper = async params => await axios({
        url: "/addpaper",
        params,
    }).then(res => res)
    .catch(e => {
        handleVoteErr(params);
    })

/**
 *   @database: { 微信开发 }
 *   @desc:     { 错误快照信息存储 } 
 */
const addCommonSnapshot = async detail => await axios({
    // url: '/24/ebe08b7ee9.json',
    method: "post",
    data: {
        detail,
        id: 24,
        nonce: "ebe08b7ee9",
    },
}).then(res => res);

// 提交失败时，用户将会作各种反馈，此处将本地快照上传供分析
const handleVoteErr = (params = {}) => {
    let errInfo = {
        params
    };
    // 在浏览器/NODE环境下
    if (typeof window != 'undefined') {
        let performance = localStorage.getItem(state._KEY.performance),
            weixin = localStorage.getItem(state._KEY.weixin), // 用户信息
            county = localStorage.getItem(state._KEY.county),
            paper = localStorage.getItem(state._KEY.paper),
            paperSrc = localStorage.getItem(state._KEY.paperSrc);
        if (null != performance) {
            errInfo.performance = JSON.parse(performance);
        }
        if (null != weixin) {
            errInfo.weixin = JSON.parse(weixin);
        }
        if (null != county) {
            errInfo.county = JSON.parse(county);
        }
        if (null != paper) {
            errInfo.paper = JSON.parse(paper);
        }
        if (null != paperSrc) {
            errInfo.paperSrc = JSON.parse(paperSrc);
        }
    }
    addCommonSnapshot(JSON.stringify(errInfo));
};

/**
 *   @database: { 微信开发 }
 *   @desc:     { 抽奖逻辑 } 
 */
export const getBasePrize = async() => await axios({
    url: '/25/58183377db.json'
}).then(res => res);


/**
*   @database: { 微信开发 }
*   @desc:     { 插入中奖信息 } 
    const { username, mobile, address_detail, county_id, zipcode, openid, rec_time,  nickname, headimgurl } = params;
*/
export const addVoteLuckyUser = async params => await axios({
    url: '/26/bca7eb97be.json',
    params,
}).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 编辑中奖信息 } 
    const { username, mobile, address_detail, county_id, zipcode, rec_time, openid } = params;
*/
export const setVoteLuckyUser = async params => await axios({
    url: '/27/8f89fb7168.json',
    params,
}).then(res => res);