const auth = firebase.auth();

window.onload = function () {
  document.getElementById('fileButton').addEventListener('change', (e) => {
    const user = auth.currentUser;
    if (!user) {
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

    const promises = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let imagefile = files[i];
      let storageRef = firebase.storage().ref("Semester1/" + imagefile.name);
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

    Promise.all(promises)
      .then(() => {
        const userRef = firebase.database().ref(`users/${user.uid}`);
        userRef.child('uploadCount').get().then((snapshot) => {
          const currentCount = snapshot.val() || 0; // Default to 0 if no uploads exist
          userRef.update({ uploadCount: currentCount + files.length }); // Increment by the number of files uploaded
        });
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
      });
  });
};
  