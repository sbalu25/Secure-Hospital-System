package models;

import com.example.security.service.CryptService;

import java.sql.Timestamp;
import java.util.Date;

public class BlockChainNode {



    // Every block contains
    // a hash, previous hash and
    // data of the transaction made
    public String hash;

    private Transactions data1;
    private InsuranceClaim data2;
    private Timestamp timeStamp;

    // Constructor for the block
    public BlockChainNode(Transactions data1, Timestamp timeStamp)
    {
        this.data1 = data1;

        this.timeStamp
                = timeStamp;
        this.hash
                = calculateTransactionHash();
    }
    public BlockChainNode(InsuranceClaim data2, Timestamp timeStamp)
    {
        this.data2 = data2;

        this.timeStamp
                = timeStamp;
        this.hash
                = calculateInsuranceClaimHash();
    }


    // Function to calculate the hash
    public String calculateTransactionHash()
    {
        // Calling the "crypt" class
        // to calculate the hash
        // by using the previous hash,
        // timestamp and the data
        String calculatedhash
                = CryptService.sha256(
                timeStamp.toString()
                        + data1);

        return calculatedhash;
    }
    public String calculateInsuranceClaimHash()
    {
        // Calling the "crypt" class
        // to calculate the hash
        // by using the previous hash,
        // timestamp and the data
        String calculatedhash
                = CryptService.sha256(
                timeStamp.toString()
                        + data2);

        return calculatedhash;
    }

}
