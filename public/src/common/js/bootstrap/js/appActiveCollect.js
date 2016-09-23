var datatable;
var datatable2;
function getChannelStatInfo() {
		var beginDate = $('#beginDate').val();
		var endDate = $('#endDate').val();
		var clientType = $('#clientType').val();
		
		if (!checkDate(beginDate,endDate)) {
			alert("结束时间不能早于开始时间！");
			return;
		}
		
		if (calcDateInterval(beginDate, endDate) > 7) {
			alert("时间间隔最多在一星期以内！");
			return;
		}

		$.ajax({
			url : '/om/getChannelStatInfo',
			data : {
				'beginDate':beginDate,
				'endDate':endDate,
				'clientType':clientType
			},
			success : function(result) {
				$("#AllChannelDataTable tr:gt(0)").remove();
				var html="";
				datatable.fnClearTable();
				dataLists = eval(result);
				for (var i=0; i<dataLists.length; i++){
					var dataList = dataLists[i];				
					html+='<tr>';
					for (var j=0; j<dataList.length; j++){
						html+='<td>'+dataList[j]+'</td>';
					}
					html+='</tr>';
				}
				$('#AllChannelDataTable tbody').append(html);
				datatable.dataTable( {
					"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
					"sPaginationType": "bootstrap",
					"oLanguage": {
						"sLengthMenu": "_MENU_ 每页条数"
					},
					"bDestroy": true
				} );
			},
			error : function() {
				alert("读取数据失败");
			}
		})
	}

function getChannelStatInfoDaySeq() {
	var beginDate = $('#beginDate2').val();
	var endDate = $('#endDate2').val();
	var channelId = $('#channelId').val();
	
	if (channelId == "") {
		alert("渠道号不能为空！");
		return;
	}
	
	if (!checkDate(beginDate,endDate)) {
		alert("结束时间不能早于开始时间！");
		return;
	}
	
	if (calcDateInterval(beginDate, endDate) > 7) {
		alert("时间间隔最多在一星期以内！");
		return;
	}

	$.ajax({
		url : '/om/getChannelStatInfoDaySeq',
		data : {
			'beginDate':beginDate,
			'endDate':endDate,
			'channelId':channelId
		},
		success : function(result) {
			$("#AllChannelDataDaySeqTable tr:gt(0)").remove();
			var html="";
			datatable2.fnClearTable();
			dataLists = eval(result);
			for (var i=0; i<dataLists.length; i++){
				var dataList = dataLists[i];				
				html+='<tr>';
				for (var j=0; j<dataList.length; j++){
					html+='<td>'+dataList[j]+'</td>';
				}
				html+='</tr>';
			}
			$('#AllChannelDataDaySeqTable tbody').append(html);
			datatable2.dataTable( {
				"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "_MENU_ 每页条数"
				},
				"bDestroy": true
			} );
		},
		error : function() {
			alert("读取数据失败");
		}
	})
}

function getRegionalPromotionChannelStatInfo() {
	var beginDate = $('#beginDate').val();
	var endDate = $('#endDate').val();
	var clientType = $('#clientType').val();
	
	if (!checkDate(beginDate,endDate)) {
		alert("结束时间不能早于开始时间！");
		return;
	}
	
	if (calcDateInterval(beginDate, endDate) > 7) {
		alert("时间间隔最多在一星期以内！");
		return;
	}

	$.ajax({
		url : '/om/getRegionalPromotionChannelStat',
		data : {
			'beginDate':beginDate,
			'endDate':endDate,
			'clientType':clientType
		},
		success : function(result) {
			$("#AllChannelDataTable tr:gt(0)").remove();
			var html="";
			datatable.fnClearTable();
			dataLists = eval(result);
			for (var i=0; i<dataLists.length; i++){
				var dataList = dataLists[i];				
				html+='<tr>';
				for (var j=0; j<dataList.length; j++){
					html+='<td>'+dataList[j]+'</td>';
				}
				html+='</tr>';
			}
			$('#AllChannelDataTable tbody').append(html);
			datatable.dataTable( {
				"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "_MENU_ 每页条数"
				},
				"bDestroy": true
			} );
		},
		error : function() {
			alert("读取数据失败");
		}
	})
}

