function reload(){
	var time = $('#time').val();
	var orderType = $('#orderType').val();
	var appVersion = $('#appVersion').val();
    var channelID = $('#channelID').val();
    var clientType = $('#clientType').val();
    //var compareDate = $("input:checked").val();
    var compareDate = $("input[name='compareDate']:checked").val();
	$.ajax({
		url: '/om/orderTrend/orderTrendCompareReload',
		data: {
			'txtStatTime':time,
 			'orderType':orderType,
 			'appVersion':appVersion,
			'channelID':channelID,
			'clientType':clientType,
			'compareDate':compareDate,
		},
	success:function(result){
		var data = eval("("+result+")");
		var today=data.today;
		var jsonData=data.jsonData;
		drawCharts(jsonData);
		var dataList=eval(today);
		drawTable(dataList);
	},
	error: function(){
		alert("读取数据失败");
	}
})
}
function drawChartsByPreviousDay(data){
	var myMap = new FusionCharts("/common/lib/fusioncharts/MSLine.swf", "MyMapId",
			"100%", "300px", "0");
	myMap.setJSONData(data);
	myMap.render("orderchart");
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
		    $("#appVersion2").empty();
		    $("#appVersion").append("<option value=\"\">------</option>");
		    $("#appVersion2").append("<option value=\"\">------</option>");
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
function drawTable(dataList){
	$("#orderByHourCountTable tr:gt(0)").remove();
	var html='<tr><td>数量</td>';
	for (var j=0; j<dataList.length; j++){
		html+='<td>'+dataList[j]+'</td>';
	}
	html+='</tr>';
	$('#orderByHourCountTable').append(html);
}
times = new Array(); 
function addTimes(){
	if (times.length==5){
		alert("最多只能对比5天的数据");
	}else{
		var time = $('#time2').val();
		for(var i =0;i<times.length;i++){
			if(time==times[i]){
				alert("不能添加相同的时间");
                return ;
			}
		}
		$("#addtimes").append("<span>&nbsp;&nbsp;<span class='times'>"+time+"</span><button type='button' class='myclose' onclick='deleteCourseItem(this);' title='删除'>×</button>&nbsp;&nbsp;</span>");   
		times.push(time);
	}
}
function deleteCourseItem(obj){
	for (i in times){
		if ($(obj).parent().children("span").html() == times[i]){
			times.splice(i,1);
			break;
		}
	}
//	alert($(obj).parent().children("span").html())
    $(obj).parent().replaceWith(""); 
 //   alert(times) 
}  

function reloadByPreviousDay(){
	var time = JSON.stringify(times);
	var orderType = $('#orderType2').val();
	var appVersion = $('#appVersion2').val();
    var channelID = $('#channelID2').val();
    var clientType = $('#clientType2').val();
   if(null==times||0==times.length){
	   alert("请添加时间");
	   XMLHttpRequest.abort();
	   return ;
   }
	$.ajax({
		url: '/om/orderTrend/orderCompareByPreviousDay',
		data: {
			'times':time,
 			'orderType':orderType,
 			'appVersion':appVersion,
			'channelID':channelID,
			'clientType':clientType,
		},
	success:function(result){
		var data = eval("("+result+")");
		//var today=data.today;
		var jsonData=data.jsonData;
		drawChartsByPreviousDay(jsonData);

	},
	error: function(){
		alert("读取数据失败");
	}
})
}


function BootReloadByPreviousDay(){
	var times =  $('#time2').val();
	var orderType = $('#orderType2').val();
	var appVersion = $('#appVersion2').val();
    var channelID = $('#channelID2').val();
    var clientType = $('#clientType2').val();
	$.ajax({
		url: '/om/orderTrend/orderCompareByPreviousDay',
		data: {
			'times':times,
 			'orderType':orderType,
 			'appVersion':appVersion,
			'channelID':channelID,
			'clientType':clientType,
		},
	success:function(result){
		var data = eval("("+result+")");
		//var today=data.today;
		var jsonData=data.jsonData;
		drawChartsByPreviousDay(jsonData);

	},
	error: function(){
		alert("读取数据失败");
	}
})
}