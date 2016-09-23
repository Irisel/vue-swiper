function queryCpcList(attr, event)
{
	//var adType = $('#advTypeText').val();
	//var jumpType = $('#jumpTypeText').val();
	//var dimension = $('#dimensionText').val();
	//var clientType = $('#clientTypeText').val();
	prevent(event);
	var adType = searchArgs.adType;
	var jumpType = searchArgs.jumpType;
	var dimension = searchArgs.dimension;
	var clientType = searchArgs.clientType;
	var phoneType = $('#phoneType').val();
	var version = $('#version').val();
	var channelId = $('#channelId').val();
	var deviceId = $('#deviceId').val();
	$.ajax({
		url: '../advCpc/queryAdvClick',
		data: {
   				  'adType':adType,'jumpType':jumpType,'dimension':dimension,
   				  'clientType':clientType,'phoneType':phoneType,'version':version,
   				  'channelId':channelId,'deviceId':deviceId
		},
		type: 'GET',
		success: function(data, status, obj){
			
			cpcList = eval(data);
			if(attr){
				sort(cpcList, attr);
			}
			var html = '<tr><th><a href="#" onclick="queryCpcList(\'clickNum\', event);">点击次数</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'adName\', event);">广告名称</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'adType\', event);">广告类型</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'clientType\', event);">客户端类型</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'phoneType\', event);">手机型号</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'version\', event);">版本</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'jumpType\', event);">跳转类型</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'jumpLink\', event);">跳转链接</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'dimension\', event);">分辨率</a></th>'+
				'<th><a href="#" onclick="queryCpcList(\'channelId\', event);">渠道号</a></th></tr>';
			for(var i = 0; i < cpcList.length; i++){
				var cpc = cpcList[i];
				var jumpLink ;
				if(cpc.jumpLink.indexOf(':')!=-1)
				{
					jumpLink = cpc.jumpLink.substring(0, cpc.jumpLink.indexOf(':'));
				}
				else
				{
					jumpLink = cpc.jumpLink;
				}
				//html += '<tr><td>'+cpc.id+'</td>'
				html +=	'<tr align ="center"><td><span class="badge">'+cpc.clickNum+'</span></td>'
					 +	'<td>'+cpc.adName+'</td>'
					 +	'<td>'+adTypeMap[cpc.adType]+'</td>'
					 +	'<td>'+clientTypeMap[cpc.clientType]+'</td>'
					 +	'<td>'+cpc.phoneType+'</td>'
					 +	'<td>'+cpc.version+'</td>'
					 +	'<td>'+jumpTypeMap[cpc.jumpType]+'</td>'
					 +	'<td>'+jumpLink+'</td>'
					 +	'<td>'+cpc.dimension+'</td>'
					 +	'<td>'+cpc.channelId+'</td>'
					// +	'<td>'+cpc.deviceId+'</td>'
					 +'</tr>';
			}
			
			$('#advCpcTable').html(html);
		},
		error: function(obj, status, e){
			alert('发生错误: '+JSON.stringify(e));
		}
	});
}

function sort(l, attr, event){
	fastSort(l, 0, l.length-1, attr);
	prevent(event);
	return l;
}

function fastSortProcedure(l, b, e, a){
	var bb = b;
	var ee = e;
	var c = b;
	while(bb < ee){
		while(c < ee && l[c][a] >= l[ee][a]){
			ee--;
		}
		var tmp = l[ee];
		l[ee] = l[c];
		l[c] = tmp;
		c = ee;
		while(c > bb && l[bb][a] >= l[c][a]){
			bb++;
		}
		var tmp = l[bb];
		l[bb] = l[c];
		l[c] = tmp;
		c = bb;
	}
	return c;
}

function fastSort(l, b, e, a){
	if(b >= e){
		return;
	}
	n = fastSortProcedure(l, b, e, a);
	fastSort(l, b, n-1, a);
	fastSort(l, n+1, e, a);
}



