#!/bin/bash
for t in $(ls ./tests/*.ts); do
   filename="${t%.*}"
   if [[ ! -f $filename.c ]]; then
     continue
   fi
   compiled=$(mktemp)
   ts-node index.ts $t > $compiled
   answer=$(mktemp)
   cat $filename.c > $answer
   type colordiff > /dev/null 2>&1 && cmd=colordiff || cmd=diff
   diff=$(mktemp)
   $cmd -u $compiled $answer | tee $diff
   if [[ -s $diff ]]; then
     echo $filename: test failed 💀
   else
     echo $filename: test succeeded 😎
   fi
done

