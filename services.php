<?php

function saisirWallet(): array
{
    return [
        "client" => readline("Nom : "),
        "telephone" => readline("Téléphone : "),
        "code" => readline("Code : "),
        "solde" => (int) readline("Solde : ")
    ];
}

function saisiDepot(): array
{
    return [
        "telephone" => readline("Téléphone : "),
        "montant" => (int) readline("Montant : ")
    ];
}

function saisiRetrait(): array
{
    return [
        "telephone" => readline("Téléphone : "),
        "montant" => (int) readline("Montant : ")
    ];
}

function creerWallet(array &$wallets, array $newWallet): void
{
    if (!verificationTailleNumero($newWallet)) {
        echo "Erreur : numéro ou code invalide\n";
        return;
    }

    if (!debutNumero($newWallet)) {
        echo "Erreur : préfixe invalide\n";
        return;
    }

    if (!soldeInitialValide($newWallet['solde'])) {
        echo "Erreur : solde invalide\n";
        return;
    }

    if (verifiTelephoneExiste($wallets, $newWallet['telephone'])) {
        echo "Erreur : téléphone existe déjà\n";
        return;
    }

    if (verifiCodeExiste($wallets, $newWallet['code'])) {
        echo "Erreur : code existe déjà\n";
        return;
    }

    $wallets[] = $newWallet;

    echo "Wallet créé avec succès\n";
}

function depot(array &$wallets, array $depot): void
{
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

    echo "Dépôt réussi. Nouveau solde : " . $wallets[$index]['solde'] . "\n";
}