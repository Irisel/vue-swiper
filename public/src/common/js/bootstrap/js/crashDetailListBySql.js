var page_index=0;
var itemsPerPage=50;
var dataList=new Array();

//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
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

function loadCrashList(){
	var sql = $('#sql').val();
	if(!checkSql(sql)){
		return;
	}
	$.ajax({
		url:'/om/crashTrend/queryCrashDetailBySql',
		data:{
			'sql':sql	
		},
		success:function(data){
			var result = eval("("+data+")");
			if(result.isError){
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

function endWithTime(str){
	var endstr = str.substring(str.length-4);
	if (endstr=="time" || endstr=="Time" || endstr=="date"){
		return true;
	}
	return false;
}

function exportRecords(){
	var sql = $('#sql').val();
	if(!checkSql(sql)){
		return;
	}

	//window.open("/om/crashTrend/exportRecords?"+"sql="+sql);
	window.location.href="/om/crashTrend/exportRecords?"+$('#sql').serialize();	
	
}

function checkSql(sql){
	if(sql.match("app_crash_detail")){
		if(sql.match("\screate\s|\sinsert\s|\supdate\s|\sdrop\s|\sdelete\s|\salert\s")){
			alert("只能进行select操作！谢谢！");
			return false;
		}
		if(sql.match("where")){
			var w = sql.match("where");
			if(!sql.match("time")){
				alert("请限制查询的时间（使用crash_time字段）！谢谢！");
				return false;
			}
			var re=/crash_time/ig;
			var p=0;
			var l=re.exec(sql);
		    while(l != null){
		       p=l.index; 	
		       l=re.exec(sql)
		    }
			if(p < w.index){
				alert("唉！请在were语句中设定查询的时间范围(crash_time)，查询数据过大使用时间就越长，然后会DBA那边会报警的！");
				return false;
			}
		}else{
			alert("请使用where语句！设定查询条件！谢谢！");
			return false;
		}
	}
	return true;
}

function cmpTime(start, end , day){
	var time = start.getTime()-end.getTime();
	if (time>1000*60*60*24*day){
		alert("查询时间必须在"+day+"天之内,建议输入起止日期");
		return false;
	}
	return true;
}

function timeConvert(sql, startTime_s_p){
	var startTimeStr = sql.substr(startTime_s_p).match(/'((\d|-|\s|\/)+)'/g);
	var startTime = new Date(Date.parse(startTimeStr[0].replace(/-/g, "/")));
	if (startTime=='Invalid Date'){
		alert("日期格式只支持'2015-11-12'或者'2015/11/12'");
		return false;
	}
	return startTime;
}

function checkSqlTime(sql){
	
    var now = new Date();startTime
	var startTime_s_p = sql.search(/time\s*>/g);
	var endTime_s_p = sql.search(/time\s*</g);
	var time_is_ok = false;
	var startTime;
	if (startTime_s_p!=-1){
		//var startTimeStr = sql.substr(startTime_s_p).match(/'((\d|-|\s)+)'/g);
		//startTime = new Date(Date.parse(startTimeStr[1].replace(/-/g, "/")));
		startTime = timeConvert(sql, startTime_s_p);
		if (!startTime){
			return false;
		}
		//time_is_ok = cmpTime(now, startTime, 3);
		
	}else{
		alert("查询起始日期没输入eg：startTime>'2015-11-12'");
		return false;
	}
	if (endTime_s_p!=-1){
		//var endTimeStr = sql.substr(endTime_s_p).match(/'((\d|-|\s)+)'/g);
		var endTime = timeConvert(sql, endTime_s_p);
		if (!endTime){
			return false;
		}
		time_is_ok = cmpTime(endTime, startTime,  3);
	}else{
		time_is_ok = cmpTime(now, startTime, 3)	
	}

	if (!time_is_ok){
		return false
	}
	//alert("时间校验通过");
	return true;
}


function loadBusiList(){
	//alert("此功能暂时关闭。。。。。。")
	//return false;
	var sql = $('#sql').val();
	var database = $('#database').val();
	var checkSql = sql.toLowerCase();
	if(checkSql.match("create |insert |update |drop |delete |alert ")){
		alert("只能进行select操作！谢谢！");
		return false;
	}
	
	if(checkSql.match("select") && !checkSql.match("top |limit |time|sysobjects|syscolumns")){
		alert("请限制查询的记录数或者时间！查询的时间不能超过3天");
		return false;
	}
	
//	if(checkSql.match("select") && !checkSqlTime(checkSql)){
//		return false;
//	}
	$.ajax({
		url:'/om/crashTrend/queryBusiDetailBySql',
		data:{
			'sql':sql,
	        'database':database,
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

function exportRecordsBusi(){
//	alert("此功能也暂时关闭。。。。。。")
//	return false;
	var sql = $('#sql').val();
	var database = $('#database').val();
	window.location.href="/om/crashTrend/exportRecordsBusi?"+		
	"sql="+sql+"&database="+database;	
}

