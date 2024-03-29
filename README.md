# MMM-DHT
Uses a DHT22 sensor to read the temperature and humidity, and display one or both on your MagicMirror2. If you are using another sensor you will need to modify the `DHT.py` file 

## DHT22 Wiring
![img.png](img.png)

## Install
```
cd  ~/MagicMirror/modules
git clone https://github.com/ckoutavas/MMM-DHT
cd ./MMM-DHT
sudo pip3 install -r requirements.txt
```

## config

```
{
  module: 'MMM-DHT',
  position: 'top_right',
  config: {}
},
```
## Config Params

| Param      | Type | Default    | Options                             | Description                                                                                    |
|------------|------|------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| tempUnit   | str  | "F"        | ["F", "C"]                          | The temperature unit that you want to return                                                   |
| freq       | int  | 60000      | Any int value                       | The interval at which you want to check the temperature and humidity from the DHT sensor in ms |
| keep       | str  | "both"     | ["both", "temperature", "humidity"] | Specify the values you want to keep from the DHT sensor                                        |
| colorParam | str  | "humidity" | ["humidity", "temperature"]         | Choose the param that you want to use to color the text on screen                              | 
| highVal    | int  | 60         | Any int value                       | If the colorParam is >= highValue then set the highColor                                       |
| lowVal     | int  | 50         | Any int value                       | If the colorParam is <= lowValue then set the lowColor                                         |
| highColor  | str  | "red"      | Any html color name, hex, etc.      | The color used when the colorParam is >= highVal                                               |
| lowColor   | str  | "blue"     | Any html color name, hex, etc.      | The color used when the colorParam is <= lowVal                                                |
| midColor   | str  | "green"    | Any html color name, hex, etc.      | The color used when the highValue < colorParam > lowVal                                        |

## css/custom.css
You can style the temperature string that is returned by updating your `css/custom.css` file

```
#dht_temp {
  font-size: 40px;
}
```
