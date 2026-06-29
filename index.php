<?php

    require_once "validator.php";
    require_once "repository.php";
    require_once "services.php";
    require_once "controller.php";

    $wallets = [];
    $transactions = [];

    demarrerApplication($wallets, $transactions);