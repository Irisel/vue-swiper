var errDesList = new Array();

//下面这3个数组应该是为了以前排序用的
//存放报警规则的页面列表
var alarmRuleLists = new Array();
//存放忽略规则的页面列表
var ignoreRuleLists = new Array();
//存放收敛规则的页面列表
var convergenceRuleLists = new Array();

//！现在不用了，原来排序的代码
//对规则按编号排序
function compare(a,b){
	var str = a.toString();
	var str2 = b.toString();
	
	var index1 = str.indexOf('(');
	var index2 = str.indexOf(')');
	var index3 = str2.indexOf('(');
	var index4 = str2.indexOf(')');
	
	str = str.substring(index1+1,index2);
	str2 = str2.substring(index3+1,index4);
	
	return str-str2;
}
function addAlarmRule(){
	html = '<tr>'
		 +  "<td><select class='input-medium'><option selected='selected' value='(-1)全部'>全部</option>"
		 +  loadSelect()
		 +  "</select></td>"
		 +  "<td><select class='input-mini'><option selected='selected' value='1'>是</option><option value='0'>否</option> </td>"
		 +  "<td><input class='input-mini' id='' name='' type='text'></td>"
		 +  "<td><input class='input-mini' id='' name='' type='text'></td>"
		 +  "<td><select class='input-mini'><option selected='selected' value='1'>是</option><option value='0'>否</option> </td>"
		 +	'<td><button type="button" onclick="saveAlarmRule(this.parentNode.parentNode)">保存</button>'
		 + '<button type="button" onclick="cancal(this.parentNode)">取消</button></td>'	
		 +  '</tr>';
    $("#alarmRuleTable").append(html);
}

function addIgnoreRule(){
	html = '<tr>'
		 +  "<td><select class='input-medium'><option selected='selected' value='(-1)全部'>全部</option>"
		 +  loadSelect()
		 +  "<td>忽略</td>"
		 +  "<td><select class='input-mini'><option selected='selected' value='1'>是</option><option value='0'>否</option> </td>"
		 +	'<td><button type="button" onclick="saveIgnoreRule(this.parentNode.parentNode)">保存</button>'
		 +  '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="cancal(this.parentNode)">取消</button></td>'	
		 +  '</tr>';
   $("#ignoreRuleTable").append(html);
}

function addConvergenceRule(){
	html = '<tr>'
		 +  "<td><select class='input-medium'><option selected='selected' value='(-1)全部'>全部</option>"
		 +  loadSelect()
		 +  "<td><select class='input-mini'><option selected='selected' value='1'>是</option><option value='0'>否</option> </td>"
		 +  "<td><select class='input-mini'><option selected='selected' value='1'>是</option><option value='0'>否</option> </td>"
		 +	'<td><button type="button" onclick="saveConvergenceRule(this.parentNode.parentNode)">保存</button>'
		 +  '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="cancal(this.parentNode)">取消</button></td>'	
		 +  '</tr>';
  $("#convergenceRuleTable").append(html);
}



function saveAlarmRule(obj){
	var errorDes=obj.cells[0].children[0].value;
	var isExcude=obj.cells[1].children[0].value;
	var count=obj.cells[2].children[0].value;
	var threshold=obj.cells[3].children[0].value;
	var isUse=obj.cells[4].children[0].value;
	
	var orderType = $('#orderType').val();
	if (count==''){
		alert("请输入数量");
		return;
	}
	if (threshold==''){
		alert("请输入阈值");
		return;
	}
	
	var chech = checkAlarmRuleIsRepeat(obj);
	if(0==chech){
		alert("添加规则重复");
		return;
	}
	$.ajax({
		  url:"/om/orderAbnormalAlarm/addAlarmRule",
		  data:{
				'errorDes':errorDes,
				'isExcude':isExcude,
				'count':count,
				'threshold':threshold,
				'isUse':isUse,
				'orderType':orderType,
			},
 		  dataType:"json",
 		
 		  success: function(data){
 			if (data=='0'){
 				alert("保存失败,请检查数量和阈值是否输入正确");
 			}else{
 				/*$(obj.cells[0]).html(errorDes);
 				if('1'==isExcude){
 					$(obj.cells[1]).html('是');
 				}else{
 	 			    $(obj.cells[1]).html('否');
 				}
 	 			$(obj.cells[2]).html(count);
 	 			$(obj.cells[3]).html(threshold);
 	 			if('1'==isUse){
 	 				$(obj.cells[4]).html('是');
 	 			}else{
 	 			    $(obj.cells[4]).html('否');
 	 			}
 	 			$(obj.cells[5]).html("<button type='button' onclick='delAlarmRule(this.parentNode.parentNode)'>删除</button>"); */
 	 			$("#alarmRuleTable  tr:not(:first)").empty();
 	 			
 	 			drawAlarmRuleTable();
 	 			//location.reload();
 			}   			 
 		  }
	})
	
}


