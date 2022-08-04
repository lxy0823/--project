const form = layui.form
form.verify({
    // 校验两次密码是否一致的规则
    nickname: (val) => {
        if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
    // 自定义一个叫 pwd 的校验规则
    email: [/@/, '邮箱格式输入错误']
});

const initUserInfo = () => {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        data: null,
        success: res => {
            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)
            form.val('formUserInfo', data)
        }
    })
}
initUserInfo();
$('#reserBtn').click(function (e) {
    e.preventDefault()
    initUserInfo()
})

$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: form.val('formUserInfo'),
        success: res => {
            const { status, message } = res
            if (status !== 0) return layer.msg(message)
            window.parent.getUserInfo()
        }
    })
})