$(document).ready(function(){
	//TODO: support global set	
	moment.locale("ko");
	
	var pv_oToday = new Date();
	
	//datetime picker
	$('#popupRequestBooking-date').datetimepicker({
        language:  'ko',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 0,
		forceParse: 0
    });
	
	getDashboardInfo();
	
	$(document).on("click", ".dropdown-menu li a", function(){
		  $(this).parents(".btn-group:first").find('.btn').html($(this).text() + ' <span class="caret"></span>');
		  $(this).parents(".btn-group:first").find('.btn').val($(this).parents("li:first").data("id"));
		  
		  //시술 종류일경우 메뉴 목록 설정
		  if($(this).parents("#ulMenuTypeList").length != 0){
			  var lv_sMenuTypeId = $(this).parents("li:first").data("id");
			  $("#ulShopMenuList").parents(".btn-group:first").find('.btn').html('시술 목록 <span class="caret"></span>');
			  getShopMenuList( lv_sMenuTypeId );
		  }
		  
		});
	
	//click register shop customer button
    $("#btnPopupRequestBooking").click(function(){
    	$("#popupRequestBooking-date .form-control").val(moment().format('YYYY-MM-DD HH:mm'));
    	$("#hidSelectedBookingDate").val(moment().format('YYYYMMDDHHmm'));
    	$("#popupRequestBooking-customerName").val("");
    	$("#popupRequestBooking-customerName").data("customer-id","");
    	$("#popupRequestBooking-customerPhoneNumber").val("");
    	$("#popupRequestBooking-taProcedureMemo").val("");
    	$("#popupRequestBooking").modal();
    	getRequestBookingBasicInfo();
    });
    
    $(document).on("keypress", "#popupRequestBooking-customerName, #popupRequestBooking-customerPhoneNumber", function(event){
    	if ( event.which == 13 ) {
    	     $("#popupRequestBooking-customerName, #popupRequestBooking-customerPhoneNumber").focusout();
    	  }
    	
    });
    
    $(document).on("focusout", "#popupRequestBooking-customerName, #popupRequestBooking-customerPhoneNumber", function(event){
    	console.log("check customer name and phone number");
    	event.preventDefault();
    	checkBookingCustomer();
    	
    });
    
    //select customer from customer list on popup.
    $("#searchCustomerListPopup #tblCustomerList tbody").on("click", "tr", function(){
    	console.log("select tr");
    	$(this).addClass("active").siblings().removeClass("active");
    });
    
    //click select button from customer list on popup.
    $("#searchCustomerListPopup .modal-footer button#searchCustomerListPopup-selectCustomer").on("click", function(){
    	var selectedTr = $("#searchCustomerListPopup #tblCustomerList tbody tr.active");
    	var customerInfo = {"id":$(selectedTr).data("id"), "name":$(selectedTr).data("name"), "phoneNumber":$(selectedTr).data("phone_number")}
    	
    	$("#popupRequestBooking-customerName").val($(selectedTr).data("name"))
    										  .data("customer-id", $(selectedTr).data("id"));
    	
    });
    
    //click request booking
    $("#btnRegisterProdecureHistory-popupInsertProcedureHistory").click(function(){
    	var bookingInfo = {
				"shopId":"kor20170701001",
				"customerId":$("#popupRequestBooking-customerName").data("customer-id"), 
				"customerName":$("#popupRequestBooking-customerName").val(),
				"customerPhoneNumber":$("#popupRequestBooking-customerPhoneNumber").val(),
				"bookingDatetime":$("#hidSelectedBookingDate").val(),
				"procedureMenuId":$("#popupRequestBooking-btnSelectedShopMenu").val(),
				"procedureHairdresserId":$("#btnSelectedHairdresser").val(),
				"bookingWay":20,
				"memo":$("#popupRequestBooking-taProcedureMemo").val()
				};
    	requestBooking( bookingInfo );
    });
    
});


//request booking
function requestBooking( bookingInfo ) {
	var lv_sBaseUrl = "/hair/booking";
	var lv_sUrl = lv_sBaseUrl;
	
	$.ajax({
		url : lv_sUrl,
		method : "POST",
		data : JSON.stringify(bookingInfo),
		processData: false,
	    contentType: "application/json; charset=UTF-8",
	    complete : function(resData) {
			console.log(resData);	
			alert("예약 신청 되었습니다. 접수처리가 되면 예약 확정 표시됩니다. 예약 시간은 접수 과정을 통해 변경될 수 있습니다.");
			getDashboardInfo();
			
		}
	});
}

