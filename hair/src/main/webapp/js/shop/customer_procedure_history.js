$(document).ready(function(){
	
	$('[data-toggle="tooltip"]').tooltip();
	
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
    $("#searchCustomerListPopup .modal-footer button").on("click", function(){
    	var customerInfo = {"name":"aaa", "phoneNumber":"111"}
    	setCustomerInfo( customerInfo );
    });
    
});


function setCustomerInfo( customerInfo ){
	$("#lblCustomerName").text(customerInfo.name);
	$("#lblCustomerPhoneNumber").text(customerInfo.phoneNumber);
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

function showSearchCustomerListOnPopup( customerList ){
	var lv_sTrTemplate =	"<tr> " +
							"	<td>:name</td>" + 
							"	<td>:phoneNumber</td>" +
							"</tr>";
	//clear table for customer list
	$("#searchCustomerListPopup #tblCustomerList tbody tr").remove();
	
	//set table for customer list
	$.each(customerList, function( tv_nLoopIndex, tv_oCustomerInfo ) {
		console.log(tv_nLoopIndex + " : " + tv_oCustomerInfo);
		var lv_sAppendStr =	lv_sTrTemplate.replace(":phoneNumber", tv_oCustomerInfo.phoneNumber)
			  							  .replace(":name", tv_oCustomerInfo.name);
		$("#searchCustomerListPopup #tblCustomerList tbody").append(lv_sAppendStr);
	});
	
	 $("#searchCustomerListPopup").modal();
}