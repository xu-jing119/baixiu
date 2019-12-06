//用户登录拦截
$("#loginOut").on('click',function(){
    var isConfirm = confirm('您确认要退出吗')
    if(isConfirm){
      $.ajax({
        url:'/logout',
        type:'post',
        success:function(){
          location.href = '/admin/login.html'
        },
        error:function(){
          alert('退出失败')
        }
      })
    }
  })