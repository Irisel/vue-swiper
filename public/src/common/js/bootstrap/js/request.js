function fillInsertForm(){
	insertArgs.adName = $('#adNameAdd').val();
	insertArgs.phoneType = $('#phoneTypeAdd').val();
	insertArgs.version = $('#versionAdd').val();
	insertArgs.jumpLink = $('#jumpUrlAdd').val();
	insertArgs.channelId = $('#channelIdAdd').val();
	insertArgs.adType = args.category+'';
	insertArgs.clientType = args.platform+'';
	if(args.category == 1){
		insertArgs.sort = $('#sortAdd').val();
	}
	else{
		insertArgs.sort = '-1';
	}
	if(!insertArgs.dimension){
		insertArgs.dimension = '';
	}
}

function insertAdvConfirm(){
	fillInsertForm();
	if(validateInsertForm()){
		args.args = JSON.stringify(insertArgs);
		$.post('../advManager/insertOrUpdateAdv', args, function(data, status, obj){
			alert(data);
			retreat();
		}, 'html');
	}
}

function fileUpload(){
	var form = null;
	if(parseInt(args.platform) == 1){
		form = document.getElementById('iphoneUploadForm');
	}
	else if(parseInt(args.platform) == 3 || parseInt(args.platform) == 6){
		form = document.getElementById('androidAndWPUploadForm');
	}
	form.enctype = 'multipart/form-data';
	form.encoding = 'multipart/form-data';
	form.target = 'hideIframe';
	var file = $($(form).children().find('input')[0]);
	var name = file.val();
	var vr = validateFile(name);
	if(!vr[0]){
		alert(vr[1]);
		file.parent().parent().removeClass('has-success').addClass('has-error');
		return;
	}
	file.parent().parent().removeClass('has-error').addClass('has-success');
	$(form).children().find('div.form-group').removeClass('has-error').addClass('has-success');
	var btn = $('#adAddConfirmBtn');
	btn.attr('disabled', 'disabled');
	btn.css('background-image', 'url(../common/img/loading.gif)');
	btn.css('background-repeat', 'no-repeat');
	btn.css('background-position', 'center');
	form.submit();
}

function uploadFinish(msg, picUrl){
	alert(msg);
	window.parent.insertArgs.picUrl = picUrl;
	var p = $(window.parent.document.getElementById('picServerUrl'));
	var pDiv = $(window.parent.document.getElementById('picServerUrlDiv'));
	p.val(picUrl);
	pDiv.css('display', 'block');
	var btn = $(window.parent.document.getElementById('adAddConfirmBtn'));
	if(btn){
		btn.attr('disabled', null);
		btn.css('background-image', '');
	}
	$(window.parent.document.getElementById('isDefaultBtn')).click();
}

function validateFile(name){
	var admit = false;
	var msg = '图片格式不符合要求，请重新选择';;
	if(!name || name.trim() == ''){
		msg = '请选择您要上传的图片';
		return [admit, msg];
	}
	var suffix = name.substring(name.lastIndexOf('.')+1).toLowerCase();
	for(var i = 0; i < permissionSuffixes.length; i++){
		if(suffix == permissionSuffixes[i]){
			admit = true;
			msg = '';
			break;
		}
	}
	if(parseInt(args.platform) != 1){
		var resolution = $('#resolutionChoserAndroid').text().trim();
		if(!resolution || resolution == '请选择分辨率'){
			admit = false;
			msg = '请选择分辨率';
		}
	}
	return [admit, msg];
}

