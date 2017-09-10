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
	var lv_sAppendStr = "";
	var lv_sThHairdresserTemplate = "<th data-hairdresser-id=:id>:nickname</th>";
	var lv_sBookingTemplate = "<span class='booking-item label :hairdresserColor'>:beginTime ~ :endTime<br>:procedureName</span>";
	var lv_nCurrentTimeValue = 0;
	var lv_oTd;
  
	//주간 일자 설정.
	$("table.schedule-week thead tr.date th:gt(0)").attr("colspan",pv_oSchedulerData.hairdresserList.length);
	//remove hairdresser thead
	$("table.schedule-week thead tr.hairdresser th:gt(0)").remove();
	//remove time axis
	$("table.schedule-week tbody").empty();
	
  
	$.each(pv_oSchedulerData.dateList, function (tv_nLoopIndex, tv_sDate){
		console.log(tv_nLoopIndex + " : " + tv_sDate);
		//set date
		lv_sCurrentDate = tv_sDate;
		$("table.schedule-week thead tr.date th").eq(tv_nLoopIndex+1).text(lv_sCurrentDate);
    
	    //set hairdresser
	    $.each(pv_oSchedulerData.hairdresserList, function( tv_nLoopIndexHairdresser, tv_oHairdresserInfo) {
	      console.log(tv_nLoopIndexHairdresser + " : " + tv_oHairdresserInfo.nickname);
	      lv_sAppendStr = lv_sThHairdresserTemplate.replace(/:id/g,tv_oHairdresserInfo.id)
	                                               .replace(/:nickname/g,tv_oHairdresserInfo.nickname);
	      $("table.schedule-week thead tr.hairdresser").append(lv_sAppendStr);
	      //set today class
	      if(tv_nLoopIndexHairdresser <  pv_oSchedulerData.hairdresserList.length){
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
    	
    	
    	lv_sAppendStr = lv_sBookingTemplate.replace(/:hairdresserColor/g,getHairdresserColor(tv_oBookingInfo.hairdresserId))
    									   .replace(/:beginTime/g,getTimeStr(tv_oBookingInfo.procedureExpectBeginDatetime))
    									   .replace(/:endTime/g,getTimeStr(tv_oBookingInfo.procedureExpectEndDatetime))
    									   .replace(/:procedureName/g,tv_oBookingInfo.procedureName);
    	
    	console.log("lv_sAppendStr : " + lv_sAppendStr);
    	
    	lv_oTd = $("table.schedule-week tbody td[data-datetime='"+ getTimeAxisStr(tv_oBookingInfo.procedureExpectBeginDatetime) +"'][data-hairdresser-id='"+ tv_oBookingInfo.hairdresserId + "']");
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
	var lv_sResult = p_sDateTime;
	
	lv_sResult = p_sDateTime.substr(8,2) + ":" + p_sDateTime.substr(10,2);
	
	return lv_sResult;
}

function getHairdresserColor( p_nHairdresserSeq ){
	if( p_nHairdresserSeq == 1 ){
		return "label-primary";
	} else {
		return "label-success";
	}
	
}