function reloadSelect(){
	loadErrCodeListForOrderType();
	$("#alarmRuleTable  tr:not(:first)").empty();
	drawAlarmRuleTable();
	$("#ignoreRuleTable  tr:not(:first)").empty();
	drawIgnoreRuleTable();
	$("#convergenceRuleTable  tr:not(:first)").empty();
	drawConvergenceRuleTable();
	
	loadErrorDes();
}

//重新画报警规则
function drawAlarmRuleTable(){
/*	$("#alarmRuleTable tr:gt(0)").remove();*/
	//alarmRuleLists.sort(compare);
	var orderType = $('#orderType').val();
	var html = null;
	for (var i=0; i<alarmRuleLists.length; i++){
		var dataList = alarmRuleLists[i];
		if(dataList[5]==orderType){
		html+='<tr>';
		for (var j=0; j<dataList.length; j++){
			if(1==j||4==j){
				if(0==dataList[j]){
					html+='<td>'+'否'+'</td>';
					}else{
						html+='<td>'+'是'+'</td>';
					}
				}else{
					if(5!=j){
						html+='<td>'+dataList[j]+'</td>';
					}
				}
			}
			html+="<td><button type='button' onclick='alterAlarmRule(this.parentNode.parentNode)'>修改</button>"
			html+="<button type='button' onclick='delAlarmRule(this.parentNode.parentNode)'>删除</button></td>"
			html+='</tr>';
		}
	}
	$('#alarmRuleTable').append(html);
}

//重新画忽略规则
function drawIgnoreRuleTable(){
/*	$("#alarmRuleTable tr:gt(0)").remove();*/
	var orderType = $('#orderType').val();
	var html = null;
	//ignoreRuleLists.sort(compare);
	for (var i=0; i<ignoreRuleLists.length; i++){
		var dataList = ignoreRuleLists[i];
		if(dataList[3]==orderType){
		html+='<tr>';
		for (var j=0; j<dataList.length; j++){
			if(2==j){
				if(0==dataList[j]){
						html+='<td>'+'否'+'</td>';
					}else{
						html+='<td>'+'是'+'</td>';
					}
				}else{
					if(3!=j){
						html+='<td>'+dataList[j]+'</td>';
					}
				}
			}
			html+="<td><button type='button' onclick='alterIgnoreRule(this.parentNode.parentNode)'>修改</button>"
			html+="<button type='button' onclick='delIgnoreRule(this.parentNode.parentNode)'>删除</button></td>"
			html+='</tr>';
		}
	}	
	$('#ignoreRuleTable').append(html);
}
//重新画收敛规则
function drawConvergenceRuleTable(){
/*	$("#alarmRuleTable tr:gt(0)").remove();*/
	var orderType = $('#orderType').val();
	var html = null;
	//convergenceRuleLists.sort(compare);
	for (var i=0; i<convergenceRuleLists.length; i++){
		var dataList = convergenceRuleLists[i];	
		if(dataList[3]==orderType){
			html+='<tr>';
			for (var j=0; j<dataList.length; j++){
				if(2==j||1==j){
					if(0==dataList[j]){
						html+='<td>'+'否'+'</td>';
					}else{
						html+='<td>'+'是'+'</td>';
					}
				}else{
					if(3!=j){
						html+='<td>'+dataList[j]+'</td>';
					}
				}
			}
			html+="<td><button type='button' onclick='alterConvergenceRule(this.parentNode.parentNode)'>修改</button>";
			html+="&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' onclick='delConvergenceRule(this.parentNode.parentNode)'>删除</button></td>";
			html+='</tr>';
		}
	}		
	$('#convergenceRuleTable').append(html);
}

function saveIgnoreRule(obj){
	var errorDes=obj.cells[0].children[0].value;
	var isIgnore=1;
	var isUse=obj.cells[2].children[0].value;
	var orderType=$('#orderType').val();
	var check = checkIgnoreRuleRepeat(obj);
	if(0==check){
		alert("添加忽略规则重复");
		return ;
	}
	$.ajax({
		  url:"/om/orderAbnormalAlarm/addIgnoreRule",
		  data:{
				'errorDes':errorDes,
				'isIgnore':isIgnore,
				'isUse':isUse,
				'orderType':orderType,
			},
		  dataType:"json",
		  success: function(data){
			if (data=='0'){
	 			alert("保存失败");
	 		}else{
			/*  $(obj.cells[0]).html(errorDes);
			  $(obj.cells[1]).html('忽略');
			  if('1'==isUse){
				  $(obj.cells[2]).html('是');
			  }else{
				  $(obj.cells[2]).html('否');
			  }
			  
			  $(obj.cells[3]).html("<button type='button' onclick='delIgnoreRule(this.parentNode.parentNode)'>删除</button>");  			 */
	 			$("#ignoreRuleTable  tr:not(:first)").empty();
	 			drawIgnoreRuleTable();
	 		}
		  }
	})
}

