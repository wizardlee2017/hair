$(document).ready(function(){
    $("button").click(function(){
    	
    	var lv_sCustomerPhoneNumber = $("#customerPhoneNumber").val();
    	var lv_sCustomerName = encodeURI($("#customerName").val(),"UTF-8");
    	
    	var lv_sBaseUrl = "/hair/shop/kor20170701001/customer/list";
    	var lv_sUrl = "/hair/shop/kor20170701001/customer/list";
    	
    	if(lv_sCustomerPhoneNumber.length > 0){
    		lv_sUrl = lv_sBaseUrl + "?customerPhoneNumber=" + lv_sCustomerPhoneNumber;
    	}
    	
    	if(lv_sCustomerName.length > 0){
    		if(lv_sUrl == lv_sBaseUrl){
    			lv_sUrl = lv_sBaseUrl + "?customerName=" + lv_sCustomerName;
    		} else {
    			lv_sUrl = lv_sUrl + "&customerName=" + lv_sCustomerName;
    		}
    	}
    	
    	$.ajax({
			url : lv_sUrl,
			method : "GET",
			success : function(result) {
				$("#div1").html(result);
			}
		});
    });
});
