#!/bin/bash
for t in $(ls ./tests/*.ts); do
   filename="${t%.*}"
   if [[ $(ls $filename.c) = "" ]]; then
     continue
   fi
   if [[ $(ts-node index.ts $t) = $(cat $filename.c) ]]; then
     echo $filename: test succeeded 😎
   elif
     echo $filename: test failed 💀
   fi
done
