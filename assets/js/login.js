$(function() {
    // 点击去注册账号
    $('#link_reg').on('click', function() {
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 点击去登录
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })

    // 验证表单
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })

    // 发起注册用户的Ajax请求
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url: "/api/reguser",
            data:{
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 手动登录
                $('#link_login').click()
                // 重置form表单
                $('#form_reg')[0].reset()
            }
        });
    })

    // 发起登录的Ajax请求
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                // 将登录成功得到的token字符串 保存到localstorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})