docker build -t journal-api .

docker network create journalApp-network

docker rmi journal-api

docker rm journal-app-api

docker tag journal-api shulaa/journal-api:v1

docker push shulaa/journal-api:v1

docker run -p 27017:27017 --name mongodb --network journalApp-network -e MONGO_INITDB_DATABASE="journalDB" -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_ROOT_PASSWORD="password" mongo

docker run -p 8081:8081 --name mongo-express-service --network journalApp-network -e ME_CONFIG_MONGODB_ADMINUSERNAME="admin" -e ME_CONFIG_MONGODB_ADMINPASSWORD="password" -e ME_CONFIG_MONGODB_SERVER="mongodb" mongo-express

docker run -p 5000:5000 --name journal-app-api --network journalApp-network shulaa/journal-api:v2

gcloud container clusters create journal-app1 \
  --scopes "cloud-platform" \
  --num-nodes 1 \
  --issue-client-certificate \
  --enable-ip-alias \
  --zone northamerica-northeast1-a

gcloud container clusters get-credentials journal-app1 \
  --zone northamerica-northeast1-a


  kubectl apply -f journal-api-service.yaml
  kubectl apply -f journal-api-deployment.yaml