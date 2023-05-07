import board
import time
import adafruit_dht


def get_data():
    dhtDevice = adafruit_dht.DHT22(board.D4, use_pulseio=False)
    try:
        # temperature_c = dhtDevice.temperature
        # temperature_f = temperature_c * (9/5) + 32
        humidity = round(dhtDevice.humidity, 1)
        print(humidity)
    except RuntimeError:
        time.sleep(2)
        get_data()


get_data()
