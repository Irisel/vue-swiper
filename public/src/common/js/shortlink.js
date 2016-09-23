var datatable;
var datatable1;
function initDataTable(){
	datatable=$('#AllShortlinkDataTable');
	datatable.dataTable( {
		"aLengthMenu":[10,20,50,100,200],
		"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sLengthMenu": "_MENU_ 每页条数"
		},
		"bDestroy": true
	} );
	datatable1=$('#ShortlinkStatTable');
	datatable1.dataTable( {
		"aLengthMenu":[24,30,50,100,200],
		"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sLengthMenu": "_MENU_ 每页条数"
		},
		"bDestroy": true
	} );
}

function getShortLink(){
	linkType = $('#linkType').val();
	linkKey = $('#linkKey').val();
	groupid = $('#groupid').val();
	creater = $('#creater').val();
	channelId = $('#channelid').val();
	startTime = $('#time1').val();
	endTime = $('#time2').val();
	$.ajax({
		url : '/shortLink/getshortlink',
		data : {
			'linkType':linkType,
			'linkKey':linkKey,
			'groupid':groupid,
			'creater':creater,
			'channelId':channelId,
			'startTime':startTime,
			'endTime':endTime,
		},
		success : function(result) {
			$("#AllShortlinkDataTable tr:gt(0)").remove();
			var html="";
			datatable.fnClearTable();
			dataLists = eval(result);
			for (var i=0; i<dataLists.length; i++){
				var dataList = dataLists[i];	
				var shortLink = dataLists[0].shortLink+dataList.linkKey;
				html+='<tr>';
				
				html+='<td>'+dataList.id+'</td>';
				html+='<td><a class="brand" href="'+shortLink+'" target="_blank">'+shortLink+'</a></td>';
				//html+='<td><a class="brand" href="/shortLink/getLongLink?linkType='+linkType+'&linkId='+dataList.id+'" target="_blank">'+shortLink+'</a></td>';
				html+='<td>'+dataList.linkKey+'</td>';
				html+='<td>'+dataList.groupId+'</td>';
				html+='<td>'+dataList.creater+'</td>';
				html+='<td>'+new Date(parseInt(dataList.createTime)).toLocaleString().replace(/:\d{1,2}$/,' ')+'</td>';
				html+='<td>'+dataList.description+'</td>';
				html+='<td><a class="brand" href="/shortLink/edit?linkType='+linkType+'&id='+dataList.id+'"><span>编辑</span></a></td>';
				html+='<td><a class="brand" href="/shortLink/shortlinkstat?linkType='+linkType+'&groupid='+dataList.groupId+'&linkKey='+dataList.linkKey+'"><span>统计</span></a></td>';
				
				html+='</tr>';
			}
			$('#AllShortlinkDataTable tbody').append(html);
			datatable.dataTable( {
				"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "_MENU_ 每页条数"
				},
				"bDestroy":true
			} );
		},
		error : function() {
			alert("读取数据失败");
		}
	})
}

function updataAllLink(){
	uchannelid = $('#uchannelid').val();
	ulink = $('#ulink').val();
	
	if (uchannelid==""){
		alert("渠道号不能为空");
		return;
	}
	
	if (ulink==""){
		alert("链接地址不能为空");
		return;
	}
	
	$.ajax({
		url:'/shortLink/updataByChannel',
		data:{
			'ulink':ulink,
			'uchannelid':uchannelid,
			
		},
		success:function(result){
			alert(result);
		},
		error:function(){
			alert("更新失败！");
		}
	})
}

function changeshortLink(){
	html = "";
	linkType=$("#linkType").val();
    if (linkType=="2"){
    	html = downloadLink_pre;
    }else{
    	html = activeLink_pre;
    }
    $("#shortLink").attr("value",html+$('#linkKey').val());
	
}

function reloadpage(downloadLink){
	$("#flag").val("0");
	linkType=$("#linkType").val();
	if (linkType=="2"){
		if (downloadLink==null){
			downloadLink = defaultDownloadLink();
		}
		$("#shortLink").attr("value",downloadLink_pre);
		$("#linkAddress").html(downloadAddress(downloadLink));
	}else{
		$("#shortLink").attr("value",activeLink_pre);
		$("#linkAddress").html(activityAddress(""));
	}
	
}

