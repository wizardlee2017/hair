<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>test</title>
<link rel="stylesheet" href="/webjars/bootstrap/3.3.7-1/css/bootstrap.min.css">
<script src="/webjars/jquery/3.2.1/jquery.min.js"></script>
<script src="/webjars/bootstrap/3.3.7-1/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="panel panel-default">
		<div class="panel-heading">
	    	<h3 class="panel-title">검색</h3>
	  	</div>
	  	<div class="panel-body">
	    	이름, 전화번호 검색
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