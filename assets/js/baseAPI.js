$.ajaxPrefilter(function (option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.token || ''
        }
    }
    option.complete = function (res) {
        if (res.responseJSON.message === '身份认证失败！' && res.responseJSON.status === 1) {
            location.href = './login.html';
            localStorage.removeItem('token')
        }
    }
})