function defaultDownloadLink(){
	var downloadLink= new Array();
	downloadLink.push(Downloadaddr("Android","myelong",android_defaulturl));
	downloadLink.push(Downloadaddr("iPhone","ewiphone","http://itunes.apple.com/cn/app/id388089858?mt=8"));
	downloadLink.push(Downloadaddr("iPad","ewipad","http://itunes.apple.com/cn/app/yi-long-wu-xianhd-jiu-dian/id519693318?mt=8"));
	downloadLink.push(Downloadaddr("Windows8 PC","ewin8app","http://apps.microsoft.com/windows/zh-cn/app/c3440b5c-5ab9-4269-ab87-f943b15a380d"));
	downloadLink.push(Downloadaddr("Other PC","ewhtml5","http://www.elong.com?ref=delongcn"));
	downloadLink.push(Downloadaddr("Windows Phone 8","ewinphone","http://www.windowsphone.com/s?appid=c8e66617-1eac-4aed-a6e3-09f307353ac0"));
	downloadLink.push(Downloadaddr("Windows Phone 7","ewinphone","http://www.windowsphone.com/zh-cn/store/app/%E8%89%BA%E9%BE%99%E6%97%A0%E7%BA%BF/56b0b22d-d187-48d5-9017-3b6bc159528f"));
	downloadLink.push(Downloadaddr("Others","ewhtml5","http://m.elong.com?ref=delongcn"));
	
	return downloadLink;
}

function activityAddress(url){
	html='<span class="add-on">活动链接地址：</span>';
	html+='<input	class="input-big search-query linkAddress" type="text" id="activityLink" name="activityLink" value="'+url+'">';
	return html;
}

function downloadAddress(downloadLink){
	html='<table id="downloadLinkTable" class="table table-striped  table-condensed">';
	html+='<tr align="center"><th width="10%"><a>系统</a></th><th width="10%"><a>渠道号</a></th><th width="80%"><a>下载地址</a></th> </tr>';
	for (var i=0;i<downloadLink.length;i++){
		var d = downloadLink[i];
		html+='<tr><td>'+d.client+'</td><td><input class="input-small search-query" type="text" id="channel'+d.client+'" value="'+d.channel+'"></td>';
		html+='<td><input class="input-big search-query linkAddress" type="text" id="address'+d.client+'" value="'+d.address+'"></td></tr>';
		
	}	
	html+='</table>';
	return html;
}

function Downloadaddr(client,channel,address){
	var d=new Object;
	d.client=client;
	d.channel=channel;
	d.address=address;
	return d
}

function updatepage(shortLink,linkAddress,creater,description,linkKey, groupId, linkType){
	$("#shortLink").attr("value",shortLink);
	$("#linkAddress").html(linkAddress);
	$("#creater").attr("value",creater);
	$("#creater").attr("readonly","readonly");
	$("#description").html(description);
	$("#linkKey").attr("value",linkKey);
	$("#linkKey").attr("readonly","readonly");
	$("#groupId").attr("value",groupId);
	$("#linkType").val(linkType);
	$("#linkType").attr("disabled","disabled");
	
}

function convertDownlodares(resource){
	var resList = $.parseJSON(resource);
	var downloadLink= new Array();
	var client=["Android","iPhone","iPad","Windows8 PC","Other PC", "Windows Phone 8","Windows Phone 7","Others"];
	for (var i=0; i<resList.length; i++){
		var r = resList[i];
		downloadLink.push(Downloadaddr(client[r.typeId-1],r.channelId,r.url));
	}
	return downloadLink;
}

function initdownloadlink(){
	$("#flag").val("0");
	if (edit_linkType=="1"){
		var activitylink = eval("("+edit_activityLink+")");
		
		var shortLink=activeLink_pre+activitylink.linkKey;
		updatepage(shortLink, activityAddress(activitylink.url), activitylink.creater, activitylink.description,
				activitylink.linkKey,activitylink.groupId,"1");
		$("#intermediatepage").attr("disabled","disabled");
	}else if(edit_linkType=="2"){
		var downloadLink = $.parseJSON(edit_downloadLink);
		var shortLink=downloadLink_pre+downloadLink.linkKey;
		updatepage(shortLink, downloadAddress(convertDownlodares(edit_downloadResource)), downloadLink.creater, downloadLink.description,
				downloadLink.linkKey,downloadLink.groupId,"2");
		$("#intermediatepage").val(downloadLink.type);
	}else{
		var downloadLink= new Array();
		reloadpage(downloadLink);
	}
	
}

function checkReq(){
	if($("#groupId").val()==""){
		alert("组号不能为空")
		return false;
	}
	if($("#creater").val()==""){
		alert("创建人不能为空")
		return false;
	}
	if($("#linkKey").val()==""){
		alert("linkkey不能为空")
		return false;
	}
	if ($("#linkKey").val().length>16){
		alert("linkkey的长度不能大于16")
		return false;
	}
	if($("#description").val()==""){
		alert("描述不能为空")
		return false;
	}
	
	return true;
}

