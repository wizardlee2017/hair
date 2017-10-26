$(document).ready(function(){
	
	var pv_oToday = new Date();
	
	//datetime picker
	$('#popupBookingInfo-bookingDatetime').datetimepicker({
        language:  'ko',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
	$("#popupBookingInfo-bookingDatetime .form-control").val(pv_oToday.toISOString().slice(0,10));
	$("#hid-popupBookingInfo-bookingDatetime").val(pv_oToday.toISOString().slice(0,10).replace(/-/g,""));
	
	$(document).on("click", ".dropdown-menu li a", function(){
	  $(this).parents(".btn-group:first").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".btn-group:first").find('.btn').val($(this).parents("li:first").data("id"));
	});
	
    //예약 상세 화면 popup 
   /* $("#btnPopupInsertProcedureHistory").click(function(){
    	$("#popupInsertProcedureHistory").modal();    	
    	getRegisterProcedureBasicInfo();
    });*/
    
    
    // 예약 상세 화면 popup 될때,
    /*$("#popupRegisterShopCustomer").on("show.bs.modal",function(){
    	$("#popupRegisterShopCustomer-txtCustomerName").val("");
    	$("#popupRegisterShopCustomer-txtCustomerName").data("customer-id","");
    	$("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val("");
    	$("#popupRegisterShopCustomer div.customer-list button.old").addClass("disabled");
    	$("#popupRegisterShopCustomer div.customer-list").addClass("hidden");
    	$("#popupRegisterShopCustomer div.modal-footer .label").removeClass("hidden").addClass("hidden");
    });*/
    
    
});

//진행 현황

//예약 목록 
function searchCustomerByPhoneNumberEuqal(customerPhoneNumber){
	
	var lv_sBaseUrl = "/hair/shops/customer/list/phone-number";
	var lv_sUrl = "";
	
	if(customerPhoneNumber.length > 0){
		lv_sUrl = lv_sBaseUrl + "?customerPhoneNumber=" + customerPhoneNumber + "&accuracy=equal";
	} else {
		return;
	}
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			console.log("length : " + resData.length);
			if(resData.length == 0){
				console.log("new shop customer. process to insert customer master.");
				$("#popupRegisterShopCustomer-txtCustomerName").data("customer-id","");
				$("#popupRegisterShopCustomer div.customer-list").addClass("hidden");
				$("#btnRegisterShopCustomer-popupRegisterShopCustomer").removeClass("disabled");
				$("#popupRegisterShopCustomer div.modal-footer .label").removeClass("hidden");
			} else if(resData.length >= 1){
				console.log("공통 고객 목록 창 표시.");
				showSearchCustomerListByPhoneNumberEqual( resData );
			}
		}
	});
}


function showSearchCustomerListByPhoneNumberEqual( customerList ){
	var lv_sTrTemplate =	"<tr data-id=':id' data-name=':name' data-phone-number=':phoneNumber'> " +
							"	<td>:name</td>" + 
							"	<td>:phoneNumber</td>" +
							"</tr>";
	//clear table for customer list
	$("#popupRegisterShopCustomer table.customer-list tbody tr").remove();
	
	//set table for customer list
	$.each(customerList, function( tv_nLoopIndex, tv_oCustomerInfo ) {
		console.log(tv_nLoopIndex + " : " + tv_oCustomerInfo);
		var lv_sAppendStr =	lv_sTrTemplate.replace(/:id/g, tv_oCustomerInfo.id)
										  .replace(/:phoneNumber/g, tv_oCustomerInfo.phoneNumber)	
			  							  .replace(/:name/g, tv_oCustomerInfo.name);
		$("#popupRegisterShopCustomer table.customer-list tbody").append(lv_sAppendStr);
	});
	
	$("#popupRegisterShopCustomer div.customer-list").removeClass("hidden");
}


//시술 추가
function addProcedureHistory( procedureHistoryInfo ){
	var lv_sBaseUrl = "/hair/shops/kor20170701001/customer/{customerId}/procedure-history";
	var lv_sUrl = lv_sBaseUrl.replace(/{customerId}/g, procedureHistoryInfo.customerId);
	
	$.ajax({
		url : lv_sUrl,
		method : "POST",
		data : JSON.stringify(procedureHistoryInfo),
		processData: false,
	    contentType: "application/json; charset=UTF-8",
	    complete : function(resData) {
			console.log(resData);	
			alert("등록 되었습니다.");
			requestCustomerProcedureHistoryList("kor20170701001", $("#lblCustomerName").data("id"));
		}
	});
}

//메뉴 목록 획득
function getShopMenuList( menuTypeId ) {
	var lv_sUrl = "/hair/shops/kor20170701001/menu-list?menuTypeId=" + menuTypeId;
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			console.log("length : " + resData.length);
			setShopMenuList(resData);
		}
	});
}

//메뉴 목록 설정.
function setShopMenuList(shopMenuList){
	
	var lv_sLiTemplate =	"<li data-id=':id' data-price=':price' ><a href='#'>:name</a></li>";
	
	$('#ulShopMenuList').empty('li');
	$.each(shopMenuList, function( tv_nLoopIndex, tv_oShopMenuInfo ) {
		console.log(tv_nLoopIndex + ' : ' + tv_oShopMenuInfo);
		var lv_sAppendStr =	lv_sLiTemplate.replace(/:id/g, tv_oShopMenuInfo.id)
										  .replace(/:price/g, tv_oShopMenuInfo.price)
										  .replace(/:name/g, tv_oShopMenuInfo.name);
		$('#ulShopMenuList').append(lv_sAppendStr);
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
							"	<td> " +
							"     <div class='btn-group'> " +
			                "       <button type='button' class='btn btn-default btn-sm'><i class='glyphicon glyphicon-ok-sign'></i></button> " +
			                "       <button type='button' class='btn btn-default btn-sm'><i class='glyphicon glyphicon-remove-sign'></i></button> " +
			                "     </div> " +
							"   </td> " +
							"</tr> ";
	
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