function saveConvergenceRule(obj){
	var errorDes=obj.cells[0].children[0].value;
	var isConvergence=obj.cells[1].children[0].value;
	var isUse=obj.cells[2].children[0].value;
	var orderType=$('#orderType').val();
	var check = checkConvergenceRuleRepeat(obj);
	if(0==check){
		alert("添加收敛规则重复");
		return ;
	}
	$.ajax({
		  url:"/om/orderAbnormalAlarm/addConvergenceRule",
		  data:{
				'errorDes':errorDes,
				'isConvergence':isConvergence,
				'isUse':isUse,
				'orderType':orderType,
			},
		  dataType:"json",
	
		  success: function(data){
			if (data=='0'){
	 			alert("保存失败");
			
	 		}else{
			  /*  $(obj.cells[0]).html(errorDes);
			    if('1'==isConvergence){
			    	$(obj.cells[1]).html('是');
			    }else{
				    $(obj.cells[1]).html('否');
			    }
			    if('1'==isUse){
			    	$(obj.cells[2]).html('是');
			    }else{
				    $(obj.cells[2]).html('否');
			    }
				$(obj.cells[3]).html("<button type='button' onclick='delConvergenceRule(this.parentNode.parentNode)'>删除</button>"); 			 
		  */
	 			$("#convergenceRuleTable  tr:not(:first)").empty();
	 			drawConvergenceRuleTable();
		  }
		  }
	})
}

function cancal(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	
	//$("#alarmRuleTable").deleteRow(val);
}
//刪除報警規則
function delAlarmRule(obj){
//	alert("delAlarmRule");
	
	 if(confirm("确定要删除该信息吗？删除将不能恢复！")){
		 var errorDes=obj.cells[0].innerHTML;
			var isExcude=obj.cells[1].innerHTML;
			var count=obj.cells[2].innerHTML;
			var threshold=obj.cells[3].innerHTML;
			var isUse=obj.cells[4].innerHTML;
			var orderType=$('#orderType').val();//业务线
            if('是'==isExcude){
            	isExcude = '1';
			}else{
				isExcude = '0';
			}
			
            if('是'==isUse){
            	isUse = '1';
			}else{
				isUse = '0';
			}
			 $.ajax({
				  url:"/om/orderAbnormalAlarm/delAlarmRule",
				  data:{
					  	'orderType':orderType,
						'errorDes':errorDes,
						'isExcude':isExcude,
						'count':count,
						'threshold':threshold,
						'isUse':isUse,
					},
				  dataType:"json",
				  success: function(data){
					  if (data=='0'){
							alert("删除失败");
						}else{
							//档删除该条记录时册相应的把报警规则页面列表数组里面的值删除
							for (var i=0; i<alarmRuleLists.length; i++){
								var dataList = alarmRuleLists[i];	
						       if(dataList[0]==errorDes&&dataList[1]==isExcude&&dataList[2]==count&&dataList[3]==threshold&&dataList[4]==isUse && dataList[5] ==orderType){
						    	   alarmRuleLists.splice(i,1);
						    	   break;
								}
							}	
							 obj.parentNode.removeChild(obj);
						} 
				  }
			});
	 }	
}
//刪除忽略規則
function delIgnoreRule(obj){
	  if(confirm("确定要删除该信息吗？删除将不能恢复！")){
		 var errorDes=obj.cells[0].innerHTML;
		 var isIgnore=1;
		 var isUse=obj.cells[2].innerHTML;
		 var orderType=$('#orderType').val();//业务线
		 if('是'==isUse){
			 isUse = '1';
		 }else{
			 isUse = '0';
		 }
			$.ajax({
				  url:"/om/orderAbnormalAlarm/delIgnoreRule",
				  data:{
					  	'orderType':orderType,
						'errorDes':errorDes,
						'isIgnore':isIgnore,
						'isUse':isUse,
					},
				  dataType:"json",
				  success: function(data){
					  if (data=='0'){
							alert("删除失败");
						}else{
							//档删除该条记录时册相应的把忽略規則页面列表数组里面的值删除
							for (var i=0; i<ignoreRuleLists.length; i++){
								var dataList = ignoreRuleLists[i];
								if(errorDes==dataList[0] && isUse==dataList[2] && orderType==dataList[3]){
									ignoreRuleLists.splice(i,1);
									break;
								}
							}
							 obj.parentNode.removeChild(obj);
						}
				  }
			})
		 
	 }	
}
//刪除收斂規則
function delConvergenceRule(obj){
	 if(confirm("确定要删除该信息吗？删除将不能恢复！")){
		 var errorDes=obj.cells[0].innerHTML;
		 var isConvergence=obj.cells[1].innerHTML;
		 var isUse=obj.cells[2].innerHTML;
		 var orderType=$('#orderType').val();//业务线
		 
		 if('是'==isConvergence){
			 isConvergence = '1';
		 }else{
			 isConvergence = '0';
		 }
		 if('是'==isUse){
			 isUse = '1';
		 }else{
			 isUse = '0';
		 }
			$.ajax({
				  url:"/om/orderAbnormalAlarm/delConvergenceRule",
				  data:{
					  	'orderType':orderType,
						'errorDes':errorDes,
						'isConvergence':isConvergence,
						'isUse':isUse,
					},
				  dataType:"json",
				  success: function(data){
					  if (data=='0'){
							alert("删除失败");
						}else{
							//档删除该条记录时册相应的把忽略規則页面列表数组里面的值删除
							for (var i=0; i<convergenceRuleLists.length; i++){
								var dataList = convergenceRuleLists[i];	
								if(errorDes==dataList[0]&&isConvergence==dataList[1]&&isUse==dataList[2]&&orderType==dataList[3]){
									convergenceRuleLists.splice(i,1);
									break;
								}
							}	
							 obj.parentNode.removeChild(obj);
						}
				  }
			})
		
	 }	
}
function loadSelect(){
	html="";
	for(var i =0;i<errDesList.length;i++){
		html+="<option value=\"" + errDesList[i]+ "\">" + errDesList[i] + "</option>";
	}
	return html;
}

