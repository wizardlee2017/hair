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
<script src="${contextPath}/resources/jquery/jquery-3.2.1.min.js"></script>
<script src="${contextPath}/resources//bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>

<!-- <link rel="stylesheet" href="/webjars/bootstrap/3.3.7-1/css/bootstrap.min.css">
<script src="/webjars/jquery/3.2.1/jquery.min.js"></script>
<script src="/webjars/bootstrap/3.3.7-1/js/bootstrap.min.js"></script> -->
</head>
<body>
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">검색</h3>
	  	</div>
	  	<div class="panel-body">
	    	<div class="input-group">
	    		<span class="input-group-addon" id="phoneNumber">전화번호</span>
				<input type="text" class="form-control" placeholder="전화번호 뒷자리" aria-describedby="phoneNumber">
				<span class="input-group-addon" id="name">이름</span>
				<input type="text" class="form-control" placeholder="고객명" aria-describedby="name">
			</div>
			<div class="btn-toolbar" role="toolbar" aria-label="...">
				<div class="btn-group" role="group" aria-label="...">
					<button type="button" class="btn btn-default">검색</button>
				</div>
				<div class="btn-group" role="group" aria-label="...">
					<button type="button" class="btn btn-default">고객 등록</button>
				</div>
			</div>
	  	</div>
	</div>
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">검색 결과</h3>
	  	</div>
	  	<div class="panel-body">
	    	검색된 결과 표시(고객 정보)
	  	</div>
	</div>		
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">시술 결과</h3>
	  	</div>
	  	<div class="panel-body">
	    	시술 목록 grid, grid 항목 선택시 시술 내역	    	
	  	</div>
			<table class="table table-striped">
			    <thead>
					<tr>
			        	<th>No.</th>
			        	<th>시술명</th>
			        	<th>시술일</th>
			      	</tr>
				</thead>
			    <tbody>
					<tr>
			        	<td>1</td>
			        	<td>여성컷</td>
			        	<td>2017.07.05</td>
			      	</tr>
			      	<tr>
			        	<td>2</td>
			        	<td>일반펌</td>
			        	<td>2017.07.25</td>
			      	</tr>
			    </tbody>
			</table>
	    
	</div>
</body>
</html>