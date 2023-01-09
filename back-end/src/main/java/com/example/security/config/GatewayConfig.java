package com.example.security.config;
import lombok.extern.slf4j.Slf4j;
import org.hyperledger.fabric.gateway.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.PrivateKey;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;



public class GatewayConfig {




    public Gateway connectGateway() throws IOException, InvalidKeyException, CertificateException {

        Wallet wallet = Wallets.newFileSystemWallet(Paths.get("path"));
        X509Certificate certificate = readX509Certificate(Paths.get("path"));
        PrivateKey privateKey = getPrivateKey(Paths.get("path"));
        wallet.put("path", Identities.newX509Identity("path", certificate, privateKey));


        Gateway.Builder builder = Gateway.createBuilder()
                .identity(wallet, "path")
                .networkConfig(Paths.get("path"));


        return builder.connect();
    }



    public Network network(Gateway gateway) {
        return gateway.getNetwork("path");
    }



    public Contract contract(Network network) {
        return network.getContract("path");
    }

    private static X509Certificate readX509Certificate(final Path certificatePath) throws IOException, CertificateException {
        try (Reader certificateReader = Files.newBufferedReader(certificatePath, StandardCharsets.UTF_8)) {
            return Identities.readX509Certificate(certificateReader);
        }
    }

    private static PrivateKey getPrivateKey(final Path privateKeyPath) throws IOException, InvalidKeyException {
        try (Reader privateKeyReader = Files.newBufferedReader(privateKeyPath, StandardCharsets.UTF_8)) {
            return Identities.readPrivateKey(privateKeyReader);
        }
    }
}
