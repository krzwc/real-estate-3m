package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
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
	Lon   float64 `json:"lon"`
	Lat	  float64 `json:"lat"`
}

type AdDataNodes struct {
	Data []AdData `json:"data"`
}

type SingleAttr struct {
	ObjectID   string `json:"OBJECTID"`
	SingleLine string `json:"SingleLine"`
}

type Attributes struct {
	Attributes SingleAttr `json:"attributes"`
}

type Records struct {
	Records []Attributes `json:"records"`
}

type Coordinates struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type Location struct {
	Location Coordinates `json:"location"`
}

type ResponseBody struct {
	Locations []Location `json:"locations"`
}

func get(w http.ResponseWriter, r *http.Request) {
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
	data := AdDataNodes{}
	err = collection.FindOne(context.TODO(), bson.D{}).Decode(&data)
	if err != nil {
		log.Fatal(err)
	}

	/*//read from json file
	filename := "./assets/scrap3m.json"
	file, _ := ioutil.ReadFile(filename)
	data := AdDataNodes{}
	_ = json.Unmarshal([]byte(file), &data)
	*/

	token := "EfpuXlCvYMNSZ1Vbn5EZB9jfbNbqvvDqToqfqnq7w6Xlys3gKZV8aE8ixOU2S1NEFsA7aXqZEJO8uaGD66s6RsWeY6WX75WJaobU5WUOfgpc-qFDo-7ntHiX7b03UejUnAiw8ZDjLUNn9H2kcZtSZ73bwVAxtIv1VQc52Nz3CDEMHuJiFGV54pt8aElrxzGXfqw3LAKG0RpAQCBIRBmZ96G5kYr52VA5Dv55sqEcu98."
	var records Records
	for i, v := range data.Data {
		singleAttr := SingleAttr{
			ObjectID: strconv.Itoa(i + 1),
			SingleLine: v.Loc,
		}
		attr := Attributes{singleAttr}
		records.Records = append(records.Records, attr)
	}
	marshaledRecords, err := json.Marshal(records)
	if err != nil {
			log.Fatal(err)
			return
		}
 	encodedRecords := url.QueryEscape(string(marshaledRecords))
	URL := "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?addresses=" + encodedRecords + "&f=pjson&token=" + token

	resp, err := http.Get(URL)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		bodyBytes, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}

		var bodyData ResponseBody
		_ = json.Unmarshal([]byte(bodyBytes), &bodyData)

		//fmt.Println(bodyData)
		for i := range data.Data {
			data.Data[i].Lon = bodyData.Locations[i].Location.X
			data.Data[i].Lat = bodyData.Locations[i].Location.Y
		}
		//fmt.Println(data.Data)
	}

	b, err := json.Marshal(data.Data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "error marshalling data"}`))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"message": "not found"}`))
}

func main() {
	//file, err := os.Open(filename)
	//if err != nil {
	//	log.Fatalln(err)
	//}
	//defer file.Close()


	//file, _ := ioutil.ReadFile(filename)
	//data := AdDataNodes{}
	//_ = json.Unmarshal([]byte(file), &data)
	//fmt.Println(data)

	r := mux.NewRouter()
	r.HandleFunc("/data", get).Methods(http.MethodGet)
	r.HandleFunc("", notFound)
	log.Fatal(http.ListenAndServe(":8080", r))
	fmt.Println("Backend listening on port 8080")
}
