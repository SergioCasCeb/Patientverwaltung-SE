var user = 'user1';
var pass = '1234';

    // Get value on button click and show alert
    function login(){
        var logPass = $('input[name=log-pass]').val();
        var logUser = $('input[name=log-user]').val();

        if(logPass == pass && logUser == user){
              
        }
        else{
            alert('Please enter a valid username and password');
            return false; 
        }
        
    }


