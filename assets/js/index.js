
// 获取用户基本信息
const getUserInfo = () => {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: res => {
            const { status, message } = res
            if (res.status !== 0) return layui.layer.msg(message);
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
    });
};

const renderAvatar = data => {
    let name = data.nickname || data.username
    //设置欢迎文本
    $('#welcome').html('欢迎' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName)
    }
}
// 调用 getUserInfo 函数获取用户基本信息
getUserInfo();

$('#exitBtn').click(function () {
    layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
        //do something
        location.href = '/login.html'
        localStorage.removeItem('token')
        layer.close(index);
    });
})