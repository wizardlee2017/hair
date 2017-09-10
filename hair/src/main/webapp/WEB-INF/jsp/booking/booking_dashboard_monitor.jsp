<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="<%= request.getContextPath()%>"></c:set>  
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>test</title>
	
	<link rel="stylesheet" href="${contextPath}/resources/bootstrap-3.3.7-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.css">
	
	<link rel="stylesheet" href="${contextPath}/css/schedule-week.css">
	
</head>
<body>
	<div class="container-fluid">
    <div class="panel panel-default">
	    <div class="panel-heading">
	        <h3 class="panel-title">Weekly</h3>
	      </div>
	      <div class="panel-body">
	        <table class="table table-bordered schedule-week" id="">
		        <thead>
		          <tr class="date">
		            <th>시간</th>
		            <th class="today" colspan=2>2017-09-06(목)</th>
		            <th colspan=2>2017-09-07(금)</th>
		            <th colspan=2>2017-09-08(토)</th>
		            <th colspan=2>2017-09-09(일)</th>                
		            <th colspan=2>2017-09-10(월)</th>
		            <th colspan=2>2017-09-11(화)</th>
		            <th colspan=2>2017-09-12(수)</th>
		          </tr>
		          <tr class="hairdresser">
                <th></th>
                <th class="today day-start" data-hairdresser-id=1>루나</th>
                <th class="today day-end" data-hairdresser-id=2>지니</th>
                <th class="day-start" data-hairdresser-id=1>루나</th>
                <th class="day-end" data-hairdresser-id=1>지니</th>
                <th class="day-start" data-hairdresser-id=1>루나</th>
                <th class="day-end" data-hairdresser-id=1>지니</th>
                <th class="day-start" data-hairdresser-id=1>루나</th>
                <th class="day-end" data-hairdresser-id=1>지니</th>                
                <th class="day-start" data-hairdresser-id=1>루나</th>
                <th class="day-end" data-hairdresser-id=1>지니</th>
                <th class="day-start" data-hairdresser-id=1>루나</th>
                <th class="day-end" data-hairdresser-id=1>지니</th>
                <th class="day-start" data-hairdresser-id=1>루나</th>
                <th class="day-end" data-hairdresser-id=1>지니</th>
              </tr>
		        </thead>
		        <tbody>
		          <tr>
		            <td>am.10</td>
		            <td class="today day-start"></td>
		            <td class="today day-end"></td>
		            <td class="day-start"></td>
		            <td class="day-end"></td>
		            <td class="day-start"></td>
		            <td class="day-end">
                  <span class="booking-item label label-success">10:30~12:10<br>염색
                  </span>
                </td>
		            <td class="day-start"></td>
		            <td class="day-end"></td>
		            <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
		          </tr>
		          <tr>
		            <td>am.11</td>
                <td class="today day-start">
                  <span class="booking-item label label-primary">11:20~12:30<br>펌
                  </span>
                </td>
                <td class="today day-end">
                  <span class="booking-item label label-success">11:30~12:20<br>염색
                  </span>
                </td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
		          </tr>
		          <tr>
                <td>pm.12</td>
                <td class="today day-start"></td>
                <td class="today day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.1</td>
                <td class="today day-start">
                  <span class="booking-item label label-primary">1:40~2:20<br>컷
                  </span>
                </td>
                <td class="today day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.2</td>
                <td class="today day-start"></td>
                <td class="today day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.3</td>
                <td class="today day-start"></td>
                <td class="today day-end">
                  <span class="booking-item label label-success">3:30~4:10<br>컷
                  </span>
                </td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.4</td>
                <td class="today day-start"></td>
                <td class="today day-end"></td>
                <td class="day-start">
                  <span class="booking-item label label-primary">4:10~6:20<br>염색
                  </span>
                </td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.5</td>
                <td class="today day-start"></td>
                <td class="today day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.7</td>
                <td class="today day-start"></td>
                <td class="today day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
              <tr>
                <td>pm.8</td>
                <td class="today day-start"></td>
                <td class="today day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
                <td class="day-start"></td>
                <td class="day-end"></td>
              </tr>
		        </tbody>
		      </table>    
	      </div>
	  </div>    
	  <div class="panel panel-default">
	    <div class="panel-heading">
	      <h3 class="panel-title">예약</h3>
	    </div>
      <div class="panel-body">
        <ul class="nav nav-tabs">
				  <li class="active"><a data-toggle="tab" href="#request-booking">예약 신청</a></li>
				  <li><a data-toggle="tab" href="#today-booking-able-time">오늘 예약 가능 시간</a></li>
				</ul>
				
				<div class="tab-content">
			    <div id="request-booking" class="container tab-pane fade in active">
			      <span class="label label-default" id="lblCustomerName">예약일시</span>
			      <span class="label label-default" id="lblCustomerPhoneNumber">시술 종류</span>
			    </div>
			    <div id="today-booking-able-time" class="container tab-pane fade">
			      <span class="label label-default" id="lblCustomerName">오늘 예약 가능 시간 정보</span>
			    </div>
			  </div>
      </div>
	</div>
	
  
  <script type="text/javascript" src="${contextPath}/resources/jquery/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="${contextPath}/js/common/function_library.js"></script>
  <script type="text/javascript" src="${contextPath}/js/booking/booking_dashboard_monitor.js"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.ko.js" charset="UTF-8"></script>

</body>
</html>