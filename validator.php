<?php

function verificationTailleNumero(array $newWallet): bool
{
    return strlen($newWallet["telephone"]) == 9
        && strlen($newWallet["code"]) == 4;
}

function debutNumero(array $newWallet): bool
{
    $prefixValide = ['70', '75', '76', '77', '78'];

    return in_array(
        substr($newWallet['telephone'], 0, 2),
        $prefixValide
    );
}

function montantValide(int $montant): bool
{
    return $montant > 0;
}

function soldeInitialValide(int $solde): bool
{
    return $solde >= 0;
}