//예약 신청자 조회
function checkBookingCustomer(){
	var lv_sCustomerName = $("#popupRequestBooking-customerName").val();
	var lv_sCustomerPhoneNumber = $("#popupRequestBooking-customerPhoneNumber").val();
	//이름과 전화번호가 모두 기입되어 있으면 해당 정보로 고객 조회를 한다.
	if ( (lv_sCustomerName.trim().length > 0) && (lv_sCustomerPhoneNumber.trim().length > 0)) {
		//고객 조회 - 기존 고객일 경우, 확인 절차 진행, 신규일 경우 일단 pass -> 예약 신청시 신규 처리.
		if( lv_sCustomerPhoneNumber.trim().length > 0 ) {
    		var lv_sBaseUrl = "/hair/customers/phone-number/{phoneNumber}";
        	var lv_sUrl = lv_sBaseUrl.replace(/{phoneNumber}/g, lv_sCustomerPhoneNumber);
        	
        	$.ajax({
        		url : lv_sUrl,
        		method : "GET",
        		success : function(resData) {
        			console.log(resData);				
        			console.log("length : " + resData.length);
        			//전화번호 기준으로 이미 고객 등록이 되어 있는데, 고객명이 다를 경우 확인, 기존 고객 정보 사용할지, 새로 등록하지 확인. 
        			if( (resData.length > 0 ) && (resData[0].name != lv_sCustomerName)){
        				showSearchCustomerListOnPopup(resData);
        			} else if( (resData.length == 1 ) && (resData[0].name == lv_sCustomerName)){
        				$("#popupRequestBooking-customerName").data("customer-id",resData[0].id);
        			}
        		}
        	});
    	}
	} else {
		//pass -> 예약 신청시 validate check.
	}
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

//Dashboard 정보 획득
function getDashboardInfo() {
	
	var lv_sToday = moment().format("YYYYMMDD");
	var lv_nCustomerId = $("#popupRequestBooking-customerName").data("customer-id");
	
	if(lv_nCustomerId == undefined){
		lv_nCustomerId = 0;
	}
	
	var lv_sUrl = "/hair/booking/kor20170701001/dashboard-info?begin-date=" + lv_sToday + "&customer-id=" + lv_nCustomerId;
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			//console.log("length : " + resData.length);
			setScheduler(resData);
		}
	});
}

