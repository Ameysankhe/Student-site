window.onload=function(){
    document.getElementById('fileButton').addEventListener('change', (e) =>{
        for(let i = 0; i<e.target.files.length; i++){
            let imagefile = e.target.files[i];
    
            let storageRef = firebase.storage().ref("Semester6/"+imagefile.name);
            
            let task = storageRef.put(imagefile);
    
            task.on('state_changed',function progress(snapshot) {
                let percentage = snapshot.bytesTransferred/ snapshot.totalBytes * 100;
    
                console.log("Upload is "+ percentage + "%done");
                switch(snapshot.state){
                    case firebase.storage.TaskState.PAUSED :
                        console.log("Upload is Paused");
                        break;
                    
                }
            })
        }
    })
  }

