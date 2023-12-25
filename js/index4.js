/*Added sweet alert for register to upload*/

const auth = firebase.auth();

window.onload = function () {
  document.getElementById('fileButton').addEventListener('change', (e) => {
    const promises = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let imagefile = files[i];
      let storageRef = firebase.storage().ref("Semester5/" + imagefile.name);
      let task = storageRef.put(imagefile);

      let uploadPromise = new Promise((resolve, reject) => {
        task.on('state_changed', 
          function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log("Upload is " + percentage + "% done");

            let progressBar = document.querySelector('#uploadProgress progress');
            let progressText = document.querySelector('#progressText');

            progressBar.value = percentage;
            progressText.textContent = percentage.toFixed(2) + '%';
          },
          function error(err) {
            reject(err);
          },
          function complete() {
            resolve();
          }
        );
      });

      promises.push(uploadPromise);
    }

    const user = auth.currentUser;
    if (!user) {
      /*window.location.href = 'signup-signin.html'; // Redirect to sign-in page if user is not authenticated
      return;*/
      Swal.fire({
        title: 'Register to Upload Files',
        text: 'You need to register before uploading files.',
        icon: 'info',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = 'signup-signin.html'; // Redirect to sign-in page after user acknowledgment
      });
      return;
    }

    Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          Swal.fire({
            title: 'All Uploads Complete!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            location.reload();
          });
        }, 500);
      })
      .catch((error) => {
        console.error('Error uploading:', error);
        // Handle errors if necessary
      });
  });
};
  