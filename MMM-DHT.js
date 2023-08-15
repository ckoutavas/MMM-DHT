Module.register("MMM-DHT", {
	defaults: {
	    tempUnit: "F",
    	freq: 60000,
    	keep: "both",
    	colorParam: "humidity",
    	highVal: 60,
    	lowVal: 50,
    	highColor: "red",
    	lowColor: "blue",
    	midColor: "green"
	},

	start: function() {
   		this.sendSocketNotification("get_dht");
  	},

  	getDom: function() {
		var div = document.createElement("div")
		div.id = "dht_temp"
		return div
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
			    temperature = arr[0]
			    humidity = arr[1]
                // convert temp based on tempUnit param
			    if (this.config.tempUnit === "C") {
					temp = temperature + "°C";
				} else if (this.config.tempUnit === "F") {
				    temp = (parseFloat(temperature) * (9/5) + 32).toFixed(1).toString() + "°F";
				}
                // get div elm and set the inner html
				var div = document.getElementById("dht_temp");
				if (this.config.keep === "both"){
				    div.innerHTML = temp + " (" + humidity + "%)"
				} else if (this.config.keep === "temperature") {
				    div.innerHTML = temp
				} else if (this.config.keep === "humidity") {
				    div.innerHTML = humidity + "%"
				}
				// set the color based on the color params
				if (this.config.colorParam === "humidity") {
                    if (parseFloat(humidity) <= this.config.lowVal) {
                        div.style.color = this.config.lowColor;
                    } else if (parseFloat(humidity) >= this.config.highVal) {
                        div.style.color = this.config.highColor;
                    } else {
                        div.style.color = this.config.midColor;
                    }
                // now do the same for temp
                } else if (this.config.colorParam === "temperature" && this.config.tempUnit === "C") {
                    if (parseFloat(temperature) <= this.config.lowVal) {
                        div.style.color = this.config.lowColor;
                    } else if (parseFloat(temperature) >= this.config.highVal) {
                        div.style.color = this.config.highColor;
                    } else {
                        div.style.color = this.config.midColor;
                    }
                } else if (this.config.colorParam === "temperature" && this.config.tempUnit === "F") {
                    temp_f = parseFloat(temperature) * (9/5) + 32
                    if (temp_f <= this.config.lowVal) {
                        div.style.color = this.config.lowColor;
                    } else if (temp_f >= this.config.highVal) {
                        div.style.color = this.config.highColor;
                    } else {
                        div.style.color = this.config.midColor;
                    }
                }

				break;
		}
  	},
}
)
