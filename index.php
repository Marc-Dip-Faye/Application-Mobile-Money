<?php
    require_once __DIR__ . '/controller.php';

    function afficherMenu(): int {
        echo "1. Créer Wallet \n";
        echo "2. Faire Dépôt \n";
        echo "3. Faire Retrait \n";
        echo "4. Lister les Transactions \n";
        echo "0. Quitter \n";

        $choix = (int) readline("Faire un choix : ");
        return $choix;
    }

    do {
        $choix = afficherMenu();
        switch ($choix) {
            case 1:
                $newWallet = saisirWallet();
                creerWallet($newWallet, $wallets);
                break;
            case 2:
                $depot = saisiDepot();
                depot($wallets, $depot);
                break;
            case 3:
                $retrait = saisiRetrait();
                retrait($wallets, $transactions, $retrait);
                break;
            case 4:
                afficherTransaction($transactions, $wallets);
                break;
            case 0:
                echo "Au revoir !\n";
                break;
            default:
                echo "Choix invalide, veuillez réessayer\n";
                break;
        }
    } while ($choix != 0);
?>