function getRegionalPromotionChannelStatInfo() {
	var beginDate = $('#beginDate').val();
	var endDate = $('#endDate').val();
	var clientType = $('#clientType').val();
	
	if (!checkDate(beginDate,endDate)) {
		alert("结束时间不能早于开始时间！");
		return;
	}
	
	if (calcDateInterval(beginDate, endDate) > 7) {
		alert("时间间隔最多在一星期以内！");
		return;
	}

	$.ajax({
		url : '/om/getRegionalPromotionChannelStat',
		data : {
			'beginDate':beginDate,
			'endDate':endDate,
			'clientType':clientType
		},
		success : function(result) {
			$("#AllChannelDataTable tr:gt(0)").remove();
			var html="";
			datatable.fnClearTable();
			dataLists = eval(result);
			for (var i=0; i<dataLists.length; i++){
				var dataList = dataLists[i];				
				html+='<tr>';
				for (var j=0; j<dataList.length; j++){
					html+='<td>'+dataList[j]+'</td>';
				}
				html+='</tr>';
			}
			$('#AllChannelDataTable tbody').append(html);
			datatable.dataTable( {
				"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "_MENU_ 每页条数"
				},
				"bDestroy": true
			} );
		},
		error : function() {
			alert("读取数据失败");
		}
	})
}

function reloadAllChannelData() {
		var time = $('#time').val();
		var clientType = $('#clientType').val();

		$.ajax({
			url : '/om/reloadAllChannelData',
			data : {
				'time':time,
				'clientType':clientType
			},
			success : function(result) {
				$("#AllChannelDataTable tr:gt(0)").remove();
				var html = null;
				dataLists = eval(result);
				for (var i=0; i<dataLists.length; i++){
					var dataList = dataLists[i];				
					html+='<tr>';
					for (var j=0; j<dataList.length; j++){
						html+='<td>'+dataList[j]+'</td>';
					}
					html+='</tr>';
				}
				$('#AllChannelDataTable').append(html);
			},
			error : function() {
				alert("读取数据失败");
			}
		})
	}
	
	function reloadOneChannelData() {
		var startTime = $('#startTime').val();
		var endTime = $('#endTime').val();
		var channelId = $('#channelId').val();
		var clientType = $('#clientType2').val();
		
		$.ajax({
			url : '/om/reloadOneChannelData',
			data : {
				'startTime':startTime,
				'endTime':endTime,
				'channelId':channelId,
				'clientType':clientType
			},
			success : function(result) {
				$("#OneChannelDataTable tr:gt(0)").remove();
				var html = null;
				dataLists = eval(result);
				for (var i=0; i<dataLists.length; i++){
					var dataList = dataLists[i];				
					html+='<tr>';
					for (var j=0; j<dataList.length; j++){
						html+='<td>'+dataList[j]+'</td>';
					}
					html+='</tr>';
				}
				$('#OneChannelDataTable').append(html);
				
			},
			error : function() {
				alert("读取数据失败");
			}
		})
	}
	
	function initDataTable(){
		datatable=$('#AllChannelDataTable');
		datatable2=$('#AllChannelDataDaySeqTable');
		datatable.dataTable( {
			"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "_MENU_ 每页条数"
			},
			"bDestroy": true
		} );
		datatable2.dataTable( {
			"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "_MENU_ 每页条数"
			},
			"bDestroy": true
		} );
	}
	
	/**
	 * 判断开始结束时间先后顺序
	 * @param begin
	 * @param end
	 * @returns
	 */
	function checkDate(begin, end){
		 var startTime = new Date(Date.parse(begin.replace(/-/g,   "/"))).getTime();    
		 var endTime = new Date(Date.parse(end.replace(/-/g,   "/"))).getTime();    
		 return endTime - startTime > 0 ? true: false;
	}
	
	/**
	 * 计算时间间隔天数
	 * @param begin
	 * @param end
	 * @returns {Number}
	 */
	function calcDateInterval(begin, end){
		 var startTime = new Date(Date.parse(begin.replace(/-/g,   "/"))).getTime();    
		 var endTime = new Date(Date.parse(end.replace(/-/g,   "/"))).getTime();    
		 var dates = Math.abs((startTime - endTime))/(1000*60*60*24);    
		 return  dates;    
		
	}

