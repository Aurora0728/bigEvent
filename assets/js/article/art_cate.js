const layer = layui.layer
const form = layui.form
$(function () {
    initArticleCate()
    function initArticleCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("加载分类失败!")
                }
                const artCateHTML = template("artCateHTML", res)
                $("#tbody").html(artCateHTML)
            }
        })
    }
    // 添加分类
    let indexAdd = null
    $("#addCate").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $("#dialog-add").html(),
            area: ['500px', '250px'],
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("添加分类失败!")
                }
                layer.msg(res.message)
                initArticleCate()
                layer.close(indexAdd)
            }
        })
    })
    // 编辑分类
    let indexEdit = null;
    $('#tbody').on('click', '#btnEdit', function (e) {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $("#dialog-edit").html(),
            area: ['500px', '250px'],
        });
        const id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + id,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                form.val('form-edit', res.data)
            }
        })
    })

    $("body").on('submit', '#form-edit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: data,
            success(res) {
                console.log(data);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(indexEdit)
                initArticleCate()
            }
        })
    })
    // 删除
    let indexDel = null;
    $("#tbody").on('click', '#btnDel', function () {
        const id = $(this).attr('data-id');
        indexDel = layer.confirm('确认删除?', { icon: 3, title: '提示' }, function () {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    console.log(res);
                    layer.close(indexDel)
                    initArticleCate()
                    layer.msg(res.message)
                }
            })
        })
    })
})