function drawTable(alarmRule, ignoreRule, convergenceRule, errorDes){
	$("#alarmRuleTable tr:gt(0)").remove();		
	var html = null;
	alarmRuleLists = eval(alarmRule);
	//alarmRuleLists.sort(compare);
	for (var i=0; i<alarmRuleLists.length; i++){
		var dataList = alarmRuleLists[i];			
		if(dataList[5]==1){
			html+='<tr>';
			for (var j=0; j<dataList.length; j++){
				if(1==j||4==j){
					if(0==dataList[j]){
						html+='<td>'+'否'+'</td>';
					}else{
						html+='<td>'+'是'+'</td>';
					}
				}else{
					if(5!=j){
						html+='<td>'+dataList[j]+'</td>';
					}
				}
			}
			html+="<td><button type='button' onclick='alterAlarmRule(this.parentNode.parentNode)'>修改</button>"
			html+="<button type='button' onclick='delAlarmRule(this.parentNode.parentNode)'>删除</button></td>"
			html+='</tr>';
		}
	}		
	
	$('#alarmRuleTable').append(html);
	$("#ignoreRuleTable tr:gt(0)").remove();		
	html = null;
	ignoreRuleLists = eval(ignoreRule);
	//ignoreRuleLists.sort(compare);
	for (var i=0; i<ignoreRuleLists.length; i++){
		var dataList = ignoreRuleLists[i];			
		if(dataList[3]==1){
			html+='<tr>';
			for (var j=0; j<dataList.length; j++){
				if(2==j){
					if(0==dataList[j]){
						html+='<td>'+'否'+'</td>';
					}else{
						html+='<td>'+'是'+'</td>';
					}
				}else{
					if(3!=j){
						html+='<td>'+dataList[j]+'</td>';
					}
				}
			}
			html+="<td><button type='button' onclick='alterIgnoreRule(this.parentNode.parentNode)'>修改</button>"
			html+="<button type='button' onclick='delIgnoreRule(this.parentNode.parentNode)'>删除</button></td>"
			html+='</tr>';
		}
	}
	
	
	$('#ignoreRuleTable').append(html);
	$("#convergenceRuleTable tr:gt(0)").remove();		
	html = null;
	convergenceRuleLists = eval(convergenceRule);
	//var serviceline=$('#serviceLine').val();
	//convergenceRuleLists.sort(compare);
	for (var i=0; i<convergenceRuleLists.length; i++){
		var dataList = convergenceRuleLists[i];	
		if(dataList[3]==1){
			html+='<tr>';
			for (var j=0; j<dataList.length; j++){
				if(2==j||1==j){
					if(0==dataList[j]){
						html+='<td>'+'否'+'</td>';
					}else{
						html+='<td>'+'是'+'</td>';
					}
				}else{
					if(3!=j){
						html+='<td>'+dataList[j]+'</td>';
					}
				}
			}
			html+="<td><button type='button' onclick='alterConvergenceRule(this.parentNode.parentNode)'>修改</button>";
			html+="&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' onclick='delConvergenceRule(this.parentNode.parentNode)'>删除</button></td>";
			html+='</tr>';
		}
	}
	$('#convergenceRuleTable').append(html);
	
	//加载异常错误码
	loadErrorDes();
}
//检查报警规则是否添加有重复
function checkAlarmRuleIsRepeat(obj){
	var errorDes=obj.cells[0].children[0].value;
	var isExcude=obj.cells[1].children[0].value;
	var count=obj.cells[2].children[0].value;
	var threshold=obj.cells[3].children[0].value;
	var isUse=obj.cells[4].children[0].value;
	var orderType = $('#orderType').val();
	for (var i=0; i<alarmRuleLists.length; i++){
		var dataList = alarmRuleLists[i];	
       if(dataList[0]==errorDes&&dataList[1]==isExcude&&dataList[2]==count&&dataList[3]==threshold&&dataList[4]==isUse&&dataList[5]==orderType){
			return 0;
		}
	}	
	var alarmRuleNewList = new Array();
	alarmRuleNewList[0] = errorDes;
	alarmRuleNewList[1] = isExcude;
	alarmRuleNewList[2] = count;
	alarmRuleNewList[3] = threshold;
	alarmRuleNewList[4] = isUse;
	alarmRuleNewList[5] = orderType;
	alarmRuleLists[alarmRuleLists.length] = alarmRuleNewList;
	return 1;
}

