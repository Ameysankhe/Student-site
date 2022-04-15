<?php include 'fileslogic.php';?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="download.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <form action="download.php" method="post" enctype="multipart/form-data">
                <h3>Upload Notes</h3>
                <input type="file" name="myfile"><br>
                <button type="submit" name="save">Upload</button>
            </form>


        </div>
    </div>
</body>
</html>