function validateInsertForm(){
	if(!vf(insertArgs.picUrl)){
		alert('请先上传图片');
		if(parseInt(args.platform) == 1){
			$($('#iphoneUploadForm').children().find('input')[0]).parent().parent().removeClass('has-success').addClass('has-error');
		}
		else if(parseInt(args.platform) == 3 || parseInt(args.platform) == 6){
			$($('#androidAndWPUploadForm').children().find('input')[0]).parent().parent().removeClass('has-success').addClass('has-error');
		}
		return false;
	}
	if(!vf(insertArgs.adName)){
		alert('广告名称不能为空');
		hfc('adNameAdd');
		return false;
	}
	if(!vf(insertArgs.adType)){
		alert('广告类型不能为空');
		hfc('adTypeTextAdd');
		return false;
	}
	if(!vf(insertArgs.jumpType)){
		alert('请选择跳转类型');
		hfc('jumpUrlAdd');
		return false;
	}
	if(!vf(insertArgs.jumpLink)){
		alert('跳转链接不能为空');
		hfc('jumpUrlAdd');
		return false;
	}
	if(!vf(insertArgs.clientType)){
		alert('客户端类型不能为空');
		hfc('clientTypeTextAdd');
		return false;
	}
	if(!vf(insertArgs.version)){
		alert('版本不能为空');
		hfc('versionAdd');
		return false;
	}
	if(!vf(insertArgs.sort, true)){
		alert('广告顺序不能为空，且必须为有效数字');
		hfc('sortAdd');
		return false;
	}
//	if(!vf(insertArgs.channelId)){
//		alert('渠道号不能为空');
//		hfc('channelIdAdd');
//		return false;
//	}
	hfc();
	return true;
}

function vf(value, isNum){
	if(!value || value.trim() == ''){
		return false;
	}
	if(isNum && !/[0-9\\-]+/.test(value)){
		return false;
	}
	return true;
}

function hfc(id){	//为指定表单添加错误样式，清除其他表单样式
	for(var i = 0; i < insertFields.length; i++){
		$('#'+insertFields[i]).parent().removeClass('has-success').removeClass('has-error');
		if(id == insertFields[i]){
			$('#'+insertFields[i]).parent().addClass('has-error');
		}
	}
	for(var i = 0; i < insertFields2.length; i++){
		$('#'+insertFields2[i]).parent().parent().removeClass('has-success').removeClass('has-error');
		if(id == insertFields2[i]){
			$('#'+insertFields2[i]).parent().parent().addClass('has-error');
		}
	}
}

function getTable(tableId, begin, length, event){
	prevent(event);
	currentTableId = tableId;
	var phoneType = null;
	var version = null;
	var channelId = null;
	var jumpLink = null;
	if(args.category == 1){
		phoneType = $('#phoneTypeSlideSearch').val();
		version = $('#versionSlideSearch').val();
		channelId = $('#channelIdSlideSearch').val();
		dimension = $('#dimensionSlideSearch').val();
	}
	else if(args.category == 2 || args.category == 3 || args.category == 4){
		phoneType = $('#phoneTypeNotesSearch').val();
		version = $('#versionNotesSearch').val();
		channelId = $('#channelIdNotesSearch').val();
		dimension = $('#dimensionNotesSearch').val();
	}
	var begin = begin || 0;
	var length = length || pageSize;
	if(isPublishing){
		begin = lastBegin;
		isPublishing = false;
	}
	lastBegin = begin;
	data = {
		clientType: args.platform,
		adType: args.category,
		phoneType: phoneType,
		version: version,
		channelId: channelId,
		dimension: dimension,
		isDefault:searchArgs.isDefault,
		begin: begin,
		length: length
	};
	$.get('../advManager/selectAdvByConditions', data, function(data, status, obj){
		assembleTable(tableId, data, begin, length);
	}, 'json');
}