//检查忽略规则是否添加有重复
function checkIgnoreRuleRepeat(obj){
	var errorDes=obj.cells[0].children[0].value;
	var isUse=obj.cells[2].children[0].value;
	var orderType = $('#orderType').val();
	for (var i=0; i<ignoreRuleLists.length; i++){
		var dataList = ignoreRuleLists[i];	
		
		if(errorDes==dataList[0]&&isUse==dataList[2]&&orderType==dataList[3]){
			return 0;
		}
	}
	var ignoreRuleNewList = new Array();
	ignoreRuleNewList[0] = errorDes;
	ignoreRuleNewList[1] = '忽略';
	ignoreRuleNewList[2] = isUse;
	ignoreRuleNewList[3] = orderType;
	ignoreRuleLists[ignoreRuleLists.length] = ignoreRuleNewList;
	return 1;
}
//检查收敛规则是否添加有重复
function checkConvergenceRuleRepeat(obj){
	var errorDes=obj.cells[0].children[0].value;
	var isConvergence=obj.cells[1].children[0].value;
	var isUse=obj.cells[2].children[0].value;
	var orderType = $('#orderType').val();
	for (var i=0; i<convergenceRuleLists.length; i++){
		var dataList = convergenceRuleLists[i];	
		if(errorDes==dataList[0]&&isConvergence==dataList[1]&&isUse==dataList[2]&&orderType==dataList[3]){
			return 0;
		}
	}	
	var convergenceRuleNewList = new Array();
	convergenceRuleNewList[0] = errorDes;
	convergenceRuleNewList[1] = isConvergence;
	convergenceRuleNewList[2] = isUse;
	convergenceRuleNewList[3] = orderType;
	convergenceRuleLists[convergenceRuleLists.length] = convergenceRuleNewList;
	 return 1;
}


$(function() {	
	var orderType = $('#orderType').val();
	if (errDesList.length==0){
		$.ajax({
  		  url:"/om/orderAbnormalAlarm/errorNameSelect",
  		  data:{
  			  'orderType':orderType,
  		  },
   		  dataType:"json",
   		  cache:true,
   		  success: function(data){
   			errDesList = eval(data);	    			 
   		  }   		  
   	  });
	}
})
function loadErrCodeListForOrderType(){
	errDesList=null;
	var orderType = $('#orderType').val();
		$.ajax({
  		  url:"/om/orderAbnormalAlarm/errorNameSelect",
  		  data:{
  			  'orderType':orderType,
  		  },
   		  dataType:"json",
   		  cache:true,
   		  success: function(data){
   			errDesList = eval(data);	    			 
   		  }   		  
   	  });
}



