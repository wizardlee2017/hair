$(document).ready(function(){
	
	var pv_oToday = new Date();
	
	//initialize components
	$('[data-toggle="tooltip"]').tooltip();
	
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
    	var customerInfo = {"id":$(selectedTr).data("id"), "name":$(selectedTr).data("name"), "phoneNumber":$(selectedTr).data("phone_number")}
    	setCustomerInfo( customerInfo );
    	
    	$("#btnPopupInsertProcedureHistory").removeClass("disabled").addClass("btn-success");
    });
    
    //click register shop customer button
    $("#btnPopupRegisterShopCustomerLayer").click(function(){
    	$("#popupRegisterShopCustomer").modal();    	
    });
    
    
    $(document).on("click", "#btnRegisterShopCustomer-popupRegisterShopCustomer", function(){
    	var customerInfo = {"name":$("#popupRegisterShopCustomer #txtCustomerName").val(), "phoneNumber":$("#popupRegisterShopCustomer #txtCustomerPhoneNumber").val()};
    	addShopCustomer(customerInfo);
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
    
});



//시술 추가
function addProcedureHistory( procedureHistoryInfo ){
	var lv_sBaseUrl = "/hair/shop/kor20170701001/customer/{customerId}/procedure-history";
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
			var lv_oCustomerInfo = {"id":$("#lblCustomerName").data("id")};
			requestCustomerProcedureHistoryList(lv_oCustomerInfo);
		}
	});
}

//메뉴 목록 획득
function getShopMenuList( menuTypeId ) {
	var lv_sUrl = "/hair/shop/kor20170701001/menu-list?menuTypeId=" + menuTypeId;
	
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
	var lv_sUrl = "/hair/shop/kor20170701001/register-procedure-basic-info";
	
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
function addShopCustomer( customerInfo ){
	var lv_sBaseUrl = "/hair/shop/kor20170701001/customer";
	var lv_sUrl = lv_sBaseUrl.replace(/{customerId}/g, customerInfo.id);
	
	$.ajax({
		url : lv_sUrl,
		method : "POST",
		data : JSON.stringify(customerInfo),
		processData: false,
	    contentType: "application/json; charset=UTF-8",
	    complete : function(resData) {
			console.log(resData);	
			alert("등록 되었습니다.")
		}
	});
}

function setCustomerInfo( customerInfo ){
	$("#lblCustomerName").text(customerInfo.name).data("id", customerInfo.id);
	$("#lblCustomerPhoneNumber").text(customerInfo.phoneNumber);
	requestCustomerProcedureHistoryList(customerInfo);
}

//request register shop customer

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