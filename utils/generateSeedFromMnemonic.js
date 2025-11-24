"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bip39_1 = require("bip39");
var phrase = "begin rib biology depend common spray apple inject energy carry manage fringe";
var seed = (0, bip39_1.mnemonicToSeedSync)(phrase);
console.log(seed.toString("hex"));
