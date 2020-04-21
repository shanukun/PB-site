#!/bin/bash
./backend/backend & pids=$!
cd ./frontend
serve -s build & pids+=" $!"

trap "kill $pids" SIGTERM SIGINT
wait $pids
