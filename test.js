import { Secp256k1HdWallet } from "@cosmjs/amino";

(async () => {
	const mnemonic = "your mnemonic here";
	const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "rizon" });
	console.log(wallet);
	const [{ address, pubkey }] = await wallet.getAccounts();
	console.log(address);
})();
