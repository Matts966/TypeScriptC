#!/bin/bash
EXIT_CODE=0

test() {
  filename="${1%.*}"
  if [[ ! -f $filename.c ]]; then
    return 1
  fi
  compiled=$(mktemp)
  npx ts-node --pretty src/index.ts $1 > $compiled
  answer=$(mktemp)
  cat $filename.c > $answer
  type colordiff > /dev/null 2>&1 && cmd=colordiff || cmd=diff
  diff=$(mktemp)
  $cmd -u $compiled $answer | tee $diff
  if [[ -s $diff ]]; then
    echo $filename: test failed 💀
    EXIT_CODE=1
  else
    echo $filename: test succeeded 😎
  fi
}

if [ -n "$1" ]; then
    test $1; exit 0;
fi

for t in $(ls ./tests/*.ts); do
  test $t
done

exit $EXIT_CODE
