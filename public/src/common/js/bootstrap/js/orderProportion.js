function showOrderProportion(){
	var statTime = $('#statTime').val();
	var endTime = $('#endTime').val();
	var orderType = $('#orderType').val();
	var appVersion = $('#appVersion').val();
	var osVersion = $('#osVersion').val();
	var channelID = $('#channelID').val();
	var clientType = $('#clientType').val();
	$.ajax({
		url: '/om/orderTrend/OrderProportionDetailReload',
		data: {
			'txtStatTime':statTime,
			'txtEndTime':endTime,
			'orderType':orderType,
			'appVersion':appVersion,
			'osVersion':osVersion,
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
function drawCharts(data) {
	var myMap = new FusionCharts("/common/lib/fusioncharts/Pie3D.swf",
			"MyMapId", "100%", "300px", "0");
	myMap.setJSONData(data);
	myMap.render("linechart");
}

function reloadSelect(){
	var statTime = $('#statTime').val();
	var endTime = $('#endTime').val();
	var orderType = $('#orderType').val();
	var clientType = $('#clientType').val();
	var channelID = $('#channelID').val();

	$.ajax({
		url: '/om/orderTrend/appVersionSelect2',
		data: {
			'txtStatTime':statTime,
			'txtEndTime':endTime,
			'orderType':orderType,
			'clientType':clientType,
			'channelID':channelID,
		},
		dataType: "json",
		success:function(result){
			$("#appVersion").empty();
			$("#appVersion").append("<option value=\"\">------</option>");
			$.each(result,function(i,item){			
				var option="<option value=\"" + item+ "\">" + item + "</option>";

				$("#appVersion").append(option);
			})		
		},
		error: function(){
			alert("读取数据失败");
		}
	})

	$.ajax({
		url: '/om/orderTrend/osVersionSelect',
		data: {
			'txtStatTime':statTime,
			'txtEndTime':endTime,
			'orderType':orderType,
			'clientType':clientType,
			'channelID':channelID,
		},
		dataType: "json",
		success:function(result){
			$("#osVersion").empty();
			$("#osVersion").append("<option value=\"\">------</option>");
			$.each(result,function(i,item){			
				var option="<option value=\"" + item+ "\">" + item + "</option>";

				$("#osVersion").append(option);
			})		
		},
		error: function(){
			alert("读取数据失败");
		}
	})
}
function select(appVersionSelect){
	var data = $.parseJSON(appVersionSelect);  
	$.each(data,function(i,item){			
		var option="<option value=\"" + item+ "\">" + item + "</option>";
		$("#appVersion").append(option);
	})
}
function select(osVersionSelect){
	var data = $.parseJSON(osVersionSelect);  
	$.each(data,function(i,item){			
		var option="<option value=\"" + item+ "\">" + item + "</option>";
		$("#osVersion").append(option);
	})
}
function orderTypeSelect(orderType){
	var data = eval(orderType);
	var option="<option selected='selected' value=\"" + data[0]+ "\">" + data[1] + "</option>";	
	$("#orderType").append(option);
	for (var i=2; i<data.length;i+=2){
		var option="<option value=\"" + data[i]+ "\">" + data[i+1] + "</option>";	
		$("#orderType").append(option);
	}
}	


