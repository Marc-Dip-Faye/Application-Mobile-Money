<?php

function verificationTailleNumero(array $newWallet): bool {
    $numero = $newWallet["telephone"];
    $code   = $newWallet["code"];
    return strlen($numero) == 9 && strlen($code) == 4;
}

function debutNumero(array $newWallet): bool {
    $prefixValide = ['70', '75', '76', '77', '78'];
    $prefix = substr($newWallet['telephone'], 0, 2);

    for ($i = 0; $i < count($prefixValide); $i++) {
        if ($prefixValide[$i] === $prefix) {
            return true;
        }
    }
    return false;
}

function montantValide(int $montant): bool {
    return $montant > 0;
}

function soldeInitialValide(int $solde): bool {
    return $solde >= 0;
}
?>