function initCate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            const cateStr = template('tpl-cate', res)
            $('[name=cate_id]').html(cateStr)
            layui.form.render()
        }
    })
}
initCate()
// 初始化富文本编辑器
initEditor()
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

// 选择封面弹出选择文件
$("#chooseImg").on('click', function () {
    $("#file").click();
})
$("#file").on("change", function (e) {
    const filelist = e.target.files
    if (filelist.length === 0) {
        return layui.layer.msg("请选择文件")
    }
    const imgUrl = URL.createObjectURL(filelist[0])
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgUrl) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域

})
// 是否以草稿发布
let artState = '已发布'
$("#btnSave").on('click', function () {
    artState = '草稿'
})
$("#formPub").on("submit", function (e) {
    e.preventDefault();
    const fd = new FormData($("#formPub")[0]);
    fd.append('state', artState)
    $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            fd.append('cover_img', blob)
            // 6. 发起 ajax 数据请求
            submit(fd)
        })
    })
    
    // 发送请求
    function submit(data) {
    console.log(11);
    $.ajax({
        method: "POST",
        data: data,
        url: '/my/article/add',
        contentType: false,
        processData: false,
        success(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
            // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/art_list.html'
        }
    })
}