//更改报警规则
function alterAlarmRule(obj){
	var errorDes=obj.cells[0].innerHTML;
	var oldIsExcude=obj.cells[1].innerHTML;
	var oldCount=obj.cells[2].innerHTML;
	var oldThreshold=obj.cells[3].innerHTML;
	var oldIsUse=obj.cells[4].innerHTML;
	var orderType = $('#orderType').val();
	
	loadSelectISTrue(obj.cells[1],oldIsExcude);
	obj.cells[2].innerHTML= "<input class='input-mini' type='text' value='"+oldCount+"'>";
	obj.cells[3].innerHTML= "<input class='input-mini' type='text' value='"+oldThreshold+"'>";
	loadSelectISTrue(obj.cells[4],oldIsUse);
	
	if(oldIsExcude=='是'){
		isexcude=1
	}else{
		isexcude=0
	}
    if(oldIsUse=='是'){
		isuse=1
	}else{
		isuse=0
	}
	obj.cells[5].innerHTML="<button type='button' onclick='saveAlterAlarmRule(this.parentNode.parentNode,"
		 + isexcude + ","+oldCount+","+oldThreshold+","+isuse+","+orderType
	     +")'>保存</button>"
		 +  '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="cancelAlterAlarmRule(this.parentNode.parentNode)">取消</button>';	
}

function saveAlterAlarmRule(obj,oldIsExcude,oldCount,oldThreshold,oldIsUse,orderType){
	var errorDes=obj.cells[0].innerHTML;
	var isExcude=obj.cells[1].children[0].value;
	var count=obj.cells[2].children[0].value;
	var threshold=obj.cells[3].children[0].value;
	var isUse=obj.cells[4].children[0].value;
//	alert(oldIsExcude+" "+oldCount+" "+oldThreshold+" "+oldIsUse+" serviceLine "+serviceLine);
	//alert(errorDes+isExcude+count+threshold+isUse);
	
	$.ajax({
		  url:"/om/orderAbnormalAlarm/alterAlarmRule",
		  data:{
				'errorDes':errorDes,
				'isExcude':isExcude,
				'count':count,
				'threshold':threshold,
				'isUse':isUse,
				'oldIsExcude':oldIsExcude,
				'oldCount':oldCount,
				'oldThreshold':oldThreshold,
				'oldIsUse':oldIsUse,
				'orderType':orderType,
			},
		  dataType:"json",
		
		  success: function(data){
			if (data=='0'){
				alert("保存失败,请检查数量和阈值是否输入正确");
			}else{
				$(obj.cells[0]).html(errorDes);
 				if('1'==isExcude){
 					$(obj.cells[1]).html('是');
 				}else{
 	 			    $(obj.cells[1]).html('否');
 				}
 	 			$(obj.cells[2]).html(count);
 	 			$(obj.cells[3]).html(threshold);
 	 			if('1'==isUse){
 	 				$(obj.cells[4]).html('是');
 	 			}else{
 	 			    $(obj.cells[4]).html('否');
 	 			}
 	 			for (var i=0; i<alarmRuleLists.length; i++){
 	 				var dataList = alarmRuleLists[i];
 	 				if(dataList[0]==errorDes&&dataList[1]==oldIsExcude&&dataList[2]==oldCount&&dataList[3]==oldThreshold&&dataList[4]==oldIsUse&&dataList[5]==orderType){
 	 					dataList[1]=isExcude;
 	 					dataList[2]=count;
 	 					dataList[3]=threshold;
 	 					dataList[4]=isUse;
 	 				}
 	 			}

 	 			$(obj.cells[5]).html("<button type='button' onclick='alterAlarmRule(this.parentNode.parentNode)'>修改</button><button type='button' onclick='delAlarmRule(this.parentNode.parentNode)'>删除</button>"); 
			}   			 
		  }
	})
}
function cancelAlterAlarmRule(obj){
	$("#alarmRuleTable tr:gt(0)").remove();
	drawAlarmRuleTable();
}

function alterIgnoreRule(obj){
	var errorDes=obj.cells[0].innerHTML;
	//var isIgnore=obj.cells[1].children[0].value;
	var isUse=obj.cells[2].innerHTML;
//	loadSelectISTrue(obj.cells[1],isIgnore);
	var orderType = $('#orderType').val();
	loadSelectISTrue(obj.cells[2],isUse);
	
	obj.cells[3].innerHTML="<button type='button' onclick='saveAlterIgnoreRule(this.parentNode.parentNode,"
		 +orderType+")'>保存</button>"
		 +  '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="cancelAlterIgnoreRule(this.parentNode.parentNode)">取消</button>';	
}
function saveAlterIgnoreRule(obj,orderType){
	var errorDes=obj.cells[0].innerHTML;
	var isIgnore=1;
	var isUse=obj.cells[2].children[0].value;
	//alert(errorDes+isIgnore+isUse);
	
	$.ajax({
		  url:"/om/orderAbnormalAlarm/alterIgnoreRule",
		  data:{
				'errorDes':errorDes,
				'isIgnore':isIgnore,
				'isUse':isUse,
				'orderType':orderType,
			},
		  dataType:"json",
		  success: function(data){
			if (data=='0'){
	 			alert("保存失败");
	 		}else{
	 			  $(obj.cells[0]).html(errorDes);
				  $(obj.cells[1]).html('忽略');
				  if('1'==isUse){
					  $(obj.cells[2]).html('是');
				  }else{
					  $(obj.cells[2]).html('否');
				  }
				  
				  for (var i=0; i<ignoreRuleLists.length; i++){
	 	 				var dataList = ignoreRuleLists[i];
	 	 				if(dataList[0]==errorDes && dataList[3]==orderType){
	 	 					dataList[1]='忽略';
	 	 					dataList[2]=isUse;
	 	 				}
	 	 			}
				  $(obj.cells[3]).html("<button type='button' onclick='alterIgnoreRule(this.parentNode.parentNode)'>修改</button><button type='button' onclick='delIgnoreRule(this.parentNode.parentNode)'>删除</button>");  	
	 		}
		  }
	})
}
function cancelAlterIgnoreRule(obj){
	$("#ignoreRuleTable tr:gt(0)").remove();
	drawIgnoreRuleTable();
}

