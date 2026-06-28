<?php

    function calculerFrais(int $montant): int {
        if ($montant <= 10000) {
            return 200;
        } elseif ($montant <= 100000) {
            return 500;
        } else {
            $frais = (int) ($montant * 0.01);
            if ($frais > 5000) {
                $frais = 5000;
            }
            return $frais;
        }
    }
?>