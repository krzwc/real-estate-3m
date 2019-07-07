# 3M Real Estate App server
This package launches the local instance of the JSON server for the 3M Real Estate App.<br>
Full-featured demo of the server available at http://bit.ly/3MRealEstateDataServer.<br>
Full-featured demo of the client app available at http://bit.ly/3MRealEstateApp.

### Usage
A new `scrap3m.json` file may be generated first as described here: [https://github.com/krzykaczu/real-estate-3m-webscraper](https://github.com/krzykaczu/real-estate-3m-webscraper)<br>
`scrap3m.json` file available in the package may also be used (timestamp: 2019-07-06).

A new insctance of the `scrap3m.json` file should replace the old one in the main folder and then:
```
npm run localstart
```
The server should be running on [http://localhost:4000](http://localhost:4000).
