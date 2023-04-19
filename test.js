import { Secp256k1HdWallet } from "@cosmjs/amino";
import { StargateClient } from "@cosmjs/stargate";

(async () => {
	const rpcEndpoint = "your rpc enpoint here";
	const mnemonic = "your mnemonic here";
	const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "rizon" });
	console.log(wallet);
	const [{ address, pubkey }] = await wallet.getAccounts();
	console.log(address);
	const client = await StargateClient.connect(rpcEndpoint);
	console.log("chain id: ", await client.getChainId());
	const balance = await client.getAllBalances(address);
	console.log("balance: ", balance);
})();
