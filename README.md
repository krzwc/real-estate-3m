# 3M Real Estate App data webscraper
This script collects data for the 3M Real Estate App available at [https://github.com/krzykaczu/real-estate-3m-client](https://github.com/krzykaczu/real-estate-3m-client)<br>
Data access is provided by the JSON server app.<br>
Fully-featured demo of the server available at [http://bit.ly/3MRealEstateDataServer](http://bit.ly/3MRealEstateDataServer).<br>
Fully-featured demo of the client app available at [http://bit.ly/3MRealEstateApp](http://bit.ly/3MRealEstateApp).

### Usage of the script
```
git clone https://github.com/krzykaczu/real-estate-3m-webscraper.git
cd  real-estate-3m-webscraper
```
To check if python3 is installed locally:
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

The script generates `scrap3m.json` file which should be copied in order to launch the local instance of the JSON server.<br>
**Note:**<br>
The script saves data from only 20 instead of all webscraped ads.<br>
In order to change that change:
```python
# scrap3m.py
    for i in range(2):
        print(i)
        soup_page = fetch_url(url_base + str(i))
        allAddArr['data'] += scrap3m(soup_page)
        time.sleep(5)
```
into:
```python
# scrap3m.py
    for i in range(total):
        print(i)
        soup_page = fetch_url(url_base + str(i))
        allAddArr['data'] += scrap3m(soup_page)
        time.sleep(5)
```
But please be sure to follow other instructions of the client app installation in case of the change.
