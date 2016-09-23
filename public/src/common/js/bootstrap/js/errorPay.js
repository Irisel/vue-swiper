function reloadSelectName(){
		var time = $('#time').val();
		var orderType = $('#orderType').val();
		var clientType = $('#clientType').val();
		var payType = $('#payType').val();
		$.ajax({
			url: '/om/errorPayInfo/allSelect',
			data: {
				'txtStatTime':time,
				'clientType':clientType,
				'orderType':orderType,
				'payType':payType,
			},
			dataType: "json",
			success:function(result){
				result = eval(result);
			    $("#errorName").empty();
			    $("#errorName").append("<option value=\"\">------</option>");
				$.each(result.errorName,function(i,item){			
					var option="<option value=\"" + item+ "\">" + item + "</option>";					
					$("#errorName").append(option);
				});
				
				$("#bankName").empty();
				$("#bankName").append("<option value=\"\">------</option>");
				$.each(result.bankName,function(i,item){			
					var option="<option value=\"" + item+ "\">" + item + "</option>";					
					$("#bankName").append(option);
				});
				
				$("#deviceModel").empty();
				$("#deviceModel").append("<option value=\"\">------</option>");
				$.each(result.deviceModel,function(i,item){			
					var option="<option value=\"" + item+ "\">" + item + "</option>";					
					$("#deviceModel").append(option);
				});
				
				$("#cityName").empty();
				$("#cityName").append("<option value=\"\">------</option>");
				$.each(result.cityName,function(i,item){			
					var option="<option value=\"" + item+ "\">" + item + "</option>";					
					$("#cityName").append(option);
				});
				
				$("#appVersion").empty();
				$("#appVersion").append("<option value=\"\">------</option>");
				$.each(result.appVersion,function(i,item){			
					var option="<option value=\"" + item+ "\">" + item + "</option>";					
					$("#appVersion").append(option);
				});
				
				$("#osVersion").empty();
				$("#osVersion").append("<option value=\"\">------</option>");
				$.each(result.osVersion,function(i,item){			
					var option="<option value=\"" + item+ "\">" + item + "</option>";					
					$("#osVersion").append(option);
				})			
			},
			error: function(){
				alert("读取数据失败");
			}
		});
	}

function payTypeSelect(payType){
	var data = eval(payType);
	$("#payType").append(option);
	for (var i=0; i<data.length;i+=2){
        var option="<option value=\"" + data[i]+ "\">" + data[i+1] + "</option>";	
		$("#payType").append(option);
	}
	
}