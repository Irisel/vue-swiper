function downLoadFile(){
	var appVersion = $('#appVersion').val();
	var fileType = $('#fileType').val();
	if(checkParams()){
		/*$.ajax({
			url: '/om/crashTrend/downLoadFile',
			data: {
				'appVersion':appVersion,
				'fileType':fileType,
			},
			//dataType: "json",
			success:function(result){
				alert(result);		
			},
			error: function(){
				alert("下载数据失败");
			}
		});*/
		//window.location.href="/om/crashTrend/downLoadFile?"+		
		//"appVersion="+$('#appVersion').val()+"&fileType="+$('#fileType').val();	
		
		  var form = $("<form>");   //定义一个form表单
          form.attr('style', 'display:none');   //在form表单中添加查询参数
          form.attr('target', '');
          form.attr('method', 'post');
          form.attr('action', "/om/crashTrend/downLoadFile"+"?"+"appVersion="+$('#appVersion').val()+"&fileType="+$('#fileType').val());
          
          $('body').append(form);  //将表单放置在web中 
          form.submit();
	}	
}

function checkParams(){
	var appVersion = $('#appVersion').val();
	if(appVersion == null || appVersion==""){
		alert("app版本号不能为空！");
		return false;
	}else{
		return true;
	}
}

function uploadFile(){
	var btn = $(".btn span");
	$("#fileupload").wrap("<form id='myupload' action='/om/crashTrend/upLoadFile' method='post' enctype='multipart/form-data'></form>");
	$("#fileupload").change(function(){
		$("#myupload").ajaxSubmit({
			dataType: 'json',
			url:$("#myupload").attr("action")+"?"+"appVersion="+$('#appVersion').val()+"&fileType="+$('#fileType').val(),
			beforeSend: function(XMLHttpRequest){
				if(!checkParams()){
					XMLHttpRequest.abort();
				}
				var filepath = $('#fileupload').val();
				if(filepath == null || filepath==""){
					XMLHttpRequest.abort();
				}else{
					btn.html("上传中...");
				}
			},
			success: function(data){
				alert(data.msg);
				drawTable(data.allAppFileInfo);
				btn.html("导入");
			},
			error:function(data){
				alert(data.responseText);
				btn.html("导入");
			}
		})
	});
}


$(function() {	
	uploadFile();	
})

	function drawTable(data){
		$("#allAppFileInfoTable tr:gt(0)").remove();	
		for(var i=0; i<data.length; i++){
			var html='<tr><td>'+data[i].appVersion+'</td>';
			if(data[i].appFilePath != ""){
				html+='<td><a href=\"/om/crashTrend/downLoadFile?appVersion='+ data[i].appVersion+'&fileType=1' + '\">下载</a></td>';
			}else{
				html+='<td></td>';
			}
			if(data[i].dsymFilePath != ""){
				html+='<td><a href=\"/om/crashTrend/downLoadFile?appVersion='+ data[i].appVersion+'&fileType=2' + '\">下载</a></td>';
			}else{
				html+='<td></td>';
			}
			html+='</tr>';
			$('#allAppFileInfoTable').append(html);
		}	
	}