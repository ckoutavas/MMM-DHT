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
		var e = document.createElement("div");
		var t = document.createElement("div");
   		e.id = "pi_hum";
   		t.id = "pi_temp"
		return e, t
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
			    const arr = payload.split("-")
			    humidity = arr[0]
			    temp = arr[1]
				var e = document.getElementById("pi_hum");
				if (parseFloat(humidity) <= this.config.lowRH) {
					e.style.color = this.config.lowColor;
				} else if (parseFloat(humidity) >= this.config.highRH) {
					e.style.color = this.config.highColor;
				} else {
					e.style.color = this.config.midColor;
				}
				e.innerHTML =  humidity + "%";

				var t = document.getElementById("pi_temp");
				if (this.config.tempUnit === "C") {
					temp = temp.toString() + "°C";
				} else {
					temp = (temp * (9/5) + 32).toFixed(1).toString() + "°F";
				}
				t.innerHTML = temp
				break;
		}
  	},
})