for( let cnt = 1; cnt < 21; cnt++ ){
  if (cnt % 15 == 0)
    print('FizzBuzz');
  else if( cnt % 5 == 0)
    print('Buzz');
  else if(cnt % 3 == 0)
    print('Fizz');
  else
    print(cnt);
}
