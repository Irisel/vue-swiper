function resolutionChoserActive(event){
	var resolutionChoser1 = $('#resolutionChoser');
	var resolutionChoserMenu1 = $('#resolutionChoserMenu');
	resolutionChoserMenu1.children().each(function(){
		$(this).click(function(event){
			resolutionChoser1.html($(this).text()+'<span class="caret"></span>');
			var e = event || window.event;
			e.preventDefault();
			e.returnValue = false;
		});
	});
	var resolutionChoser2 = $('#resolutionChoserAndroid');
	var resolutionChoserMenu2 = $('#resolutionChoserMenuAndroid');
	resolutionChoserMenu2.children().each(function(){
		$(this).click(function(event){
			resolutionChoser2.html($(this).text()+'<span class="caret"></span>');
			insertArgs.dimension = $(this).text();
			var e = event || window.event;
			e.preventDefault();
			e.returnValue = false;
		});
	});
	var resolutionChoser22 = $('#resolutionChoserIPhone');
	var resolutionChoserMenu22 = $('#resolutionChoserMenuIPhone');
	resolutionChoserMenu22.children().each(function(){
		$(this).click(function(event){
			resolutionChoser22.html($(this).text()+'<span class="caret"></span>');
			insertArgs.dimension = $(this).text();
			var e = event || window.event;
			e.preventDefault();
			e.returnValue = false;
		});
	});
	var resolutionChoser3 = $('#resolutionChoserWP');
	var resolutionChoserMenu3 = $('#resolutionChoserMenuWP');
	resolutionChoserMenu3.children().each(function(){
		$(this).click(function(event){
			resolutionChoser3.html($(this).text()+'<span class="caret"></span>');
			var e = event || window.event;
			e.preventDefault();
			e.returnValue = false;
		});
	});
	var resolutionChoser4 = $('#resolutionChoserAndroidPost');
	var resolutionChoserMenu4 = $('#resolutionChoserMenuAndroidPost');
	resolutionChoserMenu4.children().each(function(){
		$(this).click(function(event){
			resolutionChoser4.html($(this).text()+'<span class="caret"></span>');
			var e = event || window.event;
			e.preventDefault();
			e.returnValue = false;
		});
	});
}

function goToChoserActive(event){
	var jumpUrlBtn = $('#jumpUrlBtn');
	var jumpUrlMenu = $('#jumpUrlMenu');
	var jumpUrlAdd = $('#jumpUrlAdd');
	jumpUrlMenu.children().each(function(){
		$(this).click(function(event){
			jumpUrlBtn.html($(this).text()+'<span class="caret"></span>');
			insertArgs.jumpType = $(this).attr('value');
			$('#jumpUrlAdd').focus();
			jumpUrlAdd.attr('placeholder', $(this).text());
			var e = event || window.event;
			e.preventDefault();
			e.returnValue = false;
		});
	});
}

function displayPanel(id, platform, category, event){
	lastPanelId = id;
	lastPlatform = platform;
	lastCategory = category;
	args.platform = platform;
	args.category = category;
	if(!isPublishing){
		clearAllForm();
	}
	var title = null;
	var text = null;
	var tableId = null;
	switch(parseInt(category)){
		case 1:
			title = $('#slideAdDisplayTitle');
			tableId = 'slideAdvTable';
			text = '幻灯';
			break;
		case 2:
			title = $('#postAdDisplayTitle');
			tableId = 'hotelAdvTable';
			text = '磁贴';
			break;
		case 3:
			title = $('#postAdDisplayTitle');
			tableId = 'flightsAdvTable';
			text = '磁贴';
			break;
		case 4:
			title = $('#postAdDisplayTitle');
			tableId = 'purchaseAdvTable';
			text = '磁贴';
			break;
	}
	switch(parseInt(platform)){
		case 1:
			title.text('Iphone'+text+'广告');
			break;
		case 3:
			title.text('Android'+text+'广告');
			break;
		case 6:
			title.text('Windows Phone'+text+'广告');
			break;
	}
	if(args.category == 1){
		getTable(tableId);
	}
	for(var i = 0;i < panels.length; i++){
		$('#'+panels[i]).css('display', 'none');
	}
	$('#'+id).css('display', 'block');
	if(args.category == 2){
		$('#hotelTableA').click();
	}
	else if(args.category == 3){
		$('#flightsTableA').click();
	}
	else if(args.category == 4){
		$('#purchaseTableA').click();
	}
	if(event || window.event){
		var e = event || window.event;
		e.preventDefault();
		e.returnValue = false;
	}
}

