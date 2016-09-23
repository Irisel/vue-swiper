function reload() {
		var time = $('#time').val();
		var orderType = $('#orderType').val();
		var clientType = $('#clientType').val();
		var compareDate = $("input:checked").val();
		$.ajax({
			url : '/om/orderAbnormal/reloadOrderAbnormal',
			data : {
				'txtStatTime':time,
				'orderType':orderType,
				'clientType':clientType,
				'compareDate':compareDate,
			},
			success : function(result) {
				var data = result;
				drawCharts(data)
			},
			error : function() {
				alert("读取数据失败");
			}
		})
	}

	function drawCharts(data) {

		var myMap = new FusionCharts("/common/lib/fusioncharts/MSLine.swf",
				"MyMapId", "100%", "300px", "0");
		myMap.setJSONData(data);
		myMap.render("linechart");
	}
	
	
	function drawChartsOrderchartByPreviousTime(data){
		var myMap = new FusionCharts("/common/lib/fusioncharts/MSLine.swf", "MyMapId",
				"100%", "300px", "0");
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
	    $(obj).parent().replaceWith(""); 
	}  

	function reloadByPreviousHour(){
		var time = JSON.stringify(times);
		var orderType = $('#orderType2').val();
		var clientType = $('#clientType2').val();
		var compareDate = $("input:checked").val();
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
			var jsonData=data.jsonData;
			drawChartsOrderchartByPreviousTime(jsonData);

		},
		error: function(){
			alert("读取数据失败");
		}
	})
	}
	
	function bootReloadByPreviousHour(){
		var time = JSON.stringify(times);
		var time2 = $('#time2').val();
		var orderType = $('#orderType2').val();
		var clientType = $('#clientType2').val();
		var compareDate = $("input:checked").val();
		$.ajax({
			url: '/om/orderAbnormal/getOrderAbnormalByPreviousHour',
			data: {
				'times':time2,
	 			'orderType':orderType,
	 			'clientType':clientType,
				'compareDate':compareDate,
			},
		success:function(result){
			var data = eval("("+result+")");
			var jsonData=data.jsonData;
			drawChartsOrderchartByPreviousTime(jsonData);

		},
		error: function(){
			alert("读取数据失败");
		}
	})
	}