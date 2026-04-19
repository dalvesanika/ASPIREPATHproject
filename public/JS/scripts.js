$(document).ready(function() {
  // Contact form AJAX submission
  $('.contactform .formbox').on('submit', function(e) {
    e.preventDefault();
    const firstName = $(this).find('input').eq(0).val();
    const lastName = $(this).find('input').eq(1).val();
    const email = $(this).find('input[type="email"]').val();
    const mobile = $(this).find('input').eq(3).val();
    const message = $(this).find('textarea').val();
    $.ajax({
      url: '/api/contact',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ firstName, lastName, email, mobile, message }),
      success: function(response) {
        alert('Thank you for contacting us!');
        $('.contactform .formbox')[0].reset();
      },
      error: function() {
        alert('Sorry, there was an error sending your message.');
      }
    });
  });
});
