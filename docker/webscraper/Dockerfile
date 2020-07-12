FROM golang:1.14-alpine as build
RUN mkdir /build
COPY ./webscraper-go/go.mod /build
COPY ./webscraper-go/go.sum /build
COPY ./webscraper-go/main.go /build
WORKDIR /build
RUN go build -o main .

FROM alpine
RUN adduser -S -D -H -h /app appuser
USER appuser
COPY --from=build /build/main /app/
WORKDIR /app
CMD ["./main"]