function assembleTable(tableId, json, begin, length){
	var table = $('#'+tableId);
	var html = '<thead align="center"><tr><th><input type="checkbox" id="'+tableId+'AllCheckbox" onclick="checkAll(\''+tableId+'\')"/></th><th>广告名称</th><th>跳转类型</th><th>跳转链接</th><th>机型</th><th>版本</th><th>渠道号</th><th>图片尺寸</th><th>展示类型</th><th>发布状态</th><th>发布</th><th>修改</th><th>删除</th></tr></thead><tbody>';
	var obj = eval(json);
	currentTableObj = obj.l;
	var total = parseInt(obj.total);
	for(var i = 0; i < currentTableObj.length; i++){
		var item = currentTableObj[i];
		var jumpType = jumpTypeMap[item.jumpType];
		var dimension = item.dimension;
		if(!dimension){
			dimension = '-';
		}
		var publishHtml = null;
		var publishBtn = null;
		if(item.putStatus == '0'){
			publishHtml = '<font color="red">未发布</font>';
			publishBtn = '<a href="#" class="btn btn-success btn-sm" onclick="publishOne(this, true, event)">发布</a>';
		}
		else if(item.putStatus == '1'){
			publishHtml = '<font color="green">已发布</font>';
			publishBtn = '<a href="#" class="btn btn-info btn-sm" onclick="publishOne(this, false, event)">撤销</a>';
		}
		var jumpLink = item.jumpLink.substring(0, item.jumpLink.indexOf(':'));
		var displayType = isDefaultMap[item.isDefault];
		
		html += '<tr align="center" value="'+item.id+'"><td align="left"><input type="checkbox" name="'+tableId+'Checkbox"/></td><td>'+item.adName+'</td><td>'
			+jumpType+'</td><td>'+jumpLink+'</td><td>'+item.phoneType+
			'</td><td>'+item.version+'</td><td>'+item.channelId+'</td><td>'+dimension+'</td><td>'+displayType+'</td><td>'+publishHtml+'</td>'+
			'</td><td>'+publishBtn+'</td>'+
			'<td><a href="#" class="btn btn-warning btn-sm" onclick="updatePanelDisplay(this, event)">修改</a></td>'+
			'<td><a href="#" class="btn btn-default btn-sm" onclick="deleteOne(this, event)">删除</a></td></tr>';
	}
	html += '</tbody>';
	table.html(html);
	
	var n = 4;
	var paginationDivId = null;
	var paginationId = null;
	if(args.category == 1){
		paginationDivId = 'slideAdvPaginationDiv';
		paginationId = 'slideAdvPagination';
	}
	else if(args.category == 2 || args.category == 3 || args.category == 4){
		paginationDivId = 'postAdvPaginationDiv';
		paginationId = 'postAdvPagination';
	}
	if(total > 0){
		var currentPage = parseInt(parseInt(begin)/pageSize+1);
		var totalPage = parseInt((parseInt(total)+pageSize-1)/pageSize);
		var html = '<li><a href="#" onclick="getTable(\''+tableId+'\', 0, '+pageSize+', event)">首页</a></li>';
		if(currentPage <= 1){
			html += '<li class="disabled"><a href="#" onclick="prevent(event)">&laquo;</a></li>';
		}
		else{
			html += '<li><a href="#" onclick="getTable(\''+tableId+'\', '+((currentPage-2)*pageSize)+', '+pageSize+', event)">&laquo;</a></li>';
		}
		var s = currentPage-n < 0 ? 0 : currentPage-n;
		var e = totalPage < currentPage+n-1 ? totalPage : currentPage+n-1;
		for(var i = s; i < currentPage-1; i++){
			html += '<li><a href="#" onclick="getTable(\''+tableId+'\', '+(i*pageSize)+', '+pageSize+', event)">'+(i+1)+'</a></li>';
		}
		html += '<li class="active"><a href="#" onclick="prevent(event)">'+(i+1)+'</a></li>';
		for(var i = currentPage; i < e; i++){
			html += '<li><a href="#" onclick="getTable(\''+tableId+'\', '+(i*pageSize)+', '+pageSize+', event)">'+(i+1)+'</a></li>';
		}
		if(currentPage >= totalPage){
			html += '<li class="disabled"><a href="#" onclick="prevent(event)">&raquo;</a></li>';
		}
		else{
			html += '<li><a href="#" onclick="getTable(\''+tableId+'\', '+(currentPage*pageSize)+', '+pageSize+', event)">&raquo;</a></li>'
		}
		html += '<li><a href="#" onclick="getTable(\''+tableId+'\', '+((totalPage-1)*pageSize)+', '+pageSize+', event)">尾页</a></li>'
		html += '<li><a href="#" onclick="prevent(event)">共'+totalPage+'页</li>';
		$('#'+paginationId).html(html);
		$('#'+paginationDivId).css('display', 'block');
	}
	else{
		$('#'+paginationDivId).css('display', 'none');
	}
}

function collectChosenId(tableId){
	var cbs = document.getElementsByName(tableId+'Checkbox');
	var ids = [];
	for(var i = 0; i < cbs.length; i++){
		if(cbs[i].checked){
			ids.push($(cbs[i]).parent().parent().attr('value'));
		}
	}
	if(ids.length == 0){
		return false;
	}
	return JSON.stringify(ids);
}

