let {
    axios
} = require('./axios');
const wxUrl = 'http://wx.cbpc.ltd';

const signature = (url = 'http://www.cbpc.ltd/public/topic/201809/') => axios({
    baseURL: wxUrl,
    url: "signature",
    params: {
        url: url
    }
});

module.exports = {
    signature
}