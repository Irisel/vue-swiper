function drawCharts2(data){
	var myMap = new FusionCharts("/common/lib/fusioncharts/MSLine.swf", "MyMapId",
			"100%", "300px", "0");
	alert("wewewe");
	myMap.setJSONData(data);
	myMap.render("orderchartByPreviousTime");
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

function reload2(){
	var time = JSON.stringify(times);
	var orderType = $('#orderType2').val();
	var clientType = $('#clientType2').val();
	var compareDate = $("input:checked").val();
	alert("request");
   if(null==times||0==times.length){
	   alert("请添加时间");
	   XMLHttpRequest.abort();
	   return ;
   }
	$.ajax({
		url: '/om/orderAbnormal/getOrderAbnormalByPreviousHour',
		data: {
			'times':time,
 			'orderType':orderType,
 			'clientType':clientType,
			'compareDate':compareDate,
		},
	success:function(result){
		var data = eval("("+result+")");
		//var today=data.today;
		alert("success");
		var jsonData=data.jsonData;
		drawCharts2(jsonData);

	},
	error: function(){
		alert("读取数据失败");
	}
})
}


function reload3(){
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
		drawCharts2(jsonData);

	},
	error: function(){
		alert("读取数据失败");
	}
})
}