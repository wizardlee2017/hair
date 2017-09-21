$(document).ready(function(){
	
	var pv_oToday = new Date();
	
	//initialize components
	//$('[data-toggle="tooltip"]').tooltip();
	
	// Set NumPad defaults for jQuery mobile. 
    // These defaults will be applied to all NumPads within this document!
    $.fn.numpad.defaults.gridTpl = '<table class="table modal-content"></table>';
    $.fn.numpad.defaults.backgroundTpl = '<div class="modal-backdrop in"></div>';
    $.fn.numpad.defaults.displayTpl = '<input type="text" class="form-control" />';
    $.fn.numpad.defaults.buttonNumberTpl =  '<button type="button" class="btn btn-default"></button>';
    $.fn.numpad.defaults.buttonFunctionTpl = '<button type="button" class="btn"></button>';
    $.fn.numpad.defaults.onKeypadCreate = function(){$(this).find('.done').addClass('btn-primary');};
	
	$('#txtCustomerPhoneNumber').numpad(
			{	onKeypadClose: function(){
					$("button#btnSearchCustomerByPhoneNumber").trigger("click");
				}
			}
	);
	
	$('#txtProcedurePrice').numpad();
	$('#txtProcedureDefaultPrice').numpad();
	
	//datetime picker
	$('#popupInsertProcedureHistory-date').datetimepicker({
        language:  'ko',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
	$("#popupInsertProcedureHistory-date .form-control").val(pv_oToday.toISOString().slice(0,10));
	$("#hidSelectedProcedureDate").val(pv_oToday.toISOString().slice(0,10).replace(/-/g,""));
	
	$(document).on("click", ".dropdown-menu li a", function(){
	  $(this).parents(".btn-group:first").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".btn-group:first").find('.btn').val($(this).parents("li:first").data("id"));
	  
	  //시술 종류일경우 메뉴 목록 설정
	  if($(this).parents("#ulMenuTypeList").length != 0){
		  var lv_sMenuTypeId = $(this).parents("li:first").data("id");
		  $("#txtProcedurePrice").val("");
		  $("#txtProcedureDefaultPrice").val("");
		  $("#ulShopMenuList").parents(".btn-group:first").find('.btn').html('시술 목록 <span class="caret"></span>');
		  getShopMenuList( lv_sMenuTypeId );
	  }
	  
	  //메뉴 선택일 경우, 가격 설정.
	  if($(this).parents("#ulShopMenuList").length != 0){
		  var lv_nPrice = $(this).parents("li:first").data("price");
		  $("#txtProcedurePrice").val(lv_nPrice);
	  }
	  
	});
	
	
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
    	var shopCustomerInfo = {"shopId":"kor20170701001", "customerId":$(selectedTr).data("id"), "customerName":$(selectedTr).data("name"), "customerPhoneNumber":$(selectedTr).data("phone-number"), "memo":$(selectedTr).data("memo")}
    	setCustomerInfo( shopCustomerInfo );
    });
    
    //click register shop customer button
    $("#btnPopupRegisterShopCustomerLayer").click(function(){
    	$("#popupRegisterShopCustomer").modal();    	
    });
    
    
    $(document).on("click", "#btnRegisterShopCustomer-popupRegisterShopCustomer", function(){
    	if( $("#btnRegisterShopCustomer-popupRegisterShopCustomer").hasClass("disabled") == false ) {
    		var shopCustomerInfo = {"shopId":"kor20170701001", "customerName":$("#popupRegisterShopCustomer-txtCustomerName").val(), "customerPhoneNumber":$("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val(), "memo": $("#popupRegisterShopCustomer-taCustomerMemo").val()};
        	addShopCustomer(shopCustomerInfo);
    	}
    	
    });
    
    //popup procedure history 
    $("#btnPopupInsertProcedureHistory").click(function(){
    	$("#popupInsertProcedureHistory").modal();    	
    	getRegisterProcedureBasicInfo();
    });
    
    //시술 추가 click
    $(document).on("click", "#btnRegisterProdecureHistory-popupInsertProcedureHistory", function(){
    	var procedureHistoryInfo = {
    						"customerId":$("#lblCustomerName").data("id"),
    						"shopMenuId":$("#btnSelectedShopMenu").val(), 
    						"dateYyyymmdd":$("#hidSelectedProcedureDate").val(),
    						"hairdresserId":$("#btnSelectedHairdresser").val(),
    						"procedureTypeId":$("#btnSelectedProcedureType").val(),
    						"price":$("#txtProcedurePrice").val(),
    						"memo":$("#taProcedureMemo").val()
    						};
    	addProcedureHistory(procedureHistoryInfo);
    });
    
    //신규 고객 추가시 중복 확인 클릭
    $("#popupRegisterShopCustomer").on("click", "button.checkValidation", function(){
    	searchCustomerByPhoneNumberEuqal($("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val());
    });
    
    //신규 고객 추가시 동일 번호 고객 목록 클릭
    $("#popupRegisterShopCustomer table.customer-list tbody").on("click", "tr", function(){
    	console.log("select tr");
    	$(this).addClass("active").siblings().removeClass("active");
    	$("#popupRegisterShopCustomer-txtCustomerName").val($(this).data("name"));
    	$("#popupRegisterShopCustomer-txtCustomerName").data("customer-id",$(this).data("id"));
    	$("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val($(this).data("phone-number"));
    	$("#popupRegisterShopCustomer div.customer-list button.old").removeClass("disabled");
    });
    
    //신규 고객 추가시 동일 전화번호의 고객정보가 있을경우, 동일 전화번호를 사용한체 신규 고객으로 등록하기 클릭(고객 마스터 등록)
    $("#popupRegisterShopCustomer").on("click", "div.customer-list button.new", function(){
    	var shopCustomerInfo = {"shopId":"kor20170701001", "customerName":$("#popupRegisterShopCustomer-txtCustomerName").val(), "customerPhoneNumber":$("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val(), "memo": $("#popupRegisterShopCustomer-taCustomerMemo").val()};
    	addShopCustomer(shopCustomerInfo);
    });
    
    //신규 고객 추가시 동일 전화번호의 고객정보가 있을경우, 동일 전화번호를 사용한체 기존 고객으로 등록하기 클릭(매장 고객으로만 등록)
    $("#popupRegisterShopCustomer").on("click", "div.customer-list button.old", function(){
    	if( $(this).hasClass("disabled") == false ) {
    		var shopCustomerInfo = {"shopId":"kor20170701001", "customerId":$("#popupRegisterShopCustomer-txtCustomerName").data("customer-id"), "customerName":$("#popupRegisterShopCustomer-txtCustomerName").val(), "customerPhoneNumber":$("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val(), "memo": $("#popupRegisterShopCustomer-taCustomerMemo").val()};
        	addShopCustomer(shopCustomerInfo);
    	}
    	
    });
    
    //고객 등록 popup 될때,
    $("#popupRegisterShopCustomer").on("show.bs.modal",function(){
    	$("#popupRegisterShopCustomer-txtCustomerName").val("");
    	$("#popupRegisterShopCustomer-txtCustomerName").data("customer-id","");
    	$("#popupRegisterShopCustomer-txtCustomerPhoneNumber").val("");
    	$("#popupRegisterShopCustomer div.customer-list button.old").addClass("disabled");
    	$("#popupRegisterShopCustomer div.customer-list").addClass("hidden");
    	$("#popupRegisterShopCustomer div.modal-footer .label").removeClass("hidden").addClass("hidden");
    });
    
    
});

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

//search customer list by phone number.
function searchCustomerByPhoneNumberEuqal(customerPhoneNumber){
	
	var lv_sBaseUrl = "/hair/shops/kor20170701001/customer/list";
	var lv_sUrl = "/hair/shops/kor20170701001/customer/list";
	
	if(customerPhoneNumber.length > 0){
		lv_sUrl = lv_sBaseUrl + "?customerPhoneNumber=" + customerPhoneNumber + "&accuracy=equal";
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

//시술 관련 기초 정보 획득
function getRegisterProcedureBasicInfo() {
	var lv_sUrl = "/hair/shops/kor20170701001/register-procedure-basic-info";
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			setRegisterProcedureBasicInfo(resData);
		}
	});
}

//시술 관련 기초 정보 설정.
function setRegisterProcedureBasicInfo(registerProcedureBasicInfo){
	var lv_oHairdresserList = registerProcedureBasicInfo.hairdresserList;
	var lv_oMenuTypeList = registerProcedureBasicInfo.menuTypeList;
	var lv_oProcedureTypeList = registerProcedureBasicInfo.procedureTypeList;
	
	var lv_sLiTemplateHairdresser =	"<li data-id=':id'><a href='#'>:name</a></li>";
	var lv_sLiTemplateMenuType =	"<li data-id=':id'><a href='#'>:name</a></li>";
	var lv_sLiTemplateProcedureType =	"<li data-id=':id'><a href='#'>:name</a></li>";
	
	//set hairdresser	
	$('#ulHairdresserList').empty('li');
	$.each(lv_oHairdresserList, function( tv_nLoopIndex, tv_oHairdresserInfo ) {
		console.log(tv_nLoopIndex + ' : ' + tv_oHairdresserInfo);
		var lv_sAppendStr =	lv_sLiTemplateHairdresser.replace(/:id/g, tv_oHairdresserInfo.id)
										  			 .replace(/:name/g, tv_oHairdresserInfo.nickname);
		$('#ulHairdresserList').append(lv_sAppendStr);
	});
	
	//set menu type	
	$('#ulMenuTypeList').empty('li');
	$.each(lv_oMenuTypeList, function( tv_nLoopIndex, tv_oMenuTypeInfo ) {
		console.log(tv_nLoopIndex + ' : ' + tv_oMenuTypeInfo);
		var lv_sAppendStr =	lv_sLiTemplateMenuType.replace(/:id/g, tv_oMenuTypeInfo.id)
										  		  .replace(/:name/g, tv_oMenuTypeInfo.name);
		$('#ulMenuTypeList').append(lv_sAppendStr);
	});
	
	//set procedure type	
	$('#ulProcedureTypeList').empty('li');
	$.each(lv_oProcedureTypeList, function( tv_nLoopIndex, tv_oProcedureTypeInfo ) {
		console.log(tv_nLoopIndex + ' : ' + tv_oProcedureTypeInfo);
		var lv_sAppendStr =	lv_sLiTemplateProcedureType.replace(/:id/g, tv_oProcedureTypeInfo.id)
										  		       .replace(/:name/g, tv_oProcedureTypeInfo.name);
		$('#ulProcedureTypeList').append(lv_sAppendStr);
	});
	
}

//add shop customer
function addShopCustomer( shopCustomerInfo ){
	var lv_sUrl = "/hair/shops/kor20170701001/customer";
	
	$.ajax({
		url : lv_sUrl,
		method : "POST",
		data : JSON.stringify(shopCustomerInfo),
		processData: false,
	    contentType: "application/json; charset=UTF-8",
	    complete : function(resData) {
			console.log(resData);	
			alert("등록 되었습니다.");
			$("#popupRegisterShopCustomer").modal("hide");
			setCustomerInfo( shopCustomerInfo );
		}
	});
}

function setCustomerInfo( shopCustomerInfo ){
	$("#btnPopupInsertProcedureHistory").removeClass("disabled").addClass("btn-success");
	$("#lblCustomerName").text(shopCustomerInfo.customerName).data("id", shopCustomerInfo.customerId);
	$("#lblCustomerPhoneNumber").text(shopCustomerInfo.customerPhoneNumber);
	$("#lblCustomerMemo").text(shopCustomerInfo.memo);	
	$("#txtCustomerPhoneNumber").val("");
	requestCustomerProcedureHistoryList(shopCustomerInfo.shopId, shopCustomerInfo.customerId);
}

//request register shop customer

function searchCustomer(customerPhoneNumber, customerName){
	
	var lv_sBaseUrl = "/hair/shops/kor20170701001/customer/list";
	var lv_sUrl = "/hair/shops/kor20170701001/customer/list";
	
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
				alert("매장 등록 고객이 아닙니다. 신규 고객 등록해주세요. ※공통 고객 목록으로 부터 검색하여 등록하거나 신규 등록한다.");
				
				$("#popupRegisterShopCustomer").modal();
				
				//searchCustomerByPhoneNumberEuqal(customerPhoneNumber);
			} else if(resData.length == 1){
				console.log("set customer infomation. request shop procedure history.");
				//
				//var customerInfo = {"id":resData[0].id, "name":resData[0].name, "phoneNumber":resData[0].phoneNumber};
				var shopCustomerInfo = {"shopId":"kor20170701001", "customerId":resData[0].id, "customerName":resData[0].name, "customerPhoneNumber":resData[0].phoneNumber};
		    	setCustomerInfo( shopCustomerInfo );
			} else if(resData.length > 1){
				console.log("show customer list on popup");
				showSearchCustomerListOnPopup( resData );
			}
		}
	});
}

function requestCustomerProcedureHistoryList(shopId, customerId){
	
	var lv_sBaseUrl = "/hair/shops/{shopId}/customer/{customerId}/procedure-history/list";
	var lv_sUrl = lv_sBaseUrl.replace(/{shopId}/g, shopId)
							 .replace(/{customerId}/g, customerId);
	
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


function showSearchCustomerListOnPopup( shopCustomerList ){
	var lv_sTrTemplate =	"<tr data-id=':id' data-name=':name' data-phone-number=':phoneNumber' data-memo=':memo' > " +
							"	<td>:name</td>" + 
							"	<td>:phoneNumber</td>" +
							"</tr>";
	//clear table for customer list
	$("#searchCustomerListPopup #tblCustomerList tbody tr").remove();
	
	//set table for customer list
	$.each(shopCustomerList, function( tv_nLoopIndex, tv_oCustomerInfo ) {
		console.log(tv_nLoopIndex + " : " + tv_oCustomerInfo);
		var lv_sAppendStr =	lv_sTrTemplate.replace(/:id/g, tv_oCustomerInfo.customerId)
										  .replace(/:phoneNumber/g, tv_oCustomerInfo.customerPhoneNumber)	
			  							  .replace(/:name/g, tv_oCustomerInfo.customerName)
			  							  .replace(/:memo/g, tv_oCustomerInfo.memo);
		$("#searchCustomerListPopup #tblCustomerList tbody").append(lv_sAppendStr);
	});
	
	 $("#searchCustomerListPopup").modal();
}