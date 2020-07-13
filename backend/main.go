package main

import (
	"context"
	"encoding/json"
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

	client, err := mongo.Connect(context.TODO(), clientOptions);
	if err != nil {
		log.Fatal(err)
	}

	if err = client.Ping(context.TODO(), nil); err != nil {
		log.Fatal(err)
	}

	collection := client.Database("real-estate-3m").Collection("ads")
	data := AdDataNodes{}
	if err = collection.FindOne(context.TODO(), bson.D{}).Decode(&data); err != nil {
		log.Fatal(err)
	}

	/*//read from json file
	filename := "./assets/scrap3m.json"
	file, _ := ioutil.ReadFile(filename)
	data := AdDataNodes{}
	_ = json.Unmarshal([]byte(file), &data)
	*/

	token := "TvVghSLqm_f7a8VBDYBu23JPfDq80QR29lY3twWuylt-IqGNzqE_lOd9AsRIubMrMvV1xZxR_LwslwK_9iO0_FZKesyOfRTtZm3k5-epbGCVN2bXhjH7HLna37lMsqa3nGdg3az2oXkiFnOJRkKa45Rq4NykTdqk0Weag8l1rV29q6nfgz3kJunrK0P9Ndw-yU39Rvz_2JkARSh3YsE9jarolWehGQ375PMmCeOkiYY."
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

	var resp *http.Response
	if resp, err = http.Get(URL); err != nil {
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
}
