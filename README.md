# 3M Real Estate App server
This package launches the local instance of the JSON server for the 3M Real Estate App.<br>
Full-featured demo of the server available at http://bit.ly/3MRealEstateDataServer.<br>
Full-featured demo of the client app available at http://bit.ly/3MRealEstateApp.

### Usage
A ```scrap3m.json``` file should be generated first as described here: [https://github.com/krzykaczu/real-estate-3m-webscraper](https://github.com/krzykaczu/real-estate-3m-webscraper)
A locally served instance of the ```scrap3m.json``` file may also be used (timestamp: 2019-07-06).

```
git clone https://github.com/krzykaczu/real-estate-3m-server.git
cd real-estate-3m-server
```
```scrap3m.json``` should be copied to the folder and then:
```
json-server scrap3m.json
```
The server should be running at localhost on port 4000.
