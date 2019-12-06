//获取服务器端的分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success:function(result){
        console.log(result);
        var html = template('postadd-tpl',{data:result})
        $("#category").html(html)
    }
})
//实现文件上传
$('#feature').on('change',function(){
    var formData = new FormData()
    formData.append('cover',this.files[0])
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        contentType: false,
        processData: false,
        success:function(result){
            console.log(result);
            $('#thumbnail').val(result[0].cover)
        }
    })
})
//当添加文章表单提交的时候
$("#addForm").on('submit',function(){
    var formData = $(this).serialize()
    console.log(formData);
    
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
           // console.log(result);
            location.href = '/admin/posts.html'
        }
    })
    return false
})