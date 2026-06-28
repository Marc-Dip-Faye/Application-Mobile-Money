<?php

require_once __DIR__ . '/repository.php';
require_once __DIR__ . '/validator.php';
require_once __DIR__ . '/services.php';

    function saisirWallet(): array {
        $wallet = [];
        $wallet['client'] = readline("Saisir votre nom : ");
        $wallet['telephone'] = readline("Saisir votre numéro de téléphone : ");
        $wallet['code'] = readline("Saisir votre code : ");
        $wallet['solde'] = (int) readline("Saisir votre solde : ");
        return $wallet;
    }

    function saisiDepot(): array {
        return [
            "telephone" => readline("Téléphone : "),
            "montant"   => (int) readline("Montant : ")
        ];
    }

    function saisiRetrait(): array {
        return [
            "telephone" => readline("Téléphone : "),
            "montant"   => (int) readline("Montant : ")
        ];
    }

    function creerWallet(array $newWallet, array &$wallets): void {

        if (!verificationTailleNumero($newWallet)) {
            echo "Erreur : taille du numéro invalide \n";
            return;
        }

        if (!debutNumero($newWallet)) {
            echo "Erreur : format numéro invalide \n";
            return;
        }

        if (!soldeInitialValide($newWallet['solde'])) {
            echo "Erreur : le solde initial doit être positif ou nul \n";
            return;
        }

        if (verifiTelephoneExiste($wallets, $newWallet['telephone'])) {
            echo "Erreur : ce numéro de téléphone existe déjà \n";
            return;
        }

        if (verifiCodeExiste($wallets, $newWallet['code'])) {
            echo "Erreur : ce code secret existe déjà \n";
            return;
        }

        $wallets[] = $newWallet;
        echo "Wallet créé avec succès\n";
    }

    function depot(array &$wallets, array $depot): void {
        if (!montantValide($depot['montant'])) {
            echo "Montant invalide\n";
            return;
        }
        $index = trouverWalletIndex($wallets, $depot['telephone']);
        if ($index === -1) {
            echo "Wallet introuvable\n";
            return;
        }
        $wallets[$index]['solde'] += $depot['montant'];
        echo "Dépôt effectué avec succès. Nouveau solde : " . $wallets[$index]['solde'] . "\n";
    }

    function retrait(array &$wallets, array &$transactions, array $retrait): void {
        if (!montantValide($retrait['montant'])) {
            echo "Erreur : le montant doit être positif.\n";
            return;
        }

        $index = trouverWalletIndex($wallets, $retrait['telephone']);
        if ($index === -1) {
            echo "Erreur : aucun wallet associé à ce numéro.\n";
            return;
        }

        $frais = calculerFrais($retrait['montant']);
        $totalDebit = $retrait['montant'] + $frais;

        if ($wallets[$index]['solde'] < $totalDebit) {
            echo "Erreur : solde insuffisant.\n";
            echo "Solde actuel : " . $wallets[$index]['solde'] . " CFA\n";
            echo "Total requis (montant + frais) : " . $totalDebit . " CFA\n";
            return;
        }

        $wallets[$index]['solde'] -= $totalDebit;

        $transactions[] = [
            'type'  => 'retrait',
            'montant'  => $retrait['montant'],
            'frais'  => $frais,
            'indexClient' => $index
        ];

        echo "Retrait effectué avec succès.\n";
        echo "Montant retiré : " . $retrait['montant'] . " CFA\n";
        echo "Frais appliqués : " . $frais . " CFA\n";
        echo "Nouveau solde : " . $wallets[$index]['solde'] . " CFA\n";
    }

    function afficherTransaction(array $transactions, array $wallets) {
        if (empty($transactions)) {
            echo "Aucune transaction enregistrée.\n";
            return;
        }
        foreach ($transactions as $index => $transaction) {
            echo "Transaction n°" . ($index + 1) . "\n";
            echo "Type : " . $transaction["type"] . "\n";
            echo "Montant : " . $transaction["montant"] . "\n";
            if (isset($transaction["frais"])) {
                echo "Frais : " . $transaction["frais"] . "\n";
            }
            $indexClient = $transaction['indexClient'];
            if (isset($wallets[$indexClient])) {
                $client = $wallets[$indexClient];
                echo "Titulaire : " . $client['client'] . "\n";
            }
        }
    }

    function afficherWallet(array $wallets) {
        for ($index = 0; $index < count($wallets); $index++) {
            echo "Titulaire "  . $wallets[$index]['client'] . "\n";
            echo "Téléphone "  . $wallets[$index]['telephone'] . "\n";
            echo "Code "       . $wallets[$index]['code'] . "\n";
            echo "Solde "      . $wallets[$index]['solde'] . "\n";
        }
    }
?>