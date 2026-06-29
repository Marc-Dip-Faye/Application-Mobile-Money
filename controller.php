<?php

function demarrerApplication(array &$wallets, array &$transactions)
{
    do {
        afficherMenu();

        $choix = readline("Choix : ");

        switch ($choix) {

            case 1:
                $wallet = saisirWallet();
                creerWallet($wallets, $wallet);
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
                echo "Au revoir\n";
                break;

            default:
                echo "Choix invalide\n";
        }

    } while ($choix != 0);
}

function afficherMenu()
{
    echo "\n";
    echo "1. Créer Wallet\n";
    echo "2. Dépôt\n";
    echo "3. Retrait\n";
    echo "4. Transactions\n";
    echo "0. Quitter\n";
}