function addPanel(category){
	clearAllForm();
	args.action = 'insert';
	insertArgs.id = null;
	args.category = category;
	var id = 'AdAddDiv';
	var text = null;
	$('#picServerUrlDiv').css('display', 'none');
	$('#isDefaultTextAdd').val('版本');
	insertArgs.isDefault = '1'
	if(parseInt(args.category) == 1){
		switch(parseInt(args.platform)){
			case 1:
				$('#clientTypeTextAdd').val(clientTypeMap['1']);
				$('#slideAdAddTitle').text('Iphone幻灯广告添加');
				$('#androidAndWPUploadForm').css('display', 'none');
				$('#iphoneUploadForm').css('display', 'block');
				break;
			case 3:
				$('#clientTypeTextAdd').val('Android');
				$('#slideAdAddTitle').text('Android幻灯广告添加');
				$('#androidAndWPUploadForm').css('display', 'block');
				$('#iphoneUploadForm').css('display', 'none');
				break;
			case 6:
				$('#clientTypeTextAdd').val('Windows Phone');
				$('#slideAdAddTitle').text('Windows Phone幻灯广告添加');
				$('#androidAndWPUploadForm').css('display', 'block');
				$('#iphoneUploadForm').css('display', 'none');
				break;
		}
		$('#adTypeTextAdd').val(adTypeMap['1']);
		$('#sortAdd').attr('disabled', false);
	}
	else if(parseInt(args.category) >= 2 && parseInt(args.category) <= 4){
		switch(category){
			case 2:
				text = '酒店';
				$('#adTypeTextAdd').val(adTypeMap['2']);
				break;
			case 3:
				text = '机票';
				$('#adTypeTextAdd').val(adTypeMap['3']);
				break;
			case 4:
				text = '团购';
				$('#adTypeTextAdd').val(adTypeMap['4']);
				break;
		}
		switch(parseInt(args.platform)){
			case 1:
				$('#clientTypeTextAdd').val(clientTypeMap['1']);
				$('#slideAdAddTitle').text('Iphone'+text+'磁贴广告添加');
				$('#androidAndWPUploadForm').css('display', 'none');
				$('#iphoneUploadForm').css('display', 'block');
				break;
			case 3:
				$('#clientTypeTextAdd').val(clientTypeMap['3']);
				$('#slideAdAddTitle').text('Android'+text+'磁贴广告添加');
				$('#androidAndWPUploadForm').css('display', 'block');
				$('#iphoneUploadForm').css('display', 'none');
				break;
			case 6:
				$('#clientTypeTextAdd').val(clientTypeMap['6']);
				$('#slideAdAddTitle').text('Windows Phone'+text+'磁贴广告添加');
				$('#androidAndWPUploadForm').css('display', 'block');
				$('#iphoneUploadForm').css('display', 'none');
				break;
		}
		$('#sortAdd').attr('disabled', 'disabled');
	}
	for(var i = 0;i < panels.length; i++){
		$('#'+panels[i]).css('display', 'none');
	}
	$('#'+id).css('display', 'block');
}

