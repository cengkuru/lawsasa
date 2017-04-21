<!DOCTYPE html>
<html lang="en" ng-app="gpp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Remove Tap Highlight on Windows Phone IE -->
    <meta name="msapplication-tap-highlight" content="no"/>
    <title ng-bind="'Gpp Admin Interface  ' + title">Lawsasa</title>
    <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' href="assets/css/vendors.min.css" type='text/css' media='all'/>
    <link rel='stylesheet' href="assets/css/style.min.css" type='text/css' media='all'/>
    <?php
    $whitelist = array(
        '127.0.0.1',
        '::1'
    );

    if(in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
        ?>
        <script src="assets/js/vendors.min.js"></script>
        <script src="app/build/js/script.js"></script>
    <?php
    }else{
        ?>
        <script src="app/build/js/masterjs.min.js"></script>
    <?php
    }
    ?>
</head>
<body ng-cloak >
<div ui-view="main_view" ></div>
</body>
</html>
