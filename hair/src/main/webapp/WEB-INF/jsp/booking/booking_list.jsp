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
	<%-- <link rel="stylesheet" href="${contextPath}/resources/bootstrap-4.0.0-beta-dist/css/bootstrap.min.css"> --%>
	<link rel="stylesheet" href="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.css">
	
</head>
<body>
	<div class="panel panel-default">
		<div class="panel-heading">
    	<div class="panel-group" id="accordion">
        <div class="panel panel-default">
          <div class="panel-heading">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span class="glyphicon glyphicon-plus"></span> 검색 조건</a>                
          </div>
          <div id="collapseOne" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="btn-group">
	              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btnSearchProgress">
	               <span class="caret">신청</span></button>
	              <ul class="dropdown-menu" role="menu" id="ulBookingProgressList" >
	                <li><a href="#">신청</a></li>
	                <li><a href="#">접수</a></li>
	                <li><a href="#">정상 시술 완료</a></li>	                
	                <li><a href="#">전체</a></li>
	              </ul>
	            </div>  
	            <div>	              
	              <div id="divSearchBookingDateFrom" class="input-group date form_date col-md-3" data-date="" data-date-format="yyyy-mm-dd" data-link-field="hidSearchBookingDateFrom" data-link-format="yyyymmdd">	                
	                <input class="form-control" size="16" type="text" value="" readonly>
	                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
	                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>	                
	              </div>
	              <input type="hidden" id="hidSearchBookingDateFrom" value="" /><br/>	              
	              <div id="divSearchBookingDateTo" class="input-group date form_date col-md-3" data-date="" data-date-format="yyyy-mm-dd" data-link-field="hidSearchBookingDateTo" data-link-format="yyyymmdd">
                  <input class="form-control" size="16" type="text" value="" readonly>
                  <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>                 
                </div>
                <input type="hidden" id="hidSearchBookingDateTo" value="" /><br/>
              </div>
              <button type="button" class="btn btn-default" data-dismiss="modal" id="btnSearchBookingList">검색</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  	<div class="panel-body">
    	<table class="table table-striped" id="tblBookingList">
        <thead>
          <tr>
						<th>예약 요청 일시</th>
						<th>고객명</th>
						<th>시술</th>
						<th>디자이너</th>                
						<th>진행상태</th>
						<th>예약확인(접수/시술완료,...)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
						<td>2017.09.10 오전 11:20</td>
						<td>고객1</td>
						<td>염색</td>
						<td>루나</td>
						<td>예약신청</td>
						<td>
						  <button type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-ok-sign"></i>변경</button>
						</td>
          </tr>
          <tr>
            <td>2017.09.10 오후 2:20</td>
            <td>고객2</td>
            <td>염색</td>
            <td>지니</td>
            <td>예약신청</td>
            <td>
              <button type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-ok-sign"></i>변경</button>
            </td>
          </tr>
        </tbody>
      </table>	    	
  	</div>
	</div>
  
  <!-- 예약 상세 화면(popup) -->
  <div id="bookingInfoPopup" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">예약 정보</h4>
        </div>
        <div class="modal-body">
          <dl class="dl-horizontal">
				    <dt>예약 일시</dt>
				    <dd>
				      <div id="popupBookingInfo-bookingDatetime" class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd hh:ii" data-link-field="popupBookingInfo-bookingDatetime" data-link-format="yyyymmddhhii">
                <input class="form-control" size="16" type="text" value="" readonly>
                <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
	            </div>
	            <input type="hidden" id="popupBookingInfo-bookingDatetime" value="" /><br/> 
					    <span>(고객 요청 일시 : <span class="bookingDatetime" >2017.09.10 오전 11:20</span> )</span>
				    </dd>
				    <dt>고객</dt>
				    <dd id="popupBookingInfo-customerName">고객1, 010-1234-1234, <span class="label label-default" id="lblCustomerName">이전 예약 이력</span></dd>
				    <dt>시술</dt>
				    <dd>염색</dd>
				    <dt>디자이너</dt>
            <dd>
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btnHairdresser">
                <span class="caret">디자이너</span></button>
                <ul class="dropdown-menu" role="menu" id="ulHairdresserList" >
                  <li><a href="#">디자이너1</a></li>
                  <li><a href="#">디자이너2</a></li>
                </ul>
              </div>
            </dd>
            <dt>메모</dt>
            <dd>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</dd>
				  </dl>
		    </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id="btnRegisterProdecureHistory-popupInsertProcedureHistory">예약접수/예약변경</button>
        </div>
      </div>
    </div>
  </div>
  
  <script type="text/javascript" src="${contextPath}/resources/jquery/jquery-3.2.1.min.js"></script>  
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
  <%-- <script type="text/javascript" src="${contextPath}/resources/bootstrap-4.0.0-beta-dist/js/popper.min.js"></script> --%>  
  <%-- <script type="text/javascript" src="${contextPath}/resources/bootstrap-4.0.0-beta-dist/js/bootstrap.min.js"></script> --%>
  <%-- <script type="text/javascript" src="${contextPath}/resources/moment-with-locales.min.js"></script> --%> 
  <script type="text/javascript" src="${contextPath}/resources/moment-with-locales.js"></script>
  <script type="text/javascript" src="${contextPath}/js/booking/booking_list.js"></script>  
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.ko.js" charset="UTF-8"></script>

</body>
</html>