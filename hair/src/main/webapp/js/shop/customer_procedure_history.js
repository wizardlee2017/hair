$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip();
	
	$('#txtCustomerPhoneNumber').numpad();
	
	//click search button
    $("button#searchCustomer").click(function(){
    	var lv_sCustomerPhoneNumber = $("#txtCustomerPhoneNumber").val();
    	var lv_sCustomerName = encodeURI($("#txtCustomerName").val(),"UTF-8");
    	searchCustomer(lv_sCustomerPhoneNumber, lv_sCustomerName);
    	
    });
    
    $("button#btnSearchCustomerByName").click(function(){
    	var lv_sCustomerName = encodeURI($("#txtCustomerName").val(),"UTF-8");
    	searchCustomer("", lv_sCustomerName);
    	
    });
    
    $("button#btnSearchCustomerByPhoneNumber").click(function(){
    	var lv_sCustomerPhoneNumber = $("#txtCustomerPhoneNumber").val();
    	searchCustomer(lv_sCustomerPhoneNumber, "");
    	
    });
    
    //select customer from customer list on popup.
    $("#searchCustomerListPopup #tblCustomerList tbody").on("click", "tr", function(){
    	console.log("select tr");
    	$(this).addClass("active").siblings().removeClass("active");
    });
    
    //click select button from customer list on popup.
    $("#searchCustomerListPopup .modal-footer button").on("click", function(){
    	var selectedTr = $("#searchCustomerListPopup #tblCustomerList tbody tr.active");
    	var customerInfo = {"id":$(selectedTr).data("id"), "name":$(selectedTr).data("name"), "phoneNumber":$(selectedTr).data("phone_number")}
    	setCustomerInfo( customerInfo );
    });
    
});


function setCustomerInfo( customerInfo ){
	$("#lblCustomerName").text(customerInfo.name);
	$("#lblCustomerPhoneNumber").text(customerInfo.phoneNumber);
	requestCustomerProcedureHistoryList(customerInfo);
}

function searchCustomer(customerPhoneNumber, customerName){
	
	var lv_sBaseUrl = "/hair/shop/kor20170701001/customer/list";
	var lv_sUrl = "/hair/shop/kor20170701001/customer/list";
	
	if(customerPhoneNumber.length > 0){
		lv_sUrl = lv_sBaseUrl + "?customerPhoneNumber=" + customerPhoneNumber;
	}
	
	if(customerName.length > 0){
		if(lv_sUrl == lv_sBaseUrl){
			lv_sUrl = lv_sBaseUrl + "?customerName=" + customerName;
		} else {
			lv_sUrl = lv_sUrl + "&customerName=" + customerName;
		}
	}
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			console.log("length : " + resData.length);
			if(resData.length == 0){
				console.log("new shop customer. process to search customer master.");					
			} else if(resData.length == 1){
				console.log("set customer infomation. request shop procedure history.");					
			} else if(resData.length > 1){
				console.log("show customer list on popup");
				showSearchCustomerListOnPopup( resData );
			}
		}
	});
}

function requestCustomerProcedureHistoryList(customerInfo){
	
	var lv_sBaseUrl = "/hair/shop/kor20170701001/customer/{customerId}/procedure-history/list";
	var lv_sUrl = lv_sBaseUrl.replace(/{customerId}/g, customerInfo.id);
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			console.log("length : " + resData.length);
			setCustomerProcedureHistoryList(resData);
		}
	});
}

//시술 목록 구성
function setCustomerProcedureHistoryList(CustomerProcedureHistoryList){
	var lv_sTrTemplate =	"<tr data-visit-number=':visitNumber' data-procedure-name=':procedureName' data-procedure-date=':procedureDate' data-hairdresser=':hairdresser' data-procedure-price=':procedurePrice' data-memo=':memo' > " +
							"	<td>:visitNumber</td>" + 
							"	<td>:procedureName</td>" +
							"	<td>:procedureDate</td>" +
							"	<td>:hairdresser</td>" +
							"	<td>:procedurePrice</td>" +
							"	<td>:memo</td>" +
							"</tr>";
	
	//clear table for customer list
	$("#tblCustomerProcedureHistoryList tbody tr").remove();

	//set table for customer list
	$.each(CustomerProcedureHistoryList, function( tv_nLoopIndex, tv_oProcedureHistoryInfo ) {
		console.log(tv_nLoopIndex + " : " + tv_oProcedureHistoryInfo);
		var lv_sAppendStr =	lv_sTrTemplate.replace(/:visitNumber/g, tv_oProcedureHistoryInfo.visitNumber)
										  .replace(/:procedureName/g, tv_oProcedureHistoryInfo.procedureName)	
										  .replace(/:procedureDate/g, tv_oProcedureHistoryInfo.procedureDate)
										  .replace(/:hairdresser/g, tv_oProcedureHistoryInfo.hairdresserName)
										  .replace(/:procedurePrice/g, tv_oProcedureHistoryInfo.procedurePrice)
										  .replace(/:memo/g, tv_oProcedureHistoryInfo.memo);
		$("#tblCustomerProcedureHistoryList tbody").append(lv_sAppendStr);
	});
}

function showSearchCustomerListOnPopup( customerList ){
	var lv_sTrTemplate =	"<tr data-id=':id' data-name=':name' data-phone_number=':phoneNumber'> " +
							"	<td>:name</td>" + 
							"	<td>:phoneNumber</td>" +
							"</tr>";
	//clear table for customer list
	$("#searchCustomerListPopup #tblCustomerList tbody tr").remove();
	
	//set table for customer list
	$.each(customerList, function( tv_nLoopIndex, tv_oCustomerInfo ) {
		console.log(tv_nLoopIndex + " : " + tv_oCustomerInfo);
		var lv_sAppendStr =	lv_sTrTemplate.replace(/:id/g, tv_oCustomerInfo.id)
										  .replace(/:phoneNumber/g, tv_oCustomerInfo.phoneNumber)	
			  							  .replace(/:name/g, tv_oCustomerInfo.name);
		$("#searchCustomerListPopup #tblCustomerList tbody").append(lv_sAppendStr);
	});
	
	 $("#searchCustomerListPopup").modal();
}