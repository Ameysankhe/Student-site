var storage = firebase.storage();
var storageRef = storage.ref();

$('#List').find('tbody').html('');

  var i = 0;

  storageRef.child('Semester4/').listAll().then(function(result){
      result.items.forEach(function(imageRef){
        //console.log("Image reference" + imageRef.toString());

        i++;
        displayImage( imageRef);
      });
  });

  function displayImage( images){

    images.getDownloadURL().then(function(url){
        console.log(url);

        let new_html = '';
        new_html += '<tr>';
        new_html += '<td>';
        new_html += '<li></li>'
        new_html += '</td>';
        new_html += '<td>';
        new_html += '<h4>'
        new_html += images.name
        new_html += '</h4>';
        new_html += '</td>';
        new_html += '<td>';
        new_html += '<a href='+url+' style="color: black">Download file';
        new_html += '</td>';
        new_html += '</tr>';
        $('#List').find('tbody').append(new_html);
    });
  }