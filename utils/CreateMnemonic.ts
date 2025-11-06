import { generateMnemonic } from "bip39";

class Mnemonic {
  phrase: string;
  constructor() {
    this.phrase = Mnemonic.createNewPhrase();
  }

  static createNewPhrase(): string {
    return generateMnemonic();
  }
}

export { Mnemonic };
