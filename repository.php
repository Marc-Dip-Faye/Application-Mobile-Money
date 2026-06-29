<?php

function trouverWalletIndex(array $wallets, string $telephone): int
{
    $telephones = array_column($wallets, 'telephone');

    $index = array_search($telephone, $telephones);

    return $index === false ? -1 : $index;
}

function verifiTelephoneExiste(array $wallets, string $telephone): bool
{
    return in_array($telephone, array_column($wallets, 'telephone'));
}

function verifiCodeExiste(array $wallets, string $code): bool
{
    return in_array($code, array_column($wallets, 'code'));
}