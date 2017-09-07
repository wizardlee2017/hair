$(document).ready(function(){
	
	getDashboardInfo();
    
});

//Dashboard 정보 획득
function getDashboardInfo() {
	
	var lv_sToday = new Date();
	
	var lv_sUrl = "/hair/booking/kor20170701001/dashboard-info?begin-date=" + lv_sToday.toISOString().slice(0,10).replace(/-/g,"");
	
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
	//주간 일자 설정.
	$("table.schedule-week thead tr.date th:gt(0)").attr("colspan",dashboardInfo.hairdresserList.length);
	
	$.each(pv_oSchedulerData.dateList, function (tv_nLoopIndex, tv_sDate){
		console.log(tv_nLoopIndex + " : " + tv_sDate);
		lv_sCurrentDate = tv_sDate;
		$("table.schedule-week thead tr.date th:eq(tv_nLoopIndex+1)").text(lv_sCurrentDate);
	})

	//set hairdresser
	$.each(pv_oSchedulerData.hairdresserList, function( tv_nLoopIndex, tv_oHairdresserInfo) {
	  console.log(tv_nLoopIndex + " : " + tv_oHairdresserInfo.nickname);
  })

}