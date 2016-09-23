var page_index=0;
var itemsPerPage=50;
var dataList=new Array();

Date.prototype.Format = function(fmt) 
{ //author: meizz 
	var o = { 
	 "M+" : this.getMonth()+1,                 //月份 
	 "d+" : this.getDate(),                    //日 
	 "h+" : this.getHours(),                   //小时 
	 "m+" : this.getMinutes(),                 //分 
	 "s+" : this.getSeconds(),                 //秒 
	 "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	 "S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)) 
	 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) 
	 if(new RegExp("("+ k +")").test(fmt)) 
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	return fmt; 
}

function reloadOrderTrend(){
	var time = $('#time').val();
	var orderType = $('#orderType').val();
	var appVersion = $('#appVersion').val();
    var channelID = $('#channelID').val();
    var clientType = $('#clientType').val();
	$.ajax({
		url: '/om/orderTrend/reloadOrderTrend',
		data: {
			'txtStatTime':time,
 			'orderType':orderType,
 			'appVersion':appVersion,
			'channelID':channelID,
			'clientType':clientType,
		},
	success:function(result){
	
		var data = result;
		drawCharts(data)
	},
	error: function(){
		alert("读取数据失败");
	}
})
}

function getOrderInfo(){
	var orderNo = $('#orderNo').val();
	var orderstarttime = $('#orderstarttime').val();
	var orderendtime = $('#orderendtime').val();
	if(orderNo == null || orderNo == "" || isNaN(orderNo)) return false;
	$.ajax({
		url: '/om/orderTrend/getOrderInfo',
		data: {
			'orderNo':orderNo,
			'orderstarttime':orderstarttime,
			'orderendtime':orderendtime,
		},
		success:function(data){
			var result = eval("("+data+")");
			if(result.isError){
				alert(result.value.message);
				return;
			}
			dataList = result.value;
			$("#infoListTable tr:gt(0)").remove();
			$("#infoListTable tr:eq(0)").remove();
			var dataMap = dataList[0];
			var html = '<tr align="center">';
			for (var key in dataMap){
				html+= '<th><a>'+key+'</a></th>';
			}
			html+= '</tr>';
			$('#infoListTable').append(html);
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
	error: function(){
		alert("读取数据失败");
	}
})
}

function pageselectCallback(page_index, jq){
	var html = null;
	$("#infoListTable tr:gt(0)").remove();
	var start=page_index*itemsPerPage;
	var count=dataList.length< start+itemsPerPage?dataList.length:start+itemsPerPage;
	for (var i=start; i< count; i++){
		dataMap = dataList[i];
		html+='<tr>';
		for (var key in dataMap){	
			if(endWithTime(key)){
				html+= '<td>'+(new Date(parseInt(dataMap[key]))).Format("yyyy-MM-dd hh:mm:ss.S")+'</td>';			
			}else{
				html+= '<td>'+dataMap[key]+'</td>';			
			}					
		}
		html+='</tr>';
	}	
	$('#infoListTable').append(html);
}

function endWithTime(str){
	var endstr = str.substring(str.length-4);
	if (endstr=="time" || endstr=="Time" || endstr=="date"){
		return true;
	}
	return false;
}

function drawCharts(data){
	var myMap = new FusionCharts("/common/lib/fusioncharts/MSLine.swf", "MyMapId",
			"100%", "300px", "0");
	myMap.setJSONData(data);
	myMap.render("linechart");
}

function select(appVersionSelect){
	//var data = eval(appVersionSelect);
	var data = $.parseJSON(appVersionSelect);  
	$.each(data,function(i,item){			
		var option="<option value=\"" + item+ "\">" + item + "</option>";
		
		$("#appVersion").append(option);
		$("#appVersion2").append(option);
	})
}

function orderTypeSelect(orderType){
	var data = eval(orderType);
	var option="<option selected='selected' value=\"" + data[0]+ "\">" + data[1] + "</option>";	
	$("#orderType").append(option);
	$("#orderType2").append(option);
	for (var i=2; i<data.length;i+=2){
        var option="<option value=\"" + data[i]+ "\">" + data[i+1] + "</option>";	
		$("#orderType").append(option);
		$("#orderType2").append(option);
	}
	
}

function reloadSelect(){
	var time = $('#time').val();
	var orderType = $('#orderType').val();
	var channelID = $('#channelID').val();
	var clientType = $('#clientType').val();
	$.ajax({
		url: '/om/orderTrend/appVersionSelect',
		data: {
			'txtStatTime':time,
			'orderType':orderType,
			'channelID':channelID,
			'clientType':clientType,
		},
		dataType: "json",
		success:function(result){
		//	result = eval(result);
		    $("#appVersion").empty();
		    $("#appVersion").append("<option value=\"\">------</option>");
			$.each(result,function(i,item){			
				var option="<option value=\"" + item+ "\">" + item + "</option>";
				
				$("#appVersion").append(option);
				$("#appVersion2").append(option);
			})
			
		},
		error: function(){
			alert("读取数据失败");
		}
	})
	
}