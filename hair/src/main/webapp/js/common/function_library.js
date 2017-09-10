// 1000 형태의 문자열을 am.10으로 되돌려준다.
function convertTimeStrHhmmToAmPm( pTimeHhmm ){
	var lv_sResult = "";
	var lv_TimeHhmm  = pTimeHhmm.toString();
	var lv_nTemp = parseInt(lv_TimeHhmm) - 1200;
	
	if( lv_nTemp < 0 ) {
		if( parseInt(lv_TimeHhmm) < 1000 ) {
			lv_sResult = "am." + lv_TimeHhmm.substr(0,1);
		} else {
			lv_sResult = "am." + lv_TimeHhmm.substr(0,2);
		}		
	} else if ( lv_nTemp >= 1000 ) {
		lv_sResult = "pm." + (parseInt(lv_TimeHhmm) - 1200).toString().substr(0,2);
    } else if ( lv_nTemp >= 100 ) {
		lv_sResult = "pm." + (parseInt(lv_TimeHhmm) - 1200).toString().substr(0,1);

	} else {
		lv_sResult = "12"
	}
	
	return lv_sResult;
}