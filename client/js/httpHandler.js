(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  // write an ajax get request for a random command
  const ajaxGet = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl, //http://127.0.0.1:3000/
                      //http://127.0.0.1:3000/backgroundImage
      success: (direction) => {
        // trigger swim movement
        console.log('SUCCESS', direction);
        SwimTeam.move(direction);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  setInterval(ajaxGet, 500);

  const ajaxGetImage = () => {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/background.jpg',
      success: (backgroundImage) => {
        console.log('SUCCESSIMAGE', backgroundImage);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  $('#getImage').click(ajaxGetImage);
  // $('#randomSwim').click(ajaxGet);
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'FILL_ME_IN', // ip and port defined in server's index.js
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
