$(document).ready(function() {
		reloadSelect();
		reload();
	});
function loadcrashTotalCount(){
	var startTime = $('#starttime').val();
	var endTime = $('#endtime').val();
	var clientType = $('#clientType').val();
	var channelID = $('#channelID').val();
	var appVersion = $('#appVersion').val();
	var osVersion = $('#osVersion').val();
    var staticType = $('#staticType').val();
    var appName = $('#appName').val();
	$.ajax({
		url: '/om/crashTrend/crashTotalCountReload',
		data:{
			'startTime':startTime,
			'endTime': endTime,
			'clientType':clientType,
			'channelID':channelID,
			'appVersion':appVersion,
			'osVersion':osVersion,
			'staticType':staticType,
			'appName':appName,
		},
		dataType:"json",
		success:function(data){
			$("#crashTotalCountTable tr:gt(0)").remove();
			var html = null;
			dataLists = eval(data);
			for (var i=0; i<dataLists.length; i++){
				var dataList = dataLists[i];				
				html+='<tr>';
				for (var j=0; j<dataList.length; j++){
					html+='<td>'+dataList[j]+'</td>';
				}
				html+='</tr>';
			}
			$('#crashTotalCountTable').append(html);
		},
		error:function(e){
			alert('发生错误');
		}
	});
	
}
function reloadSelect(){
	var time = $('#endtime').val();
	var clientType = $('#clientType').val();
	var channelID = $('#channelID').val();
	$.ajax({
		url: '/om/crashTrend/appVersionSelect',
		data: {
			'txtStatTime':time,
			'clientType':clientType,
			'channelID':channelID,
		},
		//dataType: "json",
		success:function(result){
			result = eval(result);
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
	});
	$.ajax({
		url: '/om/crashTrend/osVersionSelect',
		data: {
			'txtStatTime':time,
			'clientType':clientType,
		},
		//dataType: "json",
		success:function(osresult){
			osresult = eval(osresult);
		    $("#osVersion").empty();
		    $("#osVersion").append("<option value=\"\">------</option>");
			$.each(osresult,function(j,ositem){			
				var osoption="<option value=\"" + ositem+ "\">" + ositem + "</option>";
				
				$("#osVersion").append(osoption);
			})
			
		},
		error: function(){
			alert("读取数据失败");
		}
	});
	
	$.ajax({
		url: '/om/crashTrend/appNameSelect',
		data: {
			'txtStatTime':time,
			'clientType':clientType,
			'channelID':channelID,
		},
		//dataType: "json",
		success:function(appnameresult){
			appnameresult = eval(appnameresult);
		    $("#appName").empty();
		    $("#appName").append("<option value=\"\">------</option>");
			$.each(appnameresult,function(j,appnameitem){	
				var appnameoption="<option value=\"" + appnameitem+ "\">" + appnameitem + "</option>";
				
				$("#appName").append(appnameoption);
			})
			
		},
		error: function(){
			alert("读取数据失败");
		}
	});
	
}

function select(appVersionSelect, osVersionSelect ,appNameSelect){
	//var data = eval(appVersionSelect);
	var data = $.parseJSON(appVersionSelect);  
	var osData = $.parseJSON(osVersionSelect);
	var appNameData = $.parseJSON(appNameSelect);
	$.each(data,function(i,item){			
		var option="<option value=\"" + item+ "\">" + item + "</option>";
		
		$("#appVersion").append(option);
	});
	$.each(osData,function(i,item){			
		var option="<option value=\"" + item+ "\">" + item + "</option>";
		
		$("#osVersion").append(option);
	});
	$.each(appNameData,function(i,item){
		var option="<option value=\"" + item+ "\">" + item + "</option>";
		
		$("#appName").append(option);
	});
}