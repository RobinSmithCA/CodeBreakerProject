let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess()
{
   let input = document.getElementById('user-guess');
   //add functionality to guess function here

   if ( answer.value == '' || attempt.value == '' )
   {
      setHiddenFields();
   }

   if ( validateInput( input.value ) )
   {
      let result = getResults( input.value );

      if ( result )
      {
         setMessage( 'You Win! :)' );
         showReplay();
      }
      else if ( attempt.value >= 10 )
      {
         setMessage( 'You Lose! :(' );
         showReplay();
      }
      else
      {
         setMessage( 'Incorrect, try again.' );
      }

      showAnswer( result );

      attempt.value++;
   }
   else
   {
      return false;
   }
}

//implement new functions here
function setHiddenFields()
{
   answer.value = Math.floor( Math.random() * 9999 ).toString();
   while( answer.value.length < 4 )
   {
      answer.value = '0' + answer.value;
   }

   attempt.value = 0;
}

function setMessage( msg )
{
   document.getElementById('message').innerHTML = msg;
}

function validateInput( val )
{
   if ( val.length == 4 )
   {
      return true;
   }
   else
   {
      setMessage( 'Guesses must be exactly 4 characters long.' );
      return false;
   }
}

function getResults( input )
{
   let str = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
   let count = 0;

   for ( i = 0; i < 4; i++ )
   {
      if ( answer.value[ i ] == input[ i ] )
      {
         str += "<span class='glyphicon glyphicon-ok'></span>"
         count++;
      }
      else if ( answer.value.indexOf( input[i] ) >= 0 )
      {
         str += "<span class='glyphicon glyphicon-transfer'></span>"
      }
      else
      {
         str += "<span class='glyphicon glyphicon-remove'></span>"
      }
   }

   str += '</div></div>';

   document.getElementById('results').innerHTML += str;

   if ( count == 4 )
   {
      return true;
   }
   else
   {
      return false;
   }
}

function showAnswer( success )
{
let code = document.getElementById('code');

   if ( success )
   {
      code.innerHTML = answer.value;
      code.className += ' success';
   }
   else
   {
      code.className += ' failure';
   }
}

function showReplay()
{
   document.getElementById('guessing-div').style = 'display:none';
   document.getElementById('replay-div').style = 'display:block';
}
