$(function(){
    // 点击去注册显示去登陆
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 点击去登录隐藏去注册
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //表单校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          //校验两次密码是否一致的规则
          repwd: function(value) {
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!=value) {
                return '两次密码不一致'
            }
          }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        //阻止表单默认提交行为
        e.preventDefault()
        $.post(
            'http://api-breakingnews-web.itheima.net/api/reguser',
            {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
            function(res) {
                if(res.status!==0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                $('#link_login').click()
            }
        )
    })

    //监听登录表单的提交事件
    $('form_login').submit(function(e){
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            method:'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status!==0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token)
                //跳转到后台主页
                // location.href='/index.html'
            }
        })
    })
})