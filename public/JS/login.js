$("#signup").click(function() {
  $("#first").fadeOut("fast", function() {
  $("#second").fadeIn("fast");
  });
  });
  
  $("#signin").click(function() {
  $("#second").fadeOut("fast", function() {
  $("#first").fadeIn("fast");
  });
  });
  
  
    
           $(function() {
             $("form[name='login']").validate({
               rules: {
                 
                 email: {
                   required: true,
                   email: true
                 },
                 password: {
                   required: true,
                   
                 }
               },
                messages: {
                 email: "Please enter a valid email address",
                
                 password: {
                   required: "Please enter password",
                  
                 }
                 
               },
               submitHandler: function(form) {
                 form.submit();
               }
             });
           });
           
  
  
  $(function() {
    
    $("form[name='registration']").validate({
      rules: {
        firstname: "required",
        lastname: "required",
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      
      messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        email: "Please enter a valid email address"
      },
    
      submitHandler: function(form) {
        form.submit();
      }
    });
  });
  
  $(document).ready(function() {
  // LOGIN
  $('#first form').on('submit', function(e) {
    e.preventDefault();
    const email = $('#first #email').val();
    const password = $('#first #password').val();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function(response) {
        window.location.href = 'interest.html';
      },
      error: function(xhr) {
        alert('Login failed: ' + (xhr.responseJSON?.error || 'Unknown error'));
      }
    });
  });

  // SIGNUP
  $('#second form').on('submit', function(e) {
    e.preventDefault();
    const firstName = $('#second #firstname').val();
    const lastName = $('#second #lastname').val();
    const email = $('#second #email').val();
    const password = $('#second #password').val();
    const cpassword = $('#second #Cpassword').val();
    if(password !== cpassword) {
      alert('Passwords do not match');
      return;
    }
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ firstName, lastName, email, password }),
      success: function(response) {
        alert('Signup successful! Please login.');
        $('#signin').click(); // Switch to login form
      },
      error: function(xhr) {
        alert('Signup failed: ' + (xhr.responseJSON?.error || 'Unknown error'));
      }
    });
  });
});
  var Fname1;
function Name(name1,name2) {
  this.Firstname=name1;
  this.Lastname=name2;
}
Name.prototype.fullname= function(){
  return this.Firstname + " " + this.Lastname;
}
$(document).ready(function(){
  $("#signInn").click(function(event){
    event.preventDefault();
    var Fname=$("input#firstname").val();
    var Lname=$("input#lastname").val();
    var mail=$("input#email").val();
    var Pass=$("input#password").val();
    var Cpass=$("input#Cpassword").val();
    var newperson = new Name (Fname,Lname);
    window.location.href="interest.html"
    Fname1 = newperson.fullname();
    $("#namess").append(Fname1);
    $("#sasasa").append(Fname1);
  });
});