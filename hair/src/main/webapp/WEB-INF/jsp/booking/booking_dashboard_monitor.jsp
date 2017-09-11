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
	        <h3 class="panel-title">주간 예약 현황</h3>
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
		        </tbody>
		      </table>    
	      </div>
	  </div>    
	  <div class="panel panel-default">
      <div class="panel-body">
        <button type="button" class="btn btn-primary" id="btnPopupRequestBooking">예약 신청</button>
      </div>
	  </div>
  </div>
  
  <!-- 고객 목록 -->
  <div id="searchCustomerListPopup" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">고객 목록</h4>
        </div>
        <div class="modal-body">
          <table class="table" id="tblCustomerList">
            <thead>
              <tr>
                <th>이름</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>일이삼</td>
                <td>010-1111-1234</td>
              </tr>
              <tr>
                <td>가나다</td>
                <td>010-1234-1100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">선택</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 예약 신청 -->
  <div id="popupRequestBooking" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">예약 신청</h4>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
              <input type="text" class="form-control" id="popupRequestBooking-customerName" placeholder="Username">              
            </div>
            <div class="input-group">
	             <span class="input-group-addon"><span class="glyphicon glyphicon-phone"></span></span>
	             <input type="text" class="form-control" id="popupRequestBooking-customerPhoneNumber" placeholder="Phone Number">
	           </div>
          </div>
         
          <div class="form-group">
            <label for="dtp_input2" class="col-md-2 control-label">예약일</label>
            <div id="popupRequestBooking-date" class="input-group date form_date col-md-5" data-date="" data-date-format="yyyy-mm-dd" data-link-field="hidSelectedBookingDate" data-link-format="yyyymmdd">
              <input class="form-control" size="16" type="text" value="" readonly>
              <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <input type="hidden" id="hidSelectedBookingDate" value="" /><br/>
          </div>  
          
          <div class="btn-group btn-group-xs">
            <div class="btn-group">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btnSelectedMenuType">
              시술 종류 <span class="caret"></span></button>
              <ul class="dropdown-menu" role="menu" id="ulMenuTypeList" >
                <li><a href="#">컷</a></li>
                <li><a href="#">펌</a></li>
                <li><a href="#">염색</a></li>
              </ul>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btnSelectedShopMenu">
              시술 목록<span class="caret"></span></button>
              <ul class="dropdown-menu" role="menu" id="ulShopMenuList" >
                <li><a href="#">여성컷</a></li>
               <li><a href="#">남성컷</a></li>
               <li><a href="#">키즈컷</a></li>
               <li><a href="#">실버컷</a></li>
              </ul>
            </div>
          </div>
          <div class="btn-group">
            <div class="btn-group">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btnSelectedHairdresser">
              디자이너 <span class="caret"></span></button>
              <ul class="dropdown-menu" role="menu" id="ulHairdresserList" >
                <li><a href="#">루나</a></li>
                <li><a href="#">지니</a></li>
              </ul>
            </div>
         </div>
         
         <div class="form-group">
           <label for="comment">Memo:</label>
           <textarea class="form-control" rows="3" id="taProcedureMemo"></textarea>
         </div>
          
                
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id="btnRegisterProdecureHistory-popupInsertProcedureHistory">추가</button>
        </div>
      </div>
    </div>
  </div>
  
  <script type="text/javascript" src="${contextPath}/resources/jquery/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="${contextPath}/js/common/function-library.js"></script>
  <script type="text/javascript" src="${contextPath}/js/booking/booking_dashboard_monitor.js"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.ko.js" charset="UTF-8"></script>

</body>
</html>