function checkDownloadLink(downloadLinkInfo){
    for (var i=0; i<downloadLinkInfo.length; i++){
		var r = downloadLinkInfo[i];
		$.trim(r);
		if (r==""){
			alert("链接地址和渠道号都不能为空")
			return false;
		}
		if (r.indexOf(' ')!=-1){
			alert("链接地址和渠道号中间不能有空格，请仔细检查")
			return false;
		}
	}
    return true;
}

function saveShortLink(){
	if (!checkReq()){
		return
	}
	linkType=$("#linkType").val();
	intermediatepage=$("#intermediatepage").val();
	groupId=$("#groupId").val();
	creater=$("#creater").val();
	linkKey=$("#linkKey").val();
	description=$("#description").val();
	
	var flag= $("#flag").val();
	if(flag=="0"){	//单个的处理	
	id=edit_id;
	
	if (linkType==1){
		activityLink=$("#activityLink").val();
		if (activityLink==""){
			alert("活动链接地址不能为空")
			return
		}
		$.ajax({
			url:'/shortLink/addActivityLink',
			data:{
				'groupId':groupId,
				'creater':creater,
				'linkKey':linkKey,
				'description':description,
				'activityLink':activityLink,	
				'id':id
			},
			success:function(result){
				if (result==-1){
					alert("linkKey已经存在，请换一个！");
				}else{
					window.location.href=document.referrer; 
					//window.history.back(-1);
				}	
			},
			error:function(){
				alert("添加失败！");
			}
		})
				
	}else{
		var downloadLinkInfo = new Array();  
        $('#downloadLinkTable input').each(function(){ 
        	downloadLinkInfo.push($(this).val());
        });
        
        if (!checkDownloadLink(downloadLinkInfo)){
        	return;
        }
        downloadLink=JSON.stringify(downloadLinkInfo);
        
		$.ajax({
			url:'/shortLink/addDownloadLink',
			data:{
				'intermediatepage':intermediatepage,
				'groupId':groupId,
				'creater':creater,
				'linkKey':linkKey,
				'description':description,
				'downloadLink':downloadLink,
				'id':id
			},
			success:function(result){
				if (result==-1){
					alert("linkKey已经存在，请换一个！");
				}else{
					 window.location.href=document.referrer; 
					//window.history.back(-1);
				}	
			},
			error:function(){
				alert("添加失败！");
			}
		})
				
	}
 }
	else { 
		var batchNumStart = $("#batchNumStart").val();
		var batchNumEnd = $("#batchNumEnd").val()
		if(isNaN(batchNumStart)||isNaN(batchNumEnd)){
			batchNumStart=1;
			batchNumEnd=1;
		}
		batchNumStart=Math.round(batchNumStart);
		batchNumEnd=Math.round(batchNumEnd);
		if(batchNumStart<1){
			alert("批量数目不能为小于1的数!");
			return;
		}
		if(batchNumEnd>9999){
			alert("批量数目不能大于9999的数!");
			return;
		}
		if(flag==1){//批量活动短链
		activityLink=$("#activityLink").val();
		if (activityLink==""){
			alert("活动链接地址不能为空")
			return
		}
		$.ajax({
			url:'/shortLink/addBatchActivityLink',
			data:{
				'groupId':groupId,
				'creater':creater,
				'linkKey':linkKey,
				'description':description,
				'activityLink':activityLink,
				'batchNumStart':batchNumStart,
				'batchNumEnd':batchNumEnd
			},
			success:function(result){
				if (result<0){
					alert("有"+ result+"个linkKey已经存在，其他的已经保存！");
				}else{
					window.location.href=document.referrer; 
					//window.history.back(-1);
				}	
			},
			error:function(){
				alert("添加失败！");
			}
		})
	}
	else if(flag==2){//批量下载短链  
		var webOrApp =$("#webOrApp").val();
		var traveOrHotel=$("#traveOrHotel").val();
		var downloadLinkInfo = new Array();  
        $('#downloadLinkTable input').each(function(){ 
        	downloadLinkInfo.push($(this).val());
        });
        
        if (!checkDownloadLink(downloadLinkInfo)){
        	return;
        }
        downloadLink=JSON.stringify(downloadLinkInfo);
		$.ajax({
			url:'/shortLink/addBatchDownloadLink',
			data:{
				'intermediatepage':intermediatepage,
				'groupId':groupId,
				'creater':creater,
				'linkKey':linkKey,
				'description':description,
				'batchNumStart':batchNumStart,
				'batchNumEnd':batchNumEnd,
				'downloadLink':downloadLink,
				'webOrApp':webOrApp,
				'traveOrHotel':traveOrHotel
			},
			success:function(result){
				if (result==-1){
					alert("linkKey已经存在，请换一个！");
				}else{
					 window.location.href=document.referrer; 
					//window.history.back(-1);
				}	
			},
			error:function(){
				alert("添加失败！");
			}
		})
	}
  }
}

