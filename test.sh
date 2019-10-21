#!/bin/bash
for t in $(ls ./tests/*.ts); do
   filename="${t%.*}"
   if [[ $(ls $filename.c) = "" ]]; then
     continue
   fi
   if [[ $(npx ts-node index.ts $t) = $(cat $filename.c) ]]; then
     echo $filename: test succeeded 😎
   else
     echo $filename: test failed 💀
   fi
done
