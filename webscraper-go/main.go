package main

import (
	"context"
	"fmt"
	"github.com/gocolly/colly/v2"
	"github.com/gocolly/colly/v2/queue"
	/*"io/ioutil"
	"encoding/json"*/
	"log"
	"strconv"
	"strings"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type AdData struct {
	Id    string  `json:"id"`
	Url   string  `json:"url"`
	Loc   string  `json:"loc"`
	Price string  `json:"price"`
	Rooms string  `json:"rooms"`
	M2    string  `json:"m2"`
	Floor string  `json:"floor"`
}

type Data struct {
	Data []AdData `json:"data"`
}

func getTotal(url string) (int, error) {
	var total int
	var error error

	c := colly.NewCollector()
	c.OnHTML(".page-step > a[title=\"ostatnia strona\"]", func(e *colly.HTMLElement) {
		scrapedTotal, err := strconv.Atoi(e.Text)
		total = scrapedTotal
		error = err
	})
	c.Visit(url)

	return total, error
}

func main() {
	URL := "https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/ikl,101,e1i,33_97_83_96_76_2,qi,42_55.html?strona="

	total, err := getTotal(URL)
	if err != nil {
		log.Fatal(err)
	} else {
		c := colly.NewCollector()
		var adData []AdData
		var data Data

		q, _ := queue.New(
			1,
			&queue.InMemoryQueueStorage{MaxSize: 10000},
		)

		c.OnHTML("div.ogl-item", func(e *colly.HTMLElement) {
			var ad AdData
			ad.Id = e.Attr("data-id")
			ad.Url = e.ChildAttr(".img-wrap > a", "href")
			ad.Loc = strings.Join(strings.Fields(e.ChildText(".place")), " ")
			ad.Price = strings.Join(strings.Fields(e.ChildText(".prize")), " ")
			ad.Rooms = e.ChildText(".ogl-params li:nth-child(1)")
			ad.M2 = e.ChildText(".ogl-params li:nth-child(2)")
			ad.Floor = e.ChildText(".ogl-params li:nth-child(3)")
			adData = append(adData, ad)
		})

		total = 1

		for pageIndex := 0; pageIndex <= total; pageIndex++ {
			q.AddURL(URL + fmt.Sprintf("%d", pageIndex))
		}

		q.Run(c)
		data.Data = adData

		/*//save to json file
		PATH := "../backend/assets/scrap3m.json"

		marshaledData, err := json.MarshalIndent(data, "", " ")
		if err != nil {
			log.Fatal(err)
			return
		}
		_ = ioutil.WriteFile(PATH, marshaledData, 0644)*/

		DB_CONNECTION_STRING := os.Getenv("MONGO_CONNECTION_STRING")
		if DB_CONNECTION_STRING == "" {
			DB_CONNECTION_STRING = "mongodb://root:password@localhost:27017/"
		}
		clientOptions := options.Client().ApplyURI(DB_CONNECTION_STRING)
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			log.Fatal(err)
		}
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			log.Fatal(err)
		}

		collection := client.Database("real-estate-3m").Collection("ads")
		_, err = collection.InsertOne(context.TODO(), data)
		if err != nil {
			log.Fatal(err)
		}
	}
}
