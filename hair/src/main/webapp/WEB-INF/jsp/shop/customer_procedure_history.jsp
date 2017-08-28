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
	<link rel="stylesheet" href="${contextPath}/resources/jQuery.NumPad-master/jquery.numpad.css">
	
	<script src="${contextPath}/resources/jquery/jquery-3.2.1.min.js"></script>
	<script src="${contextPath}/resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script src="${contextPath}/resources/jQuery.NumPad-master/jquery.numpad.js"></script>
	
	<script src="${contextPath}/js/shop/customer_procedure_history.js"></script>

	<script type="text/javascript">
      // Set NumPad defaults for jQuery mobile. 
      // These defaults will be applied to all NumPads within this document!
      $.fn.numpad.defaults.gridTpl = '<table class="table modal-content"></table>';
      $.fn.numpad.defaults.backgroundTpl = '<div class="modal-backdrop in"></div>';
      $.fn.numpad.defaults.displayTpl = '<input type="text" class="form-control" />';
      $.fn.numpad.defaults.buttonNumberTpl =  '<button type="button" class="btn btn-default"></button>';
      $.fn.numpad.defaults.buttonFunctionTpl = '<button type="button" class="btn"></button>';
      $.fn.numpad.defaults.onKeypadCreate = function(){$(this).find('.done').addClass('btn-primary');};
      
    </script>
</head>
<body>
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">검색</h3>
	  	</div>
	  	<div class="panel-body">
	  	  <div class="input-group">
			    <span class="input-group-addon"><i class="glyphicon glyphicon-phone"></i></span>
          <input id="txtCustomerPhoneNumber" type="text" class="form-control" name="customerPhoneNumber" placeholder="phone number" data-numpad="nmpd1" data-toggle="tooltip" data-placement="bottom" title="전화번호 뒷자리 입력">
			    <div class="input-group-btn">
			      <button class="btn btn-default" type="button" id="btnSearchCustomerByPhoneNumber">
			        <i class="glyphicon glyphicon-search"></i>
			      </button>
			      <button class="btn btn-success" type="button" id="btnPopupRegisterShopCustomerLayer">
              <i class="glyphicon glyphicon-user"></i>
            </button>
			    </div>
			  </div>
			  <!-- <div class="input-group">
			    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
			    <input id="txtCustomerName" type="text" class="form-control" name=customerName placeholder="고객명" data-toggle="tooltip" data-placement="left" title="고객명 입력">
			    <div class="input-group-btn">
            <button class="btn btn-default" type="button" id="btnSearchCustomerByName">
              <i class="glyphicon glyphicon-search"></i>
            </button>
          </div>
			  </div> -->
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
    	  <button class="btn btn-success" type="button" id="btnPopupInsertProcedureHistory">
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
          </tr>
          <tr>
						<td>2</td>
						<td>일반펌</td>
						<td>2017.07.05</td>
						<th>지니</th>
						<td>100</td>
						<td>일이삼사오육</td>
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
            <input id="txtCustomerName" type="text" class="form-control" name="customerName" placeholder="customer name" data-toggle="tooltip" data-placement="bottom" title="고객명">           
          </div>
          <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-phone"></i></span>
            <input id="txtCustomerPhoneNumber" type="text" class="form-control" name="customerPhoneNumber" placeholder="phone number" data-toggle="tooltip" data-placement="bottom" title="전화번호">           
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id="btnRegisterShopCustomer-popupRegisterShopCustomer">추가</button>
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
          <div class="container">          
					  <div class="btn-group">
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                시술 종류 <span class="caret"></span></button>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">컷</a></li>
                  <li><a href="#">펌</a></li>
                  <li><a href="#">염색</a></li>
                </ul>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                시술<span class="caret"></span></button>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">여성컷</a></li>
	                <li><a href="#">남성컷</a></li>
	                <li><a href="#">키즈컷</a></li>
	                <li><a href="#">실버컷</a></li>
                </ul>
              </div>
					  </div>
					</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id="btnRegisterShopCustomer-popupRegisterShopCustomer">추가</button>
        </div>
      </div>
    </div>
  </div>
  
</body>
</html>