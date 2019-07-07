# 3M Real Estate App client

Full-featured client app demo available at [http://bit.ly/3MRealEstateApp](http://bit.ly/3MRealEstateApp).<br>
Full-featured REST API server demo available at [http://bit.ly/3MRealEstateApp](http://bit.ly/3MRealEstateApp).

### Use of the app
1. Follow the instructions of the webscraper script [https://github.com/krzykaczu/real-estate-3m-webscraper](https://github.com/krzykaczu/real-estate-3m-webscraper)<br>
2. Follow the instructions of the server app [https://github.com/krzykaczu/real-estate-3m-server](https://github.com/krzykaczu/real-estate-3m-server)<br>
3. Proceed with the following:<br>
Uncomment:
```javascript
// src/utils/endpoint.js
const endpoint = "http://localhost:4000/data";
```
and comment:
```javascript
// src/utils/endpoint.js
// const endpoint = "https://real-estate-3m-server.herokuapp.com/data";
```
**Notice:**<br>
The app renders only 20 markers instead of all webscraped data.<br>
To change that please provide your own Google API Key
```html
// index.html
<script 
  async 
  defer 
  src="https://maps.googleapis.com/maps/api/js?key=Your_Google_API_Key&callback=mapsCallback" type="text/javascript">
</script>
```
To run the app locally: `npm run start`