function setScheduler( pv_oSchedulerData ){
	var lv_sCurrentDate = "";
	var lv_sAppendStr = "";
	var lv_sThHairdresserTemplate = "<th data-hairdresser-id=:id>:nickname</th>";
	var lv_sBookingTemplate = "<span class='booking-item :hairdresserColor :myBookingOrNot'>:beginTime ~ :endTime<br>:procedureName</span>";
	var lv_nCurrentTimeValue = 0;
	var lv_oTd;
	var lv_sMyBookingOrNot = "";
  
	//주간 일자 설정.
	$("table.schedule-week thead tr.date th:gt(0)").attr("colspan",pv_oSchedulerData.hairdresserList.length);
	//remove hairdresser thead
	$("table.schedule-week thead tr.hairdresser th:gt(0)").remove();
	//remove time axis
	$("table.schedule-week tbody").empty();
	
  
	$.each(pv_oSchedulerData.dateList, function (tv_nLoopIndex, tv_sDate){
		console.log(tv_nLoopIndex + " : " + tv_sDate);
		//set date
		//lv_sCurrentDate = tv_sDate;
		lv_sCurrentDate = moment(tv_sDate, "YYYYMMDD").format("YYYY-MM-DD(ddd)");
		$("table.schedule-week thead tr.date th").eq(tv_nLoopIndex+1).text(lv_sCurrentDate);
    
	    //set hairdresser
	    $.each(pv_oSchedulerData.hairdresserList, function( tv_nLoopIndexHairdresser, tv_oHairdresserInfo) {
	      console.log(tv_nLoopIndexHairdresser + " : " + tv_oHairdresserInfo.nickname);
	      lv_sAppendStr = lv_sThHairdresserTemplate.replace(/:id/g,tv_oHairdresserInfo.id)
	                                               .replace(/:nickname/g,tv_oHairdresserInfo.nickname);
	      $("table.schedule-week thead tr.hairdresser").append(lv_sAppendStr);
	      //set today class
	      if(tv_nLoopIndex <  1){
	        $("table.schedule-week thead tr.hairdresser th:last").addClass("today");
	      }
	
	      //set day-start/day-end class
	      if ( pv_oSchedulerData.hairdresserList.length > 1 ){
	    	  if( (tv_nLoopIndexHairdresser % pv_oSchedulerData.hairdresserList.length) == 0 ){
	  	        $("table.schedule-week thead tr.hairdresser th:last").addClass("day-start");
	  	      } else if( (tv_nLoopIndexHairdresser % pv_oSchedulerData.hairdresserList.length) == (pv_oSchedulerData.hairdresserList.length-1) ){
	  	        $("table.schedule-week thead tr.hairdresser th:last").addClass("day-end");
	  	      }
	      }
	      
	    })
    
	})
	
	//set time axis
    lv_nCurrentTimeValue = parseInt((parseInt(pv_oSchedulerData.shopInfo.openTime) / 100)) * 100;
    for(;lv_nCurrentTimeValue <= parseInt(pv_oSchedulerData.shopInfo.closeTime);) {
    	console.log(lv_nCurrentTimeValue + " : " + lv_nCurrentTimeValue);
    	
    	addTimeTr( pv_oSchedulerData, lv_nCurrentTimeValue );
    	
        lv_nCurrentTimeValue= lv_nCurrentTimeValue+100;
    }
    
    lv_nCurrentTimeValue= lv_nCurrentTimeValue-100;
    if((parseInt(pv_oSchedulerData.shopInfo.closeTime) - lv_nCurrentTimeValue) > 0){
        lv_nCurrentTimeValue= lv_nCurrentTimeValue+100;
        console.log(lv_nCurrentTimeValue + " : " + lv_nCurrentTimeValue);
        addTimeTr( pv_oSchedulerData, lv_nCurrentTimeValue );
    }
    
    //set booking item
    $.each(pv_oSchedulerData.bookingList, function ( tv_nIndexBooking, tv_oBookingInfo ){
    	
    	console.log("hairdresserColor : " + getHairdresserColor(tv_oBookingInfo.hairdresserId));
    	console.log("procedureExpectBeginDatetime : " + tv_oBookingInfo.procedureExpectBeginDatetime);
    	
    	if ( tv_oBookingInfo.myBookingOrNot == "Y" ) {
    		lv_sMyBookingOrNot = "my-booking";
    	} else {
    		lv_sMyBookingOrNot = "";
    	}
    		
    	
    	
    	lv_sAppendStr = lv_sBookingTemplate.replace(/:hairdresserColor/g,getHairdresserColor(tv_oBookingInfo.hairdresserId))
    									   .replace(/:myBookingOrNot/g,lv_sMyBookingOrNot)
    									   .replace(/:beginTime/g,getTimeStr(tv_oBookingInfo.bookingDatetime))
    									   .replace(/:endTime/g,getTimeStr(tv_oBookingInfo.procedureExpectEndDatetime))
    									   .replace(/:procedureName/g,tv_oBookingInfo.procedureName);
    	
    	console.log("lv_sAppendStr : " + lv_sAppendStr);
    	
    	lv_oTd = $("table.schedule-week tbody td[data-datetime='"+ getTimeAxisStr(tv_oBookingInfo.bookingDatetime) +"'][data-hairdresser-id='"+ tv_oBookingInfo.hairdresserId + "']");
    	lv_oTd.append(lv_sAppendStr);
    })
}

