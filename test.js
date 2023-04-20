import { Secp256k1HdWallet } from "@cosmjs/amino";
import { StargateClient, SigningStargateClient } from "@cosmjs/stargate";

(async () => {
	const toAddress = "your recipient address here";
	const rpcEndpoint = "your rpc endpoint here";
	const mnemonic = "your mnemonic here";
	const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "cosmos" });
	console.log(wallet);
	const [{ address, pubkey }] = await wallet.getAccounts();
	console.log(address);
	const client = await StargateClient.connect(rpcEndpoint);
	console.log("chain id: ", await client.getChainId());
	const balance = await client.getAllBalances(address);
	console.log("balance: ", balance);

	const signingClient = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

	console.log("sender balance before: ", await client.getAllBalances(address));
	console.log("receipient balance before: ", await client.getAllBalances(toAddress));

	const result = await signingClient.sendTokens(address, toAddress, [{ denom: "denom", amount: "800" }], {
		amount: [{ denom: "denom", amount: "20" }],
		gas: "200000",
	});

	console.log("result: ", result);

	console.log("sender balance after: ", await client.getAllBalances(address));
	console.log("receipient balance after: ", await client.getAllBalances(toAddress));
})();