function updatePanelDisplay(field, event){
	addPanel(args.category);
	args.action = 'update';
	var id = $(field).parent().parent().attr('value');
	if(currentTableObj){
		var obj = null;
		for(var i = 0; i < currentTableObj.length; i++){
			if(currentTableObj[i].id == id){
				obj = currentTableObj[i];
				break;
			}
		}
		insertArgs.id = obj.id;
		if(args.platform == 1){
			$('#iphoneUploadForm').val(obj.picUrl);
			var dimensionText = obj.dimension;
			$('#resolutionChoserIPhone').html(dimensionText+'&nbsp;<span class="caret"></span>');
			insertArgs.dimension = obj.dimension+'';
		}
		else if(args.platform == 3 || args.platform == 6){
			$('#androidAndWPUploadForm').val(obj.picUrl);
			var dimensionText = obj.dimension;
			$('#resolutionChoserAndroid').html(dimensionText+'&nbsp;<span class="caret"></span>');
			insertArgs.dimension = obj.dimension+'';
		}
		insertArgs.picUrl = obj.picUrl;
		$('#picServerUrl').val(obj.picUrl);
		$('#picServerUrlDiv').css('display', 'block');
		$('#adNameAdd').val(obj.adName);
		$('#jumpUrlAdd').val(obj.jumpLink);
		var jumpTypeText = jumpTypeMap[obj.jumpType];
		$('#jumpUrlBtn').html(jumpTypeText+'&nbsp;<span class="caret"></span>');
		insertArgs.jumpType = obj.jumpType+'';
		$('#versionAdd').val(obj.version);
		$('#phoneTypeAdd').val(obj.phoneType);
		$('#sortAdd').val(obj.sort == '-1' ? '' : obj.sort);
		$('#channelIdAdd').val(obj.channelId);
		var isDefault = isDefaultMap[obj.isDefault];
		$('#isDefaultTextAdd').val(isDefault);
		insertArgs.isDefault = obj.isDefault;
		insertArgs.putStatus = obj.putStatus;
		var e = event || window.event;
		if(e){
			e.preventDefault();
			e.returnValue = false;
		}
	}
}

function retreat(){
	displayPanel(lastPanelId, lastPlatform, lastCategory, null);
}

function clicksStatisticsActive(event){
	for(var i = 0;i < panels.length; i++){
		$('#'+panels[i]).css('display', 'none');
	}
	$('#clicksStatistics').css('display', 'block');
	queryCpcList();
	var e = event || window.event;
	e.preventDefault();
	e.returnValue = false;
}

function clearAllForm(){
	$('input').each(function(){
		var field = $(this);
		if(field.attr('type') == 'file'){
			field.after(field.clone().val("")); 
			field.remove(); 
		}
		else{
			field.val('');
		}
	});
	$('.form-group').each(function(){
		$(this).removeClass('has-success').removeClass('has-error');
	});
	$('#resolutionChoserAndroid').html('请选择分辨率<span class="caret"></span>');
	$('#jumpUrlBtn').html('请选择&nbsp;<span class="caret"></span>');
	clearTab();
	clearArgs();
}

function clearArgs(){
	for(key in insertArgs){
		insertArgs[key] = null;
	}
	for(key in searchArgs){
		searchArgs[key] = '';
	}
}

function clearTab(){
	$('#tableList').children().each(function(){
		$(this).removeClass('active');
	});
	$($('#tableList').children()[0]).addClass('active');
	for(var i = 0; i < tables.length; i++){
		$('#'+tables[i]).css('display', 'none');
		$('#hotelTable').css('display', 'block');
	}
}

function postTableDisplayTabActive(field, id, tableId, category, event){
	args.category = category;
	lastCategory = category;
	$('#tableList').children().each(function(){
		$(this).removeClass('active');
	});
	$(field).parent().addClass('active');
	for(var i = 0; i < tables.length; i++){
		var table = $('#'+tables[i]);
		table.css('display', 'none');
	}
	$('#'+id).css('display', 'block');
	getTable(tableId);
	var e = event || window.event;
	if(e){
		e.preventDefault();
		e.returnValue = false;
	}
}

