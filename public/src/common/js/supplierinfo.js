function getAllSupplierInfo(){
	$.post("/channelActiveStat/getAllSupplierInfo",function(data){
		var data = eval("("+data+")");
		var html = "";
		for(var i=0; i<data.length;i++){
			var tr = "<tr>";
			var trHtml = '<td colspan="3" style="text-align: center;">' + data[i].supplier +'</td>';
			var channels = "";
			for(var j=0;j<data[i].channels.length;j++){
				channels += data[i].channels[j];
				if (j != data[i].channels.length - 1) {
					channels += ";";
				}
			}
			trHtml += '<td colspan="5" style="text-align: center;">' + channels +'</td>';
			var opt = "";  //confirmDel("'+data[i].supplier.trim()+'")
			opt += '<a href="/channelActiveStat/findOne?supplier='+data[i].supplier.trim()+'">修改</a>&nbsp;&nbsp;|&nbsp;&nbsp;';
			opt += '<a onclick=confirmDel("'+data[i].supplier.trim()+'") href="javascript:void(0)">删除</a>';
			trHtml += '<td colspan="2" style="text-align: center;">'+ opt +'</td>';
			tr += trHtml;
			tr += "</tr>";
			html += tr;
		}
		$("#supplierinfos").html(html);
	});
}

function confirmDel(supplier){
	if (!confirm("确认删除？")) {
		return false;
	}
	var url = '/channelActiveStat/delSupplierInfo?supplier=' + supplier;
	$.get(url,function(){
		window.location.href="views/supplierinfo/supplierinfo.jsp";
	});
	
}

$(function(){
	getAllSupplierInfo();
})