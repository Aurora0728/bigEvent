$(function () {
    getUserInfo()
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            // 可以直接写localStorage.token,localStorage是对象
            // Authorization: localStorage.getItem('token'),
            // Authorization: localStorage.token || ''
        },
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            renderAvatar(res.data)
        },
        // complete(res) {
        //     if (res.responseJSON.message ==='身份认证失败！' && res.responseJSON.status === 1) {
        //         location.href = './login.html';
        //         localStorage.removeItem('token')
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(data) {
    const name = data.nickname || data.username
    $('#welcome').html(`欢迎 !  ${name}`)
    if (data.user_pic !== null) {
        $(".userinfo img").attr('src', data.user_pic).show()
        $(".text-avatar").hide()
    } else {
        const firstChar = name[0].toUpperCase()
        $(".text-avatar").html(firstChar).show();
        $(".userinfo img").hide()
    }
}
// 退出登录
$('#btnLogout').on('click', function () {
    layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        // console.log(11);
        location.href = './login.html'
        localStorage.removeItem('token')
        layer.close(index);
    });
})