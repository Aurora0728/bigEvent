
$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
})

const form = layui.form;
const layer = layui.layer;
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
        const pwd = $(".reg-box [name=password]").val()
        if (pwd != value) {
            return '两次密码不一致'
        }
    }
})
// 注册
$("#regForm").on('submit', function (e) {
    e.preventDefault();
    const username = $('#regForm [name=username]').val()
    const pwd = $('#regForm [name=password]').val()
    console.log(username, pwd);
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
            username: username,
            password: pwd,
        },
        success(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录');
            $('#link_login').click()
        }
    })
})
// 登录
$("#loginForm").on('submit', function (e) {
    e.preventDefault();
    const data = $("#loginForm").serialize()
    // console.log(data);
    $.ajax({
        method: 'POST',
        url: '/api/login',
        data: data,
        success(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败!')
            }
            console.log(res);
            localStorage.setItem('token', res.token)
            location.href = './index.html'
        }
    }) 
})