function doDelete(arg){
	$.ajax({
		url: '../advManager/deleteAdv',
		data: arg,
		type: 'POST',
		success: function(data, status, obj){
			retreat();
			alert(data);
		},
		error: function(obj, status, e){
			alert('发生错误: '+JSON.stringify(e));
		},
		dataType: 'html'
	});
}

function deleteOne(field, event){
	var ids = [];
	var id = $(field).parent().parent().attr('value');
	ids.push(id);
	var arg = {
		ids: JSON.stringify(ids)
	};
	if(confirm('确认删除?')){
		doDelete(arg);
	}
	var e = event || window.event;
	if(e){
		e.preventDefault();
		e.returnValue = false;
	}
}

function deleteMany(event){
	var tableId = null;
	if(args.category == 1){
		tableId = 'slideAdvTable';
	}
	else if(args.category == 2){
		tableId = 'hotelAdvTable';
	}
	else if(args.category == 3){
		tableId = 'flightsAdvTable';
	}
	else if(args.category == 4){
		tableId = 'purchaseAdvTable';
	}
	var ids = collectChosenId(tableId);
	if(!ids){
		alert('请选择要删除的记录');
		return;
	}
	var arg = {
		ids: ids
	};
	if(confirm('确认删除?')){
		doDelete(arg);
	}
	var e = event || window.event;
	if(e){
		e.preventDefault();
		e.returnValue = false;
	}
}

function doPublish(arg){
	$.post('../advManager/publishOrWithdrawAdv', arg, function(data, status, obj){
		isPublishing = true;
		retreat();
		alert(data);
	}, 'html');
}

function publishOne(field, isPublish, event){
	var action = isPublish == true ? 'publish' : 'withdraw';
	var ids = [];
	var id = $(field).parent().parent().attr('value');
	ids.push(id);
	var arg = {
		ids: JSON.stringify(ids),
		action: action
	};
	doPublish(arg);
	prevent(event);
}

function publishMany(event){
	var tableId = null;
	if(args.category == 1){
		tableId = 'slideAdvTable';
	}
	else if(args.category == 2){
		tableId = 'hotelAdvTable';
	}
	else if(args.category == 3){
		tableId = 'flightsAdvTable';
	}
	else if(args.category == 4){
		tableId = 'purchaseAdvTable';
	}
	var ids = collectChosenId(tableId);
	if(!ids){
		alert('请选择要发布的记录');
		return;
	}
	var arg = {
		ids: ids,
		action: 'publish'
	};
	doPublish(arg);
	prevent(event);
}

function initForm(){
	$.get('../advManager/initForm', null, function(data, status, jqObj){
		var obj = eval(data);
		assembleAdType(eval('('+obj.adType+')'));
		assembleClientType(eval('('+obj.clientType+')'));
		assembleDimension(eval('('+obj.dimension+')'));
		dropdownActive();
		resolutionChoserActive();
		goToChoserActive();
	}, 'json');
}

function assembleAdType(obj){
	if(obj){
		adTypeMap = {};
		var html = '';
		for(var k in obj){
			adTypeMap[k] = obj[k];
			html += '<li value="'+k+'"><a href="#">'+obj[k]+'</a></li>';
		}
		$('#adTypeListAdd').html(html);
		var emptyOption = '<li value=""><a href="#">空</a></li>';
		$('#adTypeListSearch').html(emptyOption+html);
	}
}

function assembleClientType(obj){
	if(obj){
		clientTypeMap = {};
		var html = '<li value="0"><a href="#">空</a></li>';
		for(var k in obj){
			clientTypeMap[k] = obj[k];
			html += '<li value="'+k+'"><a href="#">'+obj[k]+'</a></li>';
		}
		$('#clientTypeListAdd').html(html);
		$('#clientTypeListSearch').html(html);
	}
}

function assembleDimension(obj){
	if(obj){
		var html = '<li value="0"><a href="#">空</a></li>';
		for(var i = 0; i < obj.length; i++){
			html += '<li value="'+obj[i]+'"><a href="#">'+obj[i]+'</a></li>';
		}
		$('#resolutionChoserMenuAndroid').html(html);
		$('#resolutionChoserMenuIPhone').html(html);
		$('#dimensionList').html(html);
		$('#dimensionListSlideSearch').html(html);
		$('#dimensionListNotesSearch').html(html);
	}
}