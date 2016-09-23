/**
 * 
 */

var itemsPerPage=50;

function loadDataFromCache(){
	//alert("此功能暂时关闭。。。。。。")
	//return false;
	var cachekey = $('#cachekey').val();
	var modulename = $('#modulename').val();

	if (cachekey.replace(/(^s*)|(s*$)/g, "").length ==0) {
		alert("查询key不能为空！");
		return false;
	}
	
	$.ajax({
		url:'/om/crashTrend/queryBusiDetailFromCache',
		data:{
			'moduleName': modulename,
	        'cacheKey': cachekey,
		},
		success:function(data){
			//var result = JSON.parse(data);
			//var result = jQuery.parseJSON(data);
			var result = eval("(" + data + ")");
			var isError = result.isError;
			
			if(isError){
				alert(result.value.message);
				return;
			}
			dataList = result.value;
			
			$("#crashListTable tr:gt(0)").remove();
			$("#crashListTable tr:eq(0)").remove();
			var dataMap = dataList[0];
			var html = '<tr align="center">';
			for (var key in dataMap){						
				html+= '<th><a>'+key+'</a></th>';
			}
			html+= '</tr>';			
			$('#crashListTable').append(html);
						
			var num_entries = dataList.length;
			$("#pagination").pagination(num_entries,{
				num_edge_entries: 1, //边缘页数
				num_display_entries: 4, //主体页数
				callback: pageselectCallback,
				items_per_page: itemsPerPage, //每页显示1项
				prev_text: "前一页",
				next_text: "后一页"
			});
		},
		error: function(e){
			alert('发生错误: '+JSON.stringify(e));
		}
	});
}

function pageselectCallback(page_index, jq){
	var html = null;
	$("#crashListTable tr:gt(0)").remove();
	var start=page_index*itemsPerPage;
	var count=dataList.length< start+itemsPerPage?dataList.length:start+itemsPerPage;
	for (var i=start; i< count; i++){
		dataMap = dataList[i];
		html+='<tr>';
		for (var key in dataMap){	
			//if(endWithTime(key)){
			//	html+= '<td>'+(new Date(parseInt(dataMap[key]))).Format("yyyy-MM-dd hh:mm:ss.S")+'</td>';			
			//}else{
				html+= '<td>'+dataMap[key]+'</td>';			
			//}					
		}
		html+='</tr>';
	}	
	$('#crashListTable').append(html);
}

function exportRecordsBusi(){
//	alert("此功能也暂时关闭。。。。。。")
//	return false;
	var cacheKey = $('#cachekey').val();
	var moduleName = $('#modulename').val();
	window.location.href="/om/crashTrend/exportCacheRecords?"+		
	"cacheKey="+cacheKey+"&moduleName="+moduleName;	
}

function deleteDataFromCache(){
	
	if(confirm("确定要从Redis中删除本条记录？ ") != true) {
		return;
	}

	var cachekey = $('#cachekey').val();
	var modulename = $('#modulename').val();

	if (cachekey.replace(/(^s*)|(s*$)/g, "").length ==0) {
		alert("输入的key不能为空！");
		return false;
	}
	
	$.ajax({
		url:'/om/crashTrend/deleteBusiDetailFromCache',
		data:{
			'moduleName': modulename,
	        'cacheKey': cachekey,
		},
		success:function(data){
			var isError = result.isError;
			
			if(isError){
				alert(result.value.message);
				return;
			} else {
				alert("删除成功！");
			}
			
		},
		error: function(e){
			alert('发生错误: '+JSON.stringify(e));
		}
	});
}
