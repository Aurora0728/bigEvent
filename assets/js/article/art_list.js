const layer = layui.layer
const form = layui.form
const laypage = layui.laypage
let q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
}
// 渲染表格
function initTable() {
    $.ajax({
        method: 'GET',
        data: q,
        url: '/my/article/list',
        success(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res);
            // layer.msg(res.message)
            const htmlStr = template('articleHtml', res)
            $("tbody").html(htmlStr)
            renderPage(res.total)
        }
    })
}
initTable()

// 格式化时间
template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    const y = dt.getFullYear();
    const m = padZero(dt.getMonth() + 1);
    const d = padZero(dt.getDate());
    const hour = padZero(dt.getHours());
    const min = padZero(dt.getMinutes());
    const sec = padZero(dt.getSeconds());
    return `${y}-${m}-${d} ${hour}:${min}:${sec}`
}
function padZero(num) {
    return num >= 10 ? num : '0' + num
}

// 渲染分类列表
function initCate() {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res);
            const cateHtml = template('cateHtml', res);
            $('[name=cate_id]').html(cateHtml)
            form.render()

        }
    })
}
initCate()

// 实现筛选功能
$('#form-search').on('submit', function (e) {
    e.preventDefault();
    const cate_id = $("[name=cate_id]").val()
    const state = $("[name=state]").val()
    q.cate_id = cate_id
    q.state = state
    console.log(cate_id, state);
    initTable()
})

// 实现分页效果
function renderPage(total) {
    laypage.render({
        elem: 'pageBox',
        count: total,
        limit: q.pagesize,
        limits: [2, 3, 5, 10],
        curr: q.pagenum,
        layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
        jump: function (obj, first) {
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            if (!first) {
                initTable()
            }
        }
    })
}

// 删除文章
$("tbody").on('click', '.btnDel', function () {
    const id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                if ($('.btnDel').length === 1 && q.pagenum !== 1) {
                    q.pagenum = q.pagenum - 1
                }
                initTable()
            }
        })
        layer.close(index)
    })
})