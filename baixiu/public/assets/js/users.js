//表达提交功能
$('#userForm').on('submit',function(){
    //获取用户在表单中输入的内容并转化成参数字符串
    var formData = $(this).serialize()
//console.log(formData);

    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(){
            location.reload()
        },
        error:function(){
            alert('添加用户失败')
        }
    })
  //  阻止默认表单提交
    return false 
})
//处理图片上传功能
$('#modifyBox').on('change','#avatar',function(){
    //获取用户上传图片信息
    var formData = new FormData()
    formData.append('avatar',this.files[0])
    //开始发送请求
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
         //告诉$.ajax方法不要解析请求参数
        processData:false,
         //告诉$.ajax方法不要设置请求参数类型
        contentType:false,
        success:function(result){
            console.log(result);
            //让用户看到图片预览
            $('#preview').attr('src',result[0].avatar)
            //隐藏域
            $('#hiddenAvatar').val(result[0].avatar)
            
        }
    })

})
//实现列表上传功能
$.ajax({
    url:'/users',
    type:'get',
    success:function(result){
        //console.log(result);
        var html = template('tpl-users',{user:result})
        $('#userList').html(html)
        
    },
    error:function(){
        alert('上传失败')
    }
})
//用户编辑功能
$('#userList').on('click','.edit',function(){
    var id = $(this).attr('data-id')
   // console.log(id);
    $.ajax({
        url:'/users/'+id,
        type:'get',
        success:function(result){
           // console.log(result);
            var html = template('tpl-modify',result)
            $('#modifyBox').html(html)
            
        }
    })
    
})
//用户编辑提交功能
$('#modifyBox').on('submit','#modifyForm',function(){
    //获取用户修改提交信息 以及id
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
   // console.log(formData,id);
    $.ajax({
        url:'/users/'+id,
        type:'put',
        data:formData,
        success:function(result){
            console.log(result);
            location.reload()
            
        }
    })
    return false
})
//用户删除功能
$('#userList').on('click','.delete',function(){
    if(confirm('您确定要删除吗?')){
        var id = $(this).attr('data-id')
       // console.log(id);
        $.ajax({
            url:'/users/' +id,
            type:'delete',
            success:function(){
              location.reload()
            }
        })
    }
})
//全选按钮
var selectAll = $('#selectAll')
//获取批量按钮
var deleteMany = $('#deleteMany')
//当全选按钮状态改变时
selectAll.on('change',function(){
    //获取全选按钮状态
   var status= $(this).prop('checked')
  // alert(status)
  if(status){
    deleteMany.show()
  }else{
    deleteMany.hide()
  }
  //根据全选钮状态改变用户复选框按钮状态
  $('#userList').find('input').prop('checked',status)
})
//当复选按钮发生改变时 更改全选按钮状态
$('#userList').on('change','.userstatus',function(){
    var inputs = $('#userList').find('input')
    //判断当用户复选框长度全等于用户选中的长度时
    if(inputs.length === inputs.filter(':checked').length){
       // alert('复选框全部选中了')
       selectAll.prop('checked',true)
    }else{
       // alert('复选框没有全部选中')
        selectAll.prop('checked',false)
    }
    //如果复选框按钮有选中的 就显示批量删除按钮 否则就隐藏
    if(inputs.filter(':checked').length > 0){
        deleteMany.show()
    }else{
      deleteMany.hide()
    }
})
//当点击批量删除按钮时
deleteMany.on('click',function(){
    var ids = []
    //获取选中的用户
    var checkUser = $('#userList').find('input').filter(':checked')
    //循环选中的用户 获得每个选中的用户的id
    checkUser.each(function(index,ele){
        ids.push($(ele).attr('data-id'))
    })
    //console.log(ids);
    if(confirm('您确定要批量删除吗?')){
        $.ajax({
            url:'/users/' + ids.join('-'),
            type:'delete',
            success:function(){
                location.reload()
            }
        })
    }
    
})