function dropdownActive(){
	var dropdown1 = $('#adTypeListSearch');
	var input1 = $('#adTypeTextSearch');
	dropdown1.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input1.val('');
				searchArgs.adType = '';
			}
			else{
				input1.val(text);
				searchArgs.adType = $(this).attr('value');
			}
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown2 = $('#jumpTypeList');
	var input2 = $('#jumpTypeText');
	dropdown2.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input2.val('');
				searchArgs.jumpType = '';
			}
			else{
				input2.val(text);
				searchArgs.jumpType = $(this).attr('value');
			}
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown3 = $('#dimensionList');
	var input3 = $('#dimensionText');
	dropdown3.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input3.val('');
				searchArgs.dimension = '';
			}
			else{
				input3.val(text);
				searchArgs.dimension = $(this).attr('value');
			}
			
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown4 = $('#clientTypeListSearch');
	var input4 = $('#clientTypeTextSearch');
	dropdown4.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input4.val('');
				searchArgs.clientType = '';
			}
			else{
				input4.val(text);
				searchArgs.clientType = $(this).attr('value');
			}
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	
	
	var dropdown5 = $('#adTypeListAdd');
	var input5 = $('#adTypeTextAdd');
	dropdown5.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input5.val('');
				insertArgs.adType = '';
			}
			else{
				input5.val(text);
				insertArgs.adType = $(this).attr('value');
			}
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown6 = $('#jumpTypeListAdd');
	var input6 = $('#jumpTypeTextAdd');
	dropdown6.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input6.val('');
				insertArgs.jumpType = ''
			}
			else{
				input6.val(text);
				insertArgs.jumpType = $(this).attr('value');
			}
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown7 = $('#dimensionListAdd');
	var input7 = $('#dimensionTextAdd');
	dropdown7.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input7.val('');
				insertArgs.dimension = '';
			}
			else{
				input7.val(text);
				insertArgs.dimension = $(this).attr('value');
			}
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown8 = $('#clientTypeListAdd');
	var input8 = $('#clientTypeTextAdd');
	dropdown8.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input8.val('');
				insertArgs.clientType = '';
			}
			else{
				input8.val(text);
			}
			$('#versionAdd').focus();
			insertArgs.clientType = $(this).attr('value');
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown9 = $('#isDefaultListAdd');
	var input9 = $('#isDefaultTextAdd');
	dropdown9.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input9.val('');
				insertArgs.isDefault = '';
			}
			else{
				input9.val(text);
			}
			insertArgs.isDefault = $(this).attr('value');
			$('#adNameAdd').focus();
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown10 = $('#dimensionListSlideSearch');
	var input10 = $('#dimensionSlideSearch');
	dropdown10.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input10.val('');
				searchArgs.dimension = '';
			}
			else{
				input10.val(text);
				searchArgs.dimension = $(this).attr('value');
			}
			
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown11 = $('#isDefaultListSlideSearch');
	var input11 = $('#isDefaultSlideSearch');
	dropdown11.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input11.val('');
				searchArgs.isDefault = '';
			}
			else{
				input11.val(text);
				searchArgs.isDefault = $(this).attr('value');
			}
			
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown12 = $('#dimensionListNotesSearch');
	var input12 = $('#dimensionNotesSearch');
	dropdown12.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input12.val('');
				searchArgs.dimension = '';
			}
			else{
				input12.val(text);
				searchArgs.dimension = $(this).attr('value');
			}
			
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
	var dropdown13 = $('#isDefaultListNotesSearch');
	var input13 = $('#isDefaultNotesSearch');
	dropdown13.children().each(function(){
		$(this).click(function(event){
			var text = $(this).text();
			if(text == '空'){
				input13.val('');
				searchArgs.isDefault = '';
			}
			else{
				input13.val(text);
				searchArgs.isDefault = $(this).attr('value');
			}
			
			var e = event || window.event;
			if(e){
				e.preventDefault();
				e.returnValue = false;
			}
		});
	});
}

function autoNext(id, event, y){
	var e = event || window.event;
	if(e && (e.keyCode == 9 || e.keyCode == 13)){
		if(y){
			$('#'+id).click();
		}
		else{
			$('#'+id).focus();
		}
		e.preventDefault();
		e.returnValue = false;
	}
}

function checkAll(tableId){
	var y = document.getElementById(tableId+'AllCheckbox').checked;
	var cbs = document.getElementsByName(tableId+'Checkbox');
	for(var i = 0; i < cbs.length; i++){
		cbs[i].checked = y;
	}
}

function prevent(event){
	var e = event || window.event;
	if(e){
		e.preventDefault();
		e.returnValue = false;
	}
}

$(document).ready(function(){
	resolutionChoserActive();
	goToChoserActive();
	dropdownActive();
	getTable('slideAdvTable');
	initForm();
});