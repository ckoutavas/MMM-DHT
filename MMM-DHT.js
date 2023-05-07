Module.register("MMM-DHT", {
	defaults: {
	    tempUnit: "F",
    	freq: 60000,
    	highRH: 60,
    	lowRH: 50,
    	highColor: "red",
    	lowColor: "red",
    	midColor: "green",
	},

	start: function() {
   		this.sendSocketNotification("get_dht");
  	},

  	getDom: function() {
		var e = document.createElement("div")
   		e.id = "pi_dht"
		return e
	},

 	 notificationReceived: function(notification, payload, sender) {
	 	switch(notification) {
      			case "DOM_OBJECTS_CREATED":
        		var timer = setInterval(()=>{
				this.sendSocketNotification("get_dht")
        		}, this.config.freq)
        		break
    		}
	},

  	socketNotificationReceived: function(notification, payload) {
		switch (notification) {
			case "dht":
			    var humidity = payload;
			    // var temp = '70'
				var e = document.getElementById("pi_dht");
				if (parseFloat(humidity) <= this.config.lowRH) {
					e.style.color = this.config.lowColor;
				} else if (parseFloat(humidity) >= this.config.highRH) {
					e.style.color = this.config.highColor;
				} else {
					e.style.color = this.config.midColor;
				}
                /*
				if (this.config.tempUnit === "C") {
					temp = temp.toString() + "°C";
				} else {
					temp = (temp * (9/5) + 32).toFixed(1).toString() + "°F";
				}
				*/
				e.innerHTML =  humidity + "% RH";
				break;
		}
  	},
})