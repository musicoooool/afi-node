let {
    axios
} = require('./axios');
const wxUrl = 'http://api.cbpc.ltd';

const signature = (url = 'http://www.cbpc.ltd/public/topic/201809/') => axios({
    baseURL: wxUrl,
    params: {
        s: "/weixin/signature",
        url
    }
});

module.exports = {
    signature
}