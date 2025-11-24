import { mnemonicToSeedSync } from "bip39";

const phrase = "begin rib biology depend common spray apple inject energy carry manage fringe";
const seed = mnemonicToSeedSync(phrase);
console.log(seed.toString("hex"));
