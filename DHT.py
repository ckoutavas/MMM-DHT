import time
from typing import Tuple
import board
import adafruit_dht


def get_data():
    dht = adafruit_dht.DHT22(board.D4, use_pulseio=False)
    if dht.humidity and dht.humidity not in [None, 'None']:
        humidity = round(dht.humidity, 1)
        print(humidity)
try:
    get_data()
except:
    get_data()

