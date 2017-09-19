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
	<link rel="stylesheet" href="${contextPath}/resources/jQuery.NumPad-master/jquery.numpad.css">
	<link rel="stylesheet" href="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.css">
	
</head>
<body>
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">검색</h3>
	  	</div>
	  	<div class="panel-body">
	  	  <div class="input-group">
			    <span class="input-group-addon"><i class="glyphicon glyphicon-phone"></i></span>
          <input id="txtCustomerPhoneNumber" type="text" class="form-control" name="customerPhoneNumber" placeholder="전화번호, 미등록 고객은 000 입력" data-numpad="nmpd1" data-toggle="tooltip" data-placement="bottom" title="전화번호 뒷자리 입력, 미등록 고객은 000 입력">
			    <div class="input-group-btn">
			      <button class="btn btn-default" type="button" id="btnSearchCustomerByPhoneNumber">
			        <i class="glyphicon glyphicon-search"></i>
			      </button>
			      <button class="btn btn-success" type="button" id="btnPopupRegisterShopCustomerLayer">
              <i class="glyphicon glyphicon-user"></i>
            </button>
			    </div>
			  </div>
	  	</div>
	</div>
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">검색 결과</h3>
	  	</div>
	  	<div class="panel-body">
	    	<span class="label label-default" id="lblCustomerName">고객명</span>
	    	<span class="label label-default" id="lblCustomerPhoneNumber">010-1234-1100</span>
	  	</div>
	</div>		
	<div class="panel panel-default">
		<div class="panel-heading">
    	<h3 class="panel-title">시술 목록
    	  <button class="btn btn-sm disabled" type="button" id="btnPopupInsertProcedureHistory">
           <i class="glyphicon glyphicon-plus">추가</i>
         </button>
       </h3>
    </div>
  	<div class="panel-body">
    	<table class="table table-striped" id="tblCustomerProcedureHistoryList">
        <thead>
          <tr>
						<th>No.</th>
						<th>시술명</th>
						<th>시술일</th>
						<th>디자이너</th>                
						<th>시술가</th>
						<th>메모</th>
						<th>변경/삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
						<td>1</td>
						<td>여성컷</td>
						<td>2017.07.05</td>
						<th>루나</th>
						<td>100</td>
						<td>일이삼사오육</td>
						<td>
						  <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-ok-sign"></i></button>
                <button type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-remove-sign"></i></button>
              </div>
						</td>
          </tr>
          <tr>
						<td>2</td>
						<td>일반펌</td>
						<td>2017.07.05</td>
						<th>지니</th>
						<td>100</td>
						<td>일이삼사오육</td>
						<td>
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-ok-sign"></i></button>
                <button type="button" class="btn btn-default btn-sm"><i class="glyphicon glyphicon-remove-sign"></i></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>	    	
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
  
  <!-- 고객 등록 -->
  <div id="popupRegisterShopCustomer" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">고객 등록</h4>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input id="popupRegisterShopCustomer-txtCustomerName" type="text" class="form-control" name="customerName" placeholder="customer name" data-toggle="tooltip" data-placement="bottom" title="고객명">           
          </div>
          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-phone"></i></span>
            <input id="popupRegisterShopCustomer-txtCustomerPhoneNumber" type="text" class="form-control" name="customerPhoneNumber" placeholder="phone number" data-toggle="tooltip" data-placement="bottom" title="전화번호">           
          </div>
          <br>
          <div class="input-group customer-list hidden">
	          동일한 전화번호로 등록된 정보가 존재 합니다.
	          동일인이 아닐 경우, 신규등록 버튼 클릭을 하시고, 동일인일 경우 아래 목록에서 선택하세요.
	          <table class="table customer-list">
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
	          <div class="input-group">
	            <button type="button" class="btn btn-success new" >신규로 등록.(다른 사람일 경우)</button>
              <button type="button" class="btn btn-default old disabled" >기존 고객으로 등록(같은 사람일 경우)</button>           
	          </div>
	        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success checkValidation">중복 확인</button>
          <button type="button" class="btn btn-default disabled" id="btnRegisterShopCustomer-popupRegisterShopCustomer">추가</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 시술 추가 -->
  <div id="popupInsertProcedureHistory" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">시술 이력 추가</h4>
        </div>
        <div class="modal-body">
          
	        <div class="form-group">
	          <label for="dtp_input2" class="col-md-2 control-label">시술일</label>
	          <div id="popupInsertProcedureHistory-date" class="input-group date form_date col-md-5" data-date="" data-date-format="yyyy-mm-dd" data-link-field="hidSelectedProcedureDate" data-link-format="yyyymmdd">
	            <input class="form-control" size="16" type="text" value="" readonly>
	            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
	            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
	          </div>
	          <input type="hidden" id="hidSelectedProcedureDate" value="" /><br/>
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
	         <div class="btn-group">
	            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btnSelectedProcedureType">
	            시술 유형<span class="caret"></span></button>
	            <ul class="dropdown-menu" role="menu" id="ulProcedureTypeList" >
	              <li><a href="#">일반</a></li>
	              <li><a href="#">행사</a></li>
	              <li><a href="#">A/S</a></li>
	            </ul>
	          </div>
	       </div>
	       <div class="input-group">
	         <span class="input-group-addon"><i class="glyphicon glyphicon-piggy-bank"></i>금액</span>
	         <input id="txtProcedurePrice" type="text" class="form-control" name="procedurePrice" placeholder="시술가" data-toggle="tooltip" data-placement="bottom" title="시술가">
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
  <%-- <script type="text/javascript" src="${contextPath}/resources/bootstrap-4.0.0-beta-dist/js/popper.min.js"></script> --%>  
  <%-- <script type="text/javascript" src="${contextPath}/resources/bootstrap-4.0.0-beta-dist/js/bootstrap.min.js"></script> --%>  
  <script type="text/javascript" src="${contextPath}/resources/jQuery.NumPad-master/jquery.numpad.js"></script>  
  <script type="text/javascript" src="${contextPath}/js/shop/customer_procedure_history.js"></script>  
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
  <script type="text/javascript" src="${contextPath}/resources/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.ko.js" charset="UTF-8"></script>

</body>
</html>