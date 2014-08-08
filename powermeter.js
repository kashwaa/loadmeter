function powerMeter(id,width,interval)
{
	getStatus(id,width);
	setInterval(function(){getStatus(id,width);},interval*1000)
}
function getStatus(id,width)
{
	$('#'+id).html('<img src="loading.gif" width="'+width+'" height="'+width+'"/>');
	$.ajax({
		dataType:"text",
		async:true,
		url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Floadmeter.egyptera.org%2FMiniCurrentLoadClock3.aspx%22%20%20and%20xpath%3D'%2F%2Fimg%5Bcontains(%40id%2C%22FormView1_Imagexx%22)%5D'",
		success:function(data){
			var result=$(data).find('#FormView1_Imagexx').attr('src');
			var meter='';
			switch(result)
			{
				case "Images/c3.gif":
					meter="high";
					break;
				case "Images/c2.gif":
					meter="medium";
					break;
				case "Images/c1.gif":
					meter="low";
					break;
				default:
					meter="error";
			}
			$('#'+id).html('<img src="http://kashwaa.github.io/loadmeter/'+meter+'.png" width="'+width+'" height="'+width+'"/>');
			}
	});
}