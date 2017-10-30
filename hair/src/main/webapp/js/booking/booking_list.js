$(document).ready(function(){
	
	moment.locale("ko");
	
	//datetime picker
	$('#divSearchBookingDateFrom, #divSearchBookingDateTo').datetimepicker({
        language:  'ko',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
		
	$("#divSearchBookingDateFrom .form-control").val(moment().format('YYYY-MM-DD'));
	$("#hidSearchBookingDateFrom").val(moment().format('YYYYMMDD'));
	$("#divSearchBookingDateTo .form-control").val(moment().add(1,'year').format('YYYY-MM-DD'));
	$("#hidSearchBookingDateTo").val(moment().add(1,'year').format('YYYYMMDD'));
	
	//dropdown click
	/*$(document).on("click", ".dropdown-menu li a", function(){
	  $(this).parents(".btn-group:first").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".btn-group:first").find('.btn').val($(this).parents("li:first").data("id"));
	});*/
	
	$(document).on("click", ".dropdown-menu li", function(){
	  $(this).parents(".btn-group:first").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".btn-group:first").find('.btn').val($(this).data("id"));
	});
	
	//검색 button click
	$(document).on("click", "#btnSearchBookingList", function(){
		var lv_nProgress = $("#btnSearchProgress").val(); 
		var lv_sFromDate = $("#hidSearchBookingDateFrom").val();
		var lv_sToDate = $("#hidSearchBookingDateTo").val();
		//예약 목록 조회
		searchBookingList( lv_nProgress, lv_sFromDate, lv_sToDate );
	});
	
	//예약 목록에서 Row click
	$("#tblBookingList tbody").on("click", "tr", function(){
    	console.log("select tr");
    	$(this).addClass("active").siblings().removeClass("active");
    });
	
	//예약 목록에서 변경 button click
	$("#tblBookingList tbody").on("click", ".btn", function(){
		var lv_sServiceExpectBeginDateTime = $(this).parents("tr:first").data("service-expect-begin-datetime");
		var lv_sBookingDate = $(this).parents("tr:first").data("booking-datetime");
		var lv_sCustomerName = $(this).parents("tr:first").data("customer-name");
		var lv_sServiceName = $(this).parents("tr:first").data("service-name");
		var lv_sHairdresserId = $(this).parents("tr:first").data("hairdresser-id");
		var lv_sHairdresserName = $(this).parents("tr:first").data("hairdresser-name");
		var lv_sMemo = $(this).parents("tr:first").data("memo");
		$("#popupBookingInfo-serviceExpectBeginDatetime .form-control").val(moment(lv_sServiceExpectBeginDateTime,"YYYYMMDDHHmm").format("YYYY-MM-DD a h:mm"));
		$("#hid-popupBookingInfo-serviceExpectBeginDatetime").val(moment(lv_sServiceExpectBeginDateTime,"YYYYMMDDHHmm").format("YYYYMMDDHHmm"));
		$("#bookingInfoPopup span.bookingDatetime").text(moment(lv_sBookingDate,"YYYYMMDDHHmm").format("YYYY-MM-DD a h:mm"));
		$("#popupBookingInfo-customerName").text(lv_sCustomerName);
		$("#popupBookingInfo-serviceName").text(lv_sServiceName);
		$("#popupBookingInfo-btnBookingProgress span").text(lv_sHairdresserName);
		$("#popupBookingInfo-btnBookingProgress").val(lv_sHairdresserId);
		$("#popupBookingInfo-memo").text(lv_sMemo);
		$("#bookingInfoPopup").modal();
    });
	
	//예약 상세 화면에서 변경 button click
	$(document).on("click", "#popupBookingInfo-btnBookingUpate", function(){
		//update 예약 정보
    });
	
		
	//예약 목록 기초 정보 획득
	getBookingListBasicInfo();

});

//예약 목록 기초 정보 획득
function getBookingListBasicInfo(){	
	$.ajax({
		url : "/hair/booking/booking-list-basic-info",
		method : "GET",
		success : function(resData) {
			//진행 구분 목록 설정
			setBookingProgressList( resData.bookingProgressList );
			//디자이너 목록 설정
			setHairdresserList( resData.hairdresserList );			
		}
	});
}

//진행 구분 목록 설정
function setBookingProgressList( p_BookingProgressList ){
	var lv_sLiTemplate =	"<li data-id=':id'><a href='#'>:name</a></li>";
	var lv_sAppendStr = "";
	//진행 구분 목록 초기화 	
	$("#ulBookingProgressList").empty("li");
	$("#popupBookingInfo-ulBookingProgressList").empty("li");
	//진행 구분 항목 추가 
	$.each(p_BookingProgressList, function( tv_nLoopIndex, tv_oBookingProgressInfo ) {
		//console.log(tv_nLoopIndex + ' : ' + tv_oHairdresserInfo);
		lv_sAppendStr =	lv_sLiTemplate.replace(/:id/g, tv_oBookingProgressInfo.bookingProgressId)
									  .replace(/:name/g, tv_oBookingProgressInfo.name);
		$("#ulBookingProgressList").append(lv_sAppendStr);
		$("#popupBookingInfo-ulBookingProgressList").append(lv_sAppendStr);
	});
	//전체 추가
	lv_sAppendStr =	lv_sLiTemplate.replace(/:id/g, "0")
	                              .replace(/:name/g, "전체");
	$('#ulBookingProgressList').append(lv_sAppendStr);
	
	$("#btnSearchProgress").val($('#ulBookingProgressList li:first').data('id'));
	$("#btnSearchProgress").text($('#ulBookingProgressList li:first a').text());
	
	//최초 조회
	var lv_nProgress = $("#btnSearchProgress").val(); 
	var lv_sFromDate = $("#hidSearchBookingDateFrom").val();
	var lv_sToDate = $("#hidSearchBookingDateTo").val();
	//예약 목록 조회
	searchBookingList( lv_nProgress, lv_sFromDate, lv_sToDate );
	
}

//디자이너 목록 설정
function setHairdresserList( p_HairdresserList ){
	var lv_sLiTemplate =	"<li data-id=':id'><a href='#'>:name</a></li>";
	var lv_sAppendStr = "";
	//진행 구분 목록 초기화 	
	$('#ulHairdresserList').empty('li');
	//진행 구분 항목 추가 
	$.each(p_HairdresserList, function( tv_nLoopIndex, tv_oHairdresserInfo ) {
		//console.log(tv_nLoopIndex + ' : ' + tv_oHairdresserInfo);
		lv_sAppendStr =	lv_sLiTemplate.replace(/:id/g, tv_oHairdresserInfo.id)
									  .replace(/:name/g, tv_oHairdresserInfo.nickname);
		$('#ulHairdresserList').append(lv_sAppendStr);
	});
}

//예약 목록 조회
function searchBookingList( p_progress, p_fromDate, p_toDate ){
	
	var lv_sUrl = "/hair/booking/kor20170701001/list?progress=" + p_progress + "&fromDate=" + p_fromDate + "&toDate=" + p_toDate;
	
	$.ajax({
		url : lv_sUrl,
		method : "GET",
		success : function(resData) {
			console.log(resData);				
			console.log("length : " + resData.length);
			setBookingList(resData);
		}
	});
}


//예약 목록 표시
function setBookingList( p_aBookingList ){
	var lv_sTrTemplate =	"<tr data-booking-datetime=':bookingDateTime' data-service-name=':serviceName' data-hairdresser-id=':hairdresserId' data-hairdresser-name=':hairdresserName' data-service-expect-begin-datetime=':serviceExpectBeginDateTime' data-service-expect-end-datetime=':serviceExpectEndDateTime' data-customer-name=':customerName' data-customer-phone-number=':customerPhoneNumber' data-memo=':memo'> " +
							"	<td>:formatedBookingDateTime</td>" + 
							"	<td>:customerName</td>" +
							"	<td>:serviceName</td>" +
							"	<td>:hairdresserName</td>" +
							"	<td>:progressName</td>" +
							"	<td> " +
			                "     <button type='button' class='btn btn-default btn-sm'><i class='glyphicon glyphicon-ok-sign'></i>변경</button> " +
							"   </td> " +
							"</tr> ";
	
	//기존 예약 목록 초기화
	$("#tblBookingList tbody tr").remove();

	//예약 목록 추가
	$.each(p_aBookingList, function( tv_nLoopIndex, tv_oBookingInfo ) {
		console.log(tv_nLoopIndex + " : " + tv_oBookingInfo);
		var lv_sAppendStr =	lv_sTrTemplate.replace(/:bookingDateTime/g, tv_oBookingInfo.bookingDatetime)
		                                  .replace(/:serviceName/g, tv_oBookingInfo.serviceName)
		                                  .replace(/:hairdresserId/g, tv_oBookingInfo.hairdresserId)
		                                  .replace(/:hairdresserName/g, tv_oBookingInfo.hairdresserName)
										  .replace(/:serviceExpectBeginDateTime/g, tv_oBookingInfo.serviceExpectBeginDatetime)
										  .replace(/:serviceExpectEndDateTime/g, tv_oBookingInfo.serviceExpectEndDatetime)
										  .replace(/:customerPhoneNumber/g, tv_oBookingInfo.customerPhoneNumber)
										  .replace(/:formatedBookingDateTime/g, tv_oBookingInfo.bookingDatetime)	
										  .replace(/:customerName/g, tv_oBookingInfo.customerName)
										  .replace(/:serviceName/g, tv_oBookingInfo.serviceName)
										  .replace(/:hairdresserName/g, tv_oBookingInfo.hairdresserName)
										  .replace(/:progressName/g, tv_oBookingInfo.progress)
										  .replace(/:memo/g, tv_oBookingInfo.memo);
		$("#tblBookingList tbody").append(lv_sAppendStr);
	});
}
