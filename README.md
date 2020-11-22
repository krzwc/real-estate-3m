# General remark

Unfortunately the project became outdated ever since the data source (https://dom.trojmiasto.pl/) changed the layout and removed location data from ads

# Building

By default the build uses temporary access token for ArcGIS geocoding API.
The token expires on Dec 6 2020 11:09:34AM.
Please obtain your own token at https://developers.arcgis.com/ and add it to `docker-compose.yml` in `backend` service config to make sure the app works as expected.

```
docker-compose up --build
```

The app will be running at `http://0.0.0.0:5000/`

# Rebuilding a single container

```
docker build -t go-backend -f docker/backend/Dockerfile .
docker build -t go-webscraper -f docker/webscraper/Dockerfile .
```

# 2DO

- [ ] envify
- [ ]
