<?php
    $wallets = [];
    $transactions = [];

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
                echo "Choix invalide\n";
                break;
        }
    } while ($choix != 0);


    function afficherMenu(): int {
        echo "1. Créer Wallet \n";
        echo "2. Faire Dépôt \n";
        echo "3. Faire Retrait \n";
        echo "4. Lister les Transactions \n";
        echo "0. Quitter \n";

        $choix = (int) readline("Faire un choix : ");
        return $choix;
    }


    function saisirWallet(): array {
        $wallet = [];
        $wallet['client'] = readline("Saisir votre nom : ");
        $wallet['telephone'] = readline("Saisir votre numéro de téléphone : ");
        $wallet['code'] = readline("Saisir votre code : ");
        $wallet['solde'] = (int) readline("Saisir votre solde : ");
        return $wallet;
    }


    function creerWallet(array &$newWallet, array &$wallets): void {

        if (!verificationTailleNumero($newWallet)) {
            echo "Erreur : taille du numéro invalide \n";
            return;
        }

        if (!debutNumero($newWallet)) {
            echo "Erreur : format numéro invalide \n";
            return;
        }

        $wallets[] = $newWallet;
        echo "Wallet créé avec succès\n";
    }


    function afficherWallet(array $wallets) {
        for ($index = 0; $index < count($wallets); $index++) {
            echo "Titulaire "  . $wallets[$index]['client'] . "\n";
            echo "Téléphone "  . $wallets[$index]['telephone'] . "\n";
            echo "Code "       . $wallets[$index]['code'] . "\n";
            echo "Solde "      . $wallets[$index]['solde'] . "\n";
        }
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


    function verificationTailleNumero(array $newWallet): bool {
        $numero = $newWallet["telephone"];
        $code   = $newWallet["code"];
        return strlen($numero) == 9 && strlen($code) == 4;
    }


    function debutNumero(array $newWallet): bool {
        $prefixValide = ['70', '75', '76', '77', '78'];
        return in_array(substr($newWallet['telephone'], 0, 2), $prefixValide);
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


    function verifiTelephoneExiste(array $wallets, string $telephone): bool {
        for ($i = 0; $i < count($wallets); $i++) {
            if ($wallets[$i]['telephone'] == $telephone) {
                return true;
            }
        }
        return false;
    }


    function montantValide(int $montant): bool {
        return $montant > 0;
    }


    function trouverWalletIndex(array $wallets, string $telephone): int {
        for ($i = 0; $i < count($wallets); $i++) {
            if ($wallets[$i]['telephone'] === $telephone) {
                return $i;
            }
        }
        return -1;
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


    function calculerFrais(int $montant): int {
        $frais = (int) ($montant * 0.01);
        if ($frais > 5000) {
            $frais = 5000;
        }
        return $frais;
    }


    function retrait(array &$wallets, array &$transactions, array $retrait): void {
        // RG2 : montant positif
        if (!montantValide($retrait['montant'])) {
            echo "Erreur : le montant doit être positif.\n";
            return;
        }

        // RG1 : wallet existant
        $index = trouverWalletIndex($wallets, $retrait['telephone']);
        if ($index === -1) {
            echo "Erreur : aucun wallet associé à ce numéro.\n";
            return;
        }

        // RG3 : calcul des frais (1% plafonné à 5000)
        $frais = calculerFrais($retrait['montant']);
        $totalDebit = $retrait['montant'] + $frais;

        // RG2 : solde suffisant
        if ($wallets[$index]['solde'] < $totalDebit) {
            echo "Erreur : solde insuffisant.\n";
            echo "Solde actuel : " . $wallets[$index]['solde'] . " CFA\n";
            echo "Total requis (montant + frais) : " . $totalDebit . " CFA\n";
            return;
        }

        // Débit du compte
        $wallets[$index]['solde'] -= $totalDebit;

        // Enregistrement de la transaction
        $transactions[] = [
            'type'        => 'retrait',
            'montant'     => $retrait['montant'],
            'frais'       => $frais,
            'indexClient' => $index
        ];

        echo "Retrait effectué avec succès.\n";
        echo "Montant retiré : " . $retrait['montant'] . " CFA\n";
        echo "Frais appliqués : " . $frais . " CFA\n";
        echo "Nouveau solde : " . $wallets[$index]['solde'] . " CFA\n";
    }
?>