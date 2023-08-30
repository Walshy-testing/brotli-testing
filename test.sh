#!/bin/bash

url="https://pages.brotli.walshy.dev/modification"

if [ "$1" == "worker" ]; then
  url="https://worker.brotli.walshy.dev/"
fi

curl "$url" -s -v -H 'accept-encoding: br' -o output.br 2>&1 | grep -E 'x-metal|x-sliver|x-colo'
./decompress.sh
