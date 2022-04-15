<?php

$conn = mysqli_connect("localhost","root","","file_upload");

if(isset($_POST['save']))
{
    echo "button is clicked";
}