package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
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

type AdDataNodes struct {
	Data []AdData `json:"data"`
}

func get(w http.ResponseWriter, r *http.Request) {
	filename := "./assets/scrap3m.json"
	file, _ := ioutil.ReadFile(filename)
	data := AdDataNodes{}
	_ = json.Unmarshal([]byte(file), &data)
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
