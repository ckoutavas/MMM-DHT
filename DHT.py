import time
from typing import Tuple
import board
import adafruit_dht


def get_data(dht: adafruit_dht) -> Tuple[float, float]:
    try:
        # get the temp and humidity
        # temperature = round(dht.temperature, 1)
        humidity = round(dht.humidity, 1)
        if humidity:
            return humidity
        else:
            get_data(adafruit_dht.DHT22(board.D4, use_pulseio=False))
    except:
        time.sleep(2)
        get_data(adafruit_dht.DHT22(board.D4, use_pulseio=False))


hum = get_data(adafruit_dht.DHT22(board.D4, use_pulseio=False))
print(hum)
