require(
    [
        "../bower_components/jquery/dst/jquery.min.js",
    ],


    function( _jquery_) {

		var utilsPrototype = {};

		utilsPrototype.ajax = function(obj) {
			data= obj.request_data;
			url=obj.url;
			if(obj.type){
				type = obj.type;
			}
			else {
				type = "GET";
			}
			if(type == "GET") {
					url = url + "?"; 
					for(var i in data){
						url = url + i + "=" + data[i] + "&";
					}
					url = url.substring(0,url.length - 1 );
					console.log(url);
				$.ajax({
					url: url,
					type: type,
					contentType: 'application/json;charset=UTF-8',
					success: function(msg){
						console.log(msg);
					}
				})			
			}
			else {
				$.ajax({
					url: url,
					type: type,
					data: JSON.stringify(data, null, '\t'),
					contentType: 'application/json;charset=UTF-8',
					success: function(msg){
						console.log(msg);
					}
				})
			}
		}
		
		var Utils = function(){
			function F() {};
			F.prototype = utilsPrototype;
			return new F;
		}

		utils = new Utils();

}

);

