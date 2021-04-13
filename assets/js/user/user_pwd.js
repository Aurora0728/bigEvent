const form = layui.form;
const layer = layui.layer;
$(function () {
    // 验证密码
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!'
            }
        },
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与原密码一致!'
            }
        }
    })
    // 更新密码
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(".layui-form").serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("密码更新失败")
                }
                console.log(res);
                layer.msg(res.message)
                $(".layui-form")[0].reset()
            }
        })
    })
})