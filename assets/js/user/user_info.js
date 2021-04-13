const form = layui.form
$(function () {
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度需要在1-6之间'
            }
        }
    })
    initUserInfo()
    resetInfo()
    updateUserInfo()
})
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers
        success(res) {
            if (res.status !== 0) {
                return layui.msg('获取用户信息失败！')
            }
            // console.log(res);
            form.val('formUserInfo', res.data)
        }
    })
}
function resetInfo() {
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
}
function updateUserInfo() {
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success(res){
                if (res.status !== 0) {
                    return layui.layer.msg('更改失败!')
                }
                console.log(res);
                layui.layer.msg('资料更新成功!')
                window.parent.getUserInfo()
            }
        })
    })
}