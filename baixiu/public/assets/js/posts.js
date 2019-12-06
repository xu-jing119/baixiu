//获取服务器端的文化列表
$.ajax({
    type:'get',
    url:'/posts',
    success:function(result){
        console.log(result);
        var html = template('postsTpl',result)
        $('#postsBox').html(html)
        var page = template('listTpl',result)
        $("#listBox").html(page)
    }
})
//设置日期格式
function formateDate(date){
    date = new Date(date)
return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}
//封装分页函数
function changePage(page){
   // alert(page)
    $.ajax({
        type:'get',
        url:'/posts',
        data:{page:page},
        success:function(result){
            console.log(result);
            var html = template('postsTpl',result)
            $('#postsBox').html(html)
            var page = template('listTpl',result)
            $("#listBox").html(page)
        }
    })
}