function loadSelectISTrue(obj,param){
	if ('是'==param){
		obj.innerHTML="<select class='input-mini'><option selected='selected' value='1'>是</option><option value='0'>否</option>";
	}else{
		obj.innerHTML="<select class='input-mini'><option value='1'>是</option><option selected='selected' value='0'>否</option>";
	}
}

function alterConvergenceRule(obj){
	var errorDes=obj.cells[0].innerHTML;
	var isConvergence=obj.cells[1].innerHTML;
	var isUse=obj.cells[2].innerHTML;
	var orderType = $('#orderType').val();
	//obj.deleteCell(1);
	//var cell=obj.insertCell(1);
	loadSelectISTrue(obj.cells[1],isConvergence);
	loadSelectISTrue(obj.cells[2],isUse);
		
	obj.cells[3].innerHTML="<button type='button' onclick='saveAlterConvergenceRule(this.parentNode.parentNode,"
		+orderType+")'>保存</button>"
		 +  '&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="cancelAlterConvergenceRule(this.parentNode.parentNode)">取消</button>';			
}
function saveAlterConvergenceRule(obj,orderType){
	var errorDes=obj.cells[0].innerHTML;
	var isConvergence=obj.cells[1].children[0].value;
	var isUse=obj.cells[2].children[0].value;
	//alert(errorDes+isConvergence+isUse);
	$.ajax({
		  url:"/om/orderAbnormalAlarm/alterConvergenceRule",
		  data:{
				'errorDes':errorDes,
				'isConvergence':isConvergence,
				'isUse':isUse,
				'orderType':orderType,
			},
		  dataType:"json",
	
		  success: function(data){
			if (data=='0'){
	 			alert("保存失败");
			
	 		}else{
	 			$(obj.cells[0]).html(errorDes);
			    if('1'==isConvergence){
			    	$(obj.cells[1]).html('是');
			    }else{
				    $(obj.cells[1]).html('否');
			    }
			    if('1'==isUse){
			    	$(obj.cells[2]).html('是');
			    }else{
				    $(obj.cells[2]).html('否');
			    }
			    
			    for(var i=0;i<convergenceRuleLists.length;i++){
			    	var dataList=convergenceRuleLists[i];
			    	if(dataList[0]==errorDes && dataList[3]==orderType){
			    		dataList[1]=isConvergence;
			    		dataList[2]=isUse;
			    		break;
			    	}
			    }
			    
				$(obj.cells[3]).html("<button type='button' onclick='alterConvergenceRule(this.parentNode.parentNode)'>修改</button><button type='button' onclick='delConvergenceRule(this.parentNode.parentNode)'>删除</button>"); 			 
		  
		  }
		  }
	})
}
function cancelAlterConvergenceRule(obj){
	$("#convergenceRuleTable tr:gt(0)").remove();
	drawConvergenceRuleTable();
}

// --------------------------------------
// 以下为异常错误码增删改查代码

function loadErrorDes(){
	var orderType = $('#orderType').val();
	$.ajax({
		  url:"/om/orderAbnormalAlarm/getErrorDes",
		  data:{
			  'orderType':orderType,
		  },
 		  dataType:"json",
 		  cache:true,
 		  success: function(data){
 			 $("#errorDesTable tr:gt(0)").remove();		
 			var html = null;
 			errorDesLists = eval(data);
 			for (var i=0; i<errorDesLists.length; i++){
 				var dataList = errorDesLists[i];			
 				html+='<tr>';
 				html+='<td>'+dataList.errorCode+'</td>';					
 				html+='<td>'+dataList.errorDes+'</td>';
 				html+='<td>'+dataList.orderType+'</td>';	
 				html+="<td><button type='button' onclick='altererrorDes(this.parentNode.parentNode)'>修改</button>";
 				html+="<button type='button' onclick='delerrorDes(this.parentNode.parentNode)'>删除</button></td>";
 				html+='</tr>';				
 			}
 			$('#errorDesTable').append(html);   			 
 		  }   		  
 	  });
}

