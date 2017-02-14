(function($) {
  $(function () {

    $('.modal').modal({
          dismissible: true
        }
    );

    $(document).on('submit', 'form#sendEmailForm', function (e) {
      e.preventDefault();

      var data = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        to: $('#email').val(),
        cc: $('#emailCC').val(),
        bcc: $('#emailBCC').val(),
        subject: $('#subject').val(),
        message: $('#message').val(),
      };

      $.post('/sendEmail', data, function (status) {
        if(status.error){
          $('#errorModal').modal('open');
          $('.errorDetail').text(status.error);
        } else {
          $('#successfulModal').modal('open');
        }
      })
    });


  });
})(jQuery);