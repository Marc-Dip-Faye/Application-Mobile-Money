<?php

    $wallets = [];
    $transactions = [];

    function trouverWalletIndex(array $wallets, string $telephone): int {
        for ($i = 0; $i < count($wallets); $i++) {
            if ($wallets[$i]['telephone'] === $telephone) {
                return $i;
            }
        }
        return -1;
    }

    function verifiTelephoneExiste(array $wallets, string $telephone): bool {
        for ($i = 0; $i < count($wallets); $i++) {
            if ($wallets[$i]['telephone'] == $telephone) {
                return true;
            }
        }
        return false;
    }

    function verifiCodeExiste(array $wallets, string $code): bool {
        for ($i = 0; $i < count($wallets); $i++) {
            if ($wallets[$i]['code'] == $code) {
                return true;
            }
        }
        return false;
    }
    
?>