function addTimeTr( pv_oSchedulerData, p_nTimeValue ){
	var lv_sAppendStr = "";
	    
	var lv_sTdStr = "<td>" + convertTimeStrHhmmToAmPm(p_nTimeValue) + "</td>";
    
	$.each(pv_oSchedulerData.dateList, function (tv_nLoopIndex, tv_sDate){
		
		if ( pv_oSchedulerData.hairdresserList.length > 1 ){
			//미용사가 2인 이상
			$.each(pv_oSchedulerData.hairdresserList, function( tv_nLoopIndexHairdresser, tv_oHairdresserInfo) {
	    	      
	    	      //set day-start/day-end class
	    	      if( (tv_nLoopIndexHairdresser % pv_oSchedulerData.hairdresserList.length) == 0 ){
	    	    	  if ( tv_nLoopIndex == 0 ){
	    	    		  lv_sTdStr = lv_sTdStr + '<td class="today day-start" data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';  
	    	    	  } else {
	    	    		  lv_sTdStr = lv_sTdStr + '<td class="day-start" data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';  
	    	    	  }
	    	      } else if( (tv_nLoopIndexHairdresser % pv_oSchedulerData.hairdresserList.length) == (pv_oSchedulerData.hairdresserList.length-1) ){
	    	    	  if ( tv_nLoopIndex == 0 ){
	    	    		  lv_sTdStr = lv_sTdStr + '<td class="today day-end" data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';
	    	    	  } else {
	    	    		  lv_sTdStr = lv_sTdStr + '<td class="day-end" data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';
	    	    	  }
	    	      } else {
	    	    	  if ( tv_nLoopIndex == 0 ){
	    	    		  lv_sTdStr = lv_sTdStr + '<td class="today" data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';
	    	    	  } else {
	    	    		  lv_sTdStr = lv_sTdStr + '<td data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';
	    	    	  }
	    	      }
	    	      
	    	      lv_sTdStr = lv_sTdStr.replace(/:datetime/g, tv_sDate.substr(0,8)+p_nTimeValue.toString())
                  					   .replace(/:hairdresser-id/g, tv_oHairdresserInfo.id);
	    	      
	    	    })
		} else {
			//미용사가 1인.
			if ( tv_nLoopIndex == 0 ){
    		  lv_sTdStr = lv_sTdStr + '<td class="today" data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';
			} else {
    		  lv_sTdStr = lv_sTdStr + '<td data-datetime=:datetime data-hairdresser-id=:hairdresser-id></td>';
			}
			lv_sTdStr = lv_sTdStr.replace(/:datetime/g, tv_sDate.substr(0,8)+p_nTimeValue.toString())
                                 .replace(/:hairdresser-id/g, pv_oSchedulerData.hairdresserList[0].id);
		}
		
	})
    
    lv_sAppendStr = "<tr> " +
    				lv_sTdStr + 
                    "</tr>";
    	        
    $("table.schedule-week tbody").append(lv_sAppendStr);
   
}


function getTimeAxisStr( p_sDateTime ){
    var lv_sResult = parseInt(parseInt(p_sDateTime) / 100)*100;
    
    return lv_sResult.toString();
}

function getTimeStr( p_sDateTime ){
	var lv_sResult = "";
	
	try{
		lv_sResult = p_sDateTime.substr(8,2) + ":" + p_sDateTime.substr(10,2);
	} catch(e) {
		console.log("exception-getTimeStr : " + e );
	}
	
	
	
	return lv_sResult;
}

function getHairdresserColor( p_nHairdresserSeq ){
	try {
		return "hairdresser" + p_nHairdresserSeq;
	} catch (e){
		return "hairdresser0";
	}
	
	
	/*if( p_nHairdresserSeq == 1 ){
		return "label-primary";
	} else {
		return "label-success";
	}*/
	
}

//예약 신청 관련 기초 정보 획득
function getRequestBookingBasicInfo() {
	var lv_sUrl = "/hair/shops/kor20170701001/register-procedure-basic-info";
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			setRequestBookingBasicInfo(resData);
		}
	});
}

//예약 신청 관련 기초 정보 설정.
function setRequestBookingBasicInfo( p_RequestBookingBasicInfo){
	var lv_oHairdresserList = p_RequestBookingBasicInfo.hairdresserList;
	var lv_oMenuTypeList = p_RequestBookingBasicInfo.menuTypeList;
	
	var lv_sLiTemplateHairdresser =	"<li data-id=':id'><a href='#'>:name</a></li>";
	var lv_sLiTemplateMenuType =	"<li data-id=':id'><a href='#'>:name</a></li>";
	
	//set hairdresser	
	$('#ulHairdresserList').empty('li');
	$.each(lv_oHairdresserList, function( tv_nLoopIndex, tv_oHairdresserInfo ) {
		//console.log(tv_nLoopIndex + ' : ' + tv_oHairdresserInfo);
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