function adderrorDes(){
	html = '<tr>'
		 +  "<td><input class='input-mini' id='' name='' type='text'></td>"
		 +  "<td><input class='input-mini' id='' name='' type='text'></td>"
		 +  "<td><input class='input-mini' id='' name='' type='text'></td>"
		 +	'<td><button type="button" onclick="saveErrorDes(this.parentNode.parentNode)">保存</button>'
		 + '<button type="button" onclick="cancal(this.parentNode)">取消</button></td>'	
		 +  '</tr>';
	if ($("#errorDesTable tr").length>1){
		$("#errorDesTable tr:gt(0):eq(0)").before(html);
	}else{
		$("#errorDesTable").append(html);
	}
	
}

function saveErrorDes(obj){
	var errorCode=obj.cells[0].children[0].value;
	var errorDes=obj.cells[1].children[0].value;
	var orderType=obj.cells[2].children[0].value;
		
	$.ajax({
		  url:"/om/orderAbnormalAlarm/insertErrorDes",
		  data:{
				'errorCode':errorCode,
				'errorDes':errorDes,
				'orderType':orderType,
			},
 		  dataType:"json",
 		
 		  success: function(data){
 			if (data=='0'){
 				alert("保存失败,请检查输入正确");
 			}else{
 				$(obj.cells[0]).html(errorCode);			
 				$(obj.cells[1]).html(errorDes);				
 	 			$(obj.cells[2]).html(orderType); 	 		 
 	 			$(obj.cells[3]).html("<button type='button' onclick='altererrorDes(this.parentNode.parentNode)'>修改</button><button type='button' onclick='delerrorDes(this.parentNode.parentNode)'>删除</button>");
 	 			
 			}   			 
 		  }
	})
}

function altererrorDes(obj){
	var olderrorCode=obj.cells[0].innerHTML;
	var olderrorDes=obj.cells[1].innerHTML;
	var oldorderType=obj.cells[2].innerHTML;	
	
	obj.cells[0].innerHTML= "<input class='input-mini' type='text' value='"+olderrorCode+"'>";
	obj.cells[1].innerHTML= "<input class='input-mini' type='text' value='"+olderrorDes+"'>";
	obj.cells[2].innerHTML= "<input class='input-mini' type='text' value='"+oldorderType+"'>";	
	obj.cells[3].innerHTML="<button type='button' onclick='saveAlterErrorDes(this.parentNode.parentNode,"
		+ olderrorCode +","+oldorderType +")'>保存</button>";	

}

function saveAlterErrorDes(obj, oldErrorCode, oldErrorType){
	var errorCode=obj.cells[0].children[0].value;
	var errorDes=obj.cells[1].children[0].value;
	var orderType=obj.cells[2].children[0].value;
	
	$.ajax({
		  url:"/om/orderAbnormalAlarm/updateErrorDes",
		  data:{
				'oldErrorCode':oldErrorCode,
				'oldErrorType':oldErrorType,
				'errorCode':errorCode,
				'errorDes':errorDes,
				'orderType':orderType,
			},
		  dataType:"json",
		
		  success: function(data){
			if (data=='0'){
				alert("保存失败,请输入是否正确");
			}else{
				$(obj.cells[0]).html(errorCode);			
 				$(obj.cells[1]).html(errorDes);				
 	 			$(obj.cells[2]).html(orderType); 	 
 	 			$(obj.cells[3]).html("<button type='button' onclick='altererrorDes(this.parentNode.parentNode)'>修改</button><button type='button' onclick='delerrorDes(this.parentNode.parentNode)'>删除</button>");
 	 			}   			 
		  }
	})
}

function delerrorDes(obj){
	if(confirm("确定要删除该信息吗？删除将不能恢复！")){
		 var errorCode=obj.cells[0].innerHTML;
		 var errorDes=obj.cells[1].innerHTML;
		 var orderType=obj.cells[2].innerHTML;
		
			$.ajax({
				  url:"/om/orderAbnormalAlarm/delErrorDes",
				  data:{
					  	'orderType':orderType,
						'errorCode':errorCode,
					},
				  dataType:"json",
				  success: function(data){
					  if (data=='0'){
							alert("删除失败");
						}else{
							 obj.parentNode.removeChild(obj);
						}
				  }
			})
		
	 }	
}
