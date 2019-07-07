# 3M Real Estate App data webscraper
This script serves for data collection for the 3M Real Estate App.<br>
Data access is provided by the JSON server app.<br>
Full-featured demo of the server available at [http://bit.ly/3MRealEstateDataServer](http://bit.ly/3MRealEstateDataServer).<br>
Full-featured demo of the client app available at [http://bit.ly/3MRealEstateApp](http://bit.ly/3MRealEstateApp).

### Usage of the script
```
git clone https://github.com/krzykaczu/real-estate-3m-webscraper.git
cd  real-estate-3m-webscraper
```
To check if python3 if installed locally:
```
python3 --version
```
In case it is not:
```
brew install python3
```
Further steps:
```
sudo pip3 install virtualenv
mkdir real-estate-3m-venv && $_
sudo ln -s /Library/Frameworks/Python.framework/Versions/3.7/bin/virtualenv /usr/local/bin/virtualenv
virtualenv venv -p python3
source venv/bin/activate
pip install bs4
python scrap3m.py
deactivate
```

The script generates ```scrap3m.json``` file which should be copied in order to launch the local instance of the JSON server.