function cancel(){
	 window.history.back(-1);   
}

function loadstat(){
	linkType = $('#linkType').val();
	linkKey = $('#linkKey').val();
	groupid = $('#groupid').val();
	startTime = $('#time1').val();
	endTime = $('#time2').val();
	channelId = $('#channelid').val();
	pvuv = $('#pvuv').val();
	dateType = $('#dateType').val();
	$.ajax({
		url : '/shortLink/getStat',
		data : {
			'linkType':linkType,
			'linkKey':linkKey,
			'groupid':groupid,
			'channelId':channelId,
			'startTime':startTime,
			'endTime':endTime,
			'pvuv':pvuv,
			'dateType':dateType
		},
		success : function(result) {
			$("#ShortlinkStatTable tr:gt(0)").remove();
			var html="";
			datatable1.fnClearTable();
			dataLists = eval(result);
			for (var i=0; i<dataLists.length; i++){
				var dataList = dataLists[i];				
				html+='<tr>';
				for (var j=0; j<dataList.length;j++){
					html+='<td>'+dataList[j]+'</td>';
				}
			html+='</tr>';
			}
			$('#ShortlinkStatTable tbody').append(html);
			datatable1.dataTable( {
				"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "_MENU_ 每页条数"
				},
				"bDestroy":true
			} );
		},
		error : function() {
			alert("读取数据失败");
		}
	})
}

function exportRecords(){
	linkType = $('#linkType').val();
	linkKey = $('#linkKey').val();
	groupid = $('#groupid').val();
	startTime = $('#startTime').val();
	endTime = $('#endTime').val();
	channelId = $('#channelid').val();
	pvuv = $('#pvuv').val();
	dateType = $('#dateType').val();
	window.location.href="/shortLink/exportRecords?"+		
	"linkType="+linkType+"&linkKey="+linkKey+"&groupid="+groupid+"&startTime="
	+startTime+"&endTime="+endTime+"&channelid="+channelid+"&pvuv="+pvuv+"&dateType="+dateType;	
}

function getQR(){
	shortLink = $('#shortLink').val();
	var url = "http://qr.liantu.com/api.php?w=2000&text="+shortLink;
	window.open(url);
}


//批量生成短链
function batchShortLinkGenerate(){
	var html="";
	linkType=$("#linkType").val();
	html+='&nbsp;<span class="add-on">批量数目从：</span> <input  class="input-mini"  id="batchNumStart" type="text" value="1"><span class="add-on">到：</span> <input  class="input-mini"  id="batchNumEnd" type="text" value="1">' ;
	if(linkType==2){//下载短链
		$("#flag").val("2");
		html+='<span class="add-on">网站\App：</span><select class="input-small"  id="webOrApp" name="webOrApp" onchange="setbatchvalue()"><option selected="selected" value="a">APP</option><option value="w">网站</option> </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' 
		html+='<span class="add-on">旅行\酒店：</span><select class="input-small"  id="traveOrHotel" name="traveOrHotel" onchange="setbatchvalue()"><option selected="selected" value="t">旅行</option><option value="h">酒店</option> </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' 
		html+="<div>"+downloadAddress(defaultDownloadLink())+"</div>";
		$("#linkAddress").html(html);	
	}

	if(linkType==1){//活动短链
		$("#flag").val("1");
		html+="<div>"+activityAddress("")+"</div>";
	}
	$("#linkAddress").html(html);
	$("#shortLink").attr("value",downloadLink_pre);
	setbatchvalue();
}

// 设置批量生成下载链接时，iphone 的address
function setbatchvalue(){
	traveOrHotel = $("#traveOrHotel").val();
	webOrApp = $("#webOrApp").val();
	batchNumStart = $("#batchNumStart").val();
	if (traveOrHotel=='h'){
		$("#addressiPhone").attr("value","https://itunes.apple.com/cn/app/yi-long-jiu-dian-jiu-dian/id629502680?mt=8");
	}else{
		$("#addressiPhone").attr("value","http://itunes.apple.com/cn/app/id388089858?mt=8");
	}
	linkKey = $('#linkKey').val();
	channel = linkKey+webOrApp+traveOrHotel+batchNumStart;
	if (linkKey!=null && linkKey!=""){
		$("#channeliPhone").attr("value",channel+"i");
		$("#channelAndroid").attr("value",channel+"a");
	}
}
