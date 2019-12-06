$('#resetForm').on('submit',function(){
    // 获取用户提交表单的信息
    var formData = $(this).serialize()
    console.log(formData)
   // alert('123')
   $.ajax({
       url:'/users/password',
       type:'put',
       data:formData,
       success:function(){
        location.href = '/admin/login.html'
    },
 

   })
    return false
})