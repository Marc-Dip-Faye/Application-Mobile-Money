<?php
    $wallets = [];
    $transactions = [
        ['montant'=> 0,'indexClient'=>0],
        ['montant'=> 0,'indexClient'=>0]
    ];
    
    function afficherMenu(){
        echo "1. Créer Wallet \n";
        echo "2. Faire Dépôt \n";
        echo "3. Faire Retrait \n";
        echo "4. Lister les Transactions \n";
        echo "0. Quitter \n";
    }
    afficherMenu();

    function choixMenu(){
        $choix = readline("Faire un choix : ");
        switch ($choix) {
            case 1:
                $newWallet = saisirWallet();
                creerWallet($newWallet);
                break;
            
            default:
                # code...
                break;
        }
    }
    choixMenu();



    function saisirWallet():array{
        $wallet = [];
        $wallet['client'] = readline("Saisir votre nom : ");
        $wallet['telephone'] = readline("Saisir votre numéro de téléphone : ");
        $wallet['code'] = readline("Saisir votre code : ");
        $wallet['solde'] = readline("Saisir votre solde : ");
        return $wallet;
    }
    // $newWallet = saisirWallet();

    function creerWallet(array $newWallet): void{
        global $wallets;
        $wallets[] = $newWallet;
    }
    // creerWallet($newWallet);

    function afficherWallet(array $wallets){
        for ($index=0; $index < count($wallets); $index++) { 
            echo "Titulaire " .$wallets[$index]['client']."\n";
            echo "Téléphone " .$wallets[$index]['telephone']."\n";
            echo "code " .$wallets[$index]['code']."\n";
            echo "solde " .$wallets[$index]['solde']."\n";
        }
    }
    // afficherWallet($wallets);

    function afficherTransaction(array $transactions, array $wallets){
        foreach ($transactions as $index => $transaction) {
            echo "Montant : {$transaction["montant"]}\n";
            $indexClient = $transaction['indexClient'];
            $client = $wallets[$indexClient];
            echo "Titulaire : {$client['client']}\n";
        }
    }
    // afficherTransaction($transactions, $wallets);
?>