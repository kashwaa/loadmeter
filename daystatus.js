function getDayStatus()
{
	var resultG;
	$.ajax({
		dataType:"text",
		async:false,
		url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Floadmeter.egyptera.org%2FClockToolTip.aspx%22%20and%20xpath%3D'%2F%2Finput%5B%40id%3D%22__VIEWSTATE%22%5D'&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
		success:function(data){
		var result=$(data).find('#__VIEWSTATE').attr('value');
		var decrypted=atob(result);
		var matches=decrypted.match(/Images\/.*?\.png/g);
		var results=new Array();
		var startDate=new Date();
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		for (index = 0;matches!=null && index < matches.length; ++index) {
			var status="";
			switch (matches[index])
			{
				case "Images/ClockColorSmall3.png":
				status="Danger";
				break;
				case "Images/ClockColorSmall2.png":
				status="Warning";
				break;
				case "Images/ClockColorSmall1.png":
				status="Safe";
				break;
			}
			results.push({date:startDate,status:status});
			startDate = new Date(startDate.getTime() + 15*60000);
		}
		//console.log(results);
		resultG= results
		}
	});
	return resultG;
}