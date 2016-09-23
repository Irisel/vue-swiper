var exceptionTypeMap = {				//跳转方式对照
		'0': '代码异常',
		'1': '系统crash'
};
var clientTypeMap = {
		'1':'Iphone',
		'3':'Android',
		'4':'Ipad',
		'6':'WinPhone'
};
var netWorkTypeMap = {
		'0':'3G',
		'1':'2G',
		'3':'WIFI'
};
Date.prototype.format =function(format)
{
    var o = {
    "M+" : this.getMonth()+1, //month
"d+" : this.getDate(),    //day
"h+" : this.getHours(),   //hour
"m+" : this.getMinutes(), //minute
"s+" : this.getSeconds(), //second
"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
"S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

function loadCrashList(begin)
{
	var pageSize = 50;
	var begin = begin || 0;
	var pageName = $('#txtPageName').val();
	var appVersion = $('#txtAppVersion').val();
	var osVersion = $('#txtOSVersion').val();
	var deviceModel = $('#txtDeviceModel').val();
	var exceptionName = $('#txtExceptionName').val();
	var clientType = $('#clientType').val();
	var netWorkType = $('#netWorkType').val();
	var exceptionType = $('#ExceptionType').val();
	var startTime = $('#txtStartTime').val();
	var endTime = $('#txtEndTime').val();
	var eLongAccount = $('#txtELongAccount').val();
	var appName = $('#appName').val();
	var mobile = $('#mobile').val();
	$.ajax({
		url: '/om/crashTrend/getAppCrashDetail',
		data: {
   				  'pageName':pageName,'appVersion':appVersion,'osVersion':osVersion,'mobile':mobile,
   				  'deviceModel':deviceModel,'exceptionName':exceptionName,'clientType':clientType,
   				  'netWorkType':netWorkType,'exceptionType':exceptionType,'startTime':startTime,
   				  'endTime':endTime,'eLongAccount':eLongAccount,'appName':appName,'start':begin,'size':pageSize
		},
		type: 'GET',
		success: function(data, status, obj){
			var item = eval('('+data+')');
			console.log(item);
			var total = item.total;
			var crashList = item.l;
			var html = '<table class="table  table-bordered table-striped table-hover crashTable"><thead><tr><th>序号</th><th>客户端</th><th>页面名称</th><th>App版本</th><th>OS版本号</th><th>机型</th><th>发生时间</th><th>会员卡号</th><th>手机号</th></tr></thead><tbody>';
			for(var i =0; i < crashList.length; i++){
				var crash = crashList[i];
				html += '<tr><td><a href="/om/crashTrend/queryCrashDetailById?id='+crash.id+'" target="_blank">'+crash.id+'</a></td>'
					 +  '<td>'+clientTypeMap[crash.ClientType]+'</td>'
					 +  '<td>'+crash.PageName+'</td>'
					 +  '<td>'+crash.AppVersion+'</td>'
					 +  '<td>'+crash.OsVersion+'</td>'
					 +  '<td>'+crash.DeviceModel+'</td>'
					 +  '<td>'+new Date(crash.CrashTime).format("yyyy-MM-dd hh:mm:ss")+'</td>'
					 +  '<td>'+crash.eLongAccount+'</td>'
					 +  '<td>'+crash.mobile+'</td>'
					 +  '</tr>'
			}
			html += '</tbody></table>';
			if(total){
				
				var currentPage = parseInt(parseInt(begin)/pageSize+1);
				var totalPage = parseInt((parseInt(total)+pageSize-1)/pageSize);
				    html += '<p align="right"><a href="#" onclick="loadCrashList(0)">首页</a>|';
				if(currentPage <= 1){
					html += '<a href="#" onclick="loadCrashList(0)">上一页</a>|';
				}
				else{
					html += '<a href="#" onclick="loadCrashList('+((currentPage-2)*pageSize)+')">上一页</a>|';
				}
				if(currentPage >= totalPage){
					html += '<a href="#" onclick="loadCrashList('+((totalPage-1)*pageSize)+')">下一页</a>|';
				}
				else{
					html += '<a href="#" onclick="loadCrashList('+(currentPage*pageSize)+')">下一页</a>|'
				}
				html += '<a href="#" onclick="loadCrashList('+((totalPage-1)*pageSize)+')">尾页</a>&nbsp;&nbsp;&nbsp;&nbsp;'
				html += '共'+total+'条|共'+totalPage+'页|当前第'+currentPage+'页</P>';
			}
			
			$('#CrashList').html(html);
		},
		error: function(obj, status, e){
			alert('发生错误: '+JSON.stringify(e));
		}
	});
}
