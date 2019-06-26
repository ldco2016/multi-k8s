docker build -t ldco2016/multi-client:latest -t ldco2016/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t ldco2016/multi-server:latest -t ldco2016/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t ldco2016/multi-worker:latest -t ldco2016/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push ldco2016/multi-client:latest
docker push ldco2016/multi-server:latest
docker push ldco2016/multi-worker:latest

docker push ldco2016/multi-client:$SHA
docker push ldco2016/multi-server:$SHA
docker push ldco2016/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=ldco2016/multi-server:$SHA
kubectl set image deployments/client-deployment client=ldco2016/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=ldco2016/multi-worker:$SHA