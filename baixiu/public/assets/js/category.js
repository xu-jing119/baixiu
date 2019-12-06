$('#addCategory').on('submit',function(){
    var formData = $(this).serialize()
   // alert('123')
   console.log(formData);
   
    $.ajax({
        url:'/categories',
        type:'post',
        data:formData,
        success:function(result){
           location.reload()
        }
    })
    return false
})
//拿到分类数据 渲染到页面上
$.ajax({
    url:'/categories',
    type:'get',
    success:function(result){
       // console.log(result);
        var html = template('categoryTpl',{data:result})
        $('#categoryList').html(html)

    }
})
//点击编辑按钮时
$('#categoryList').on('click','.edit',function(){
    var id = $(this).attr('data-id')
  //  console.log(id);
    $.ajax({
        url:'/categories/' + id,
        type:'get',
        success:function(result){
          //  console.log(result);
            
             var html = template('editTpl',result)
             $('#categoryBox').html(html)
        }
    })
    
})
//当修改数据发生提交行为时
$('#categoryBox').on('submit','#editCategory',function(){
    if(confirm('是否确认修改')){
        var formData = $(this).serialize()
        var id = $(this).attr('data-id')
        //alert(id)
        $.ajax({
            url:'/categories/' + id,
            type:'put',
            data:formData,
            success:function(){
              location.reload()
            }
        })
    }
    // 阻止表单的默认提交行为
	return false;
})
//当点击删除按钮时
$('#categoryList').on('click','.delete',function(){
    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        url:'/categories/' + id,
        type:'delete',
        success:function(){
           //console.log(result);
           location.reload()
        }
    })
    
})
