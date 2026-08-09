export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  summary: string;
  content: string;
  tags: string[];
}

export const posts: BlogPost[] = [
  {
    title: "Welcome to my blog",
    slug: "welcome",
    publishedAt: "2026-08-08",
    summary: "What this blog is for, what I'll be writing about, and what you can expect — from deep dives and tutorials to lessons learned in the trenches.",
    content: `Hello, and welcome — this is the very first post on this site.

I've been meaning to start a technical blog for a long time. Not because the world needs another blog, but because writing forces me to think properly. Every time I explain something, I find the gaps in my own understanding.

## What you'll find here

- **Tutorials** — step-by-step guides that assume you're new to the topic, because I was new to it once too. First up: an introduction to blockchain development.
- **Deep dives** — explorations of how things work under the hood, whether it's a framework, a library, or an interesting design decision.
- **Lessons learned** — mistakes, debugging stories, and practical takeaways from real projects.
- **What I'm building** — notes and updates on my current work.

## How I write

My rule is simple: everything here is something I've **actually used or run**, not just read about. Tutorials come with code you can copy and run yourself. If something's opinionated, I'll say it's opinionated and tell you why.

## What's next

Right now I'm writing about blockchain and web3 — from first principles to what it's like to build real dApps. After that, expect posts on whatever problem happens to be in front of me at the time.

If you found anything useful, feel free to reach out — and thanks for reading.`,
    tags: ["Writing", "Portfolio", "Next.js"],
  },

  {
    title: "Blockchain Development for Beginners: A Hands-On Intro",
    slug: "blockchain-development-for-beginners",
    publishedAt: "2026-08-09",
    summary:
      "What a blockchain actually is, why it can't be tampered with, and how to build your first block and smart contract step by step.",
    tags: ["Blockchain", "Web3", "Tutorial", "Solidity"],
    content: `Blockchain is one of those topics that sounds intimidating until you build a tiny one yourself. In this tutorial we'll strip away the hype, understand the core ideas, and write a real blockchain node — then deploy a smart contract on a test network.

## What is a blockchain, really?

A blockchain is just a **linked list of records** where each record (a block) contains a fingerprint of the previous one.

That fingerprint is a **cryptographic hash**: a one-way function that turns any input into a fixed-size string. Change one character of the input and the hash changes completely.

> ⚠️ A hash is the engine of immutability. You can't work backwards from a hash to the original data, but anyone can verify a hash matches its data instantly.

## The four core properties

- **Decentralization** — no single server owns the data; every participant (node) keeps a full copy.
- **Immutability** — because each block references the hash of the previous block, changing any historical block would break every block after it, and the network would reject it.
- **Consensus** — the rules nodes follow to agree on what state is valid (Proof of Work, Proof of Stake, etc.).
- **Trustless verification** — you don't need to trust anyone. You verify.

## Building a block in JavaScript

The best way to understand blockchain is to write one. Here's a minimal block:

\`\`\`javascript
const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.computeHash();
  }

  computeHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash
      )
      .digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), { message: "Genesis block" }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const latest = this.getLatestBlock();
    const block = new Block(
      latest.index + 1,
      Date.now(),
      data,
      latest.hash
    );
    this.chain.push(block);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.computeHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

const coin = new Blockchain();
coin.addBlock({ amount: 4 });
coin.addBlock({ amount: 9 });

console.log(coin.isValid()); // true

// Tamper with history:
coin.chain[1].data = { amount: 999 };
console.log(coin.isValid()); // false — the chain is broken
\`\`\`

Notice what happens when you tamper with \`coin.chain[1].data\`: the hash no longer matches, and every following block's \`previousHash\` breaks. That's immutability made visible. In a real network, the other nodes would simply reject your tampered copy.

## Why "mining" / proof-of-work exists

Anyone can add a block — so how do you stop spam? Bitcoin requires that the block's hash be below a target value (e.g. must start with a certain number of zeros). Because hashes are random, nodes must brute-force a nonce until they hit the target, which costs electricity. Attackers would need more compute than the whole honest network to rewrite history — that's the **51% attack theory**.

Try it: add this to your block class and you've got proof-of-work.

\`\`\`javascript
mine(difficulty) {
  while (!this.hash.startsWith("0".repeat(difficulty))) {
    this.nonce++;
    this.hash = this.computeHash();
  }
}
\`\`\`

Run it with difficulty 4 and watch it take a few hundred thousand attempts. That's why block generation takes time.

## Smart contracts: where "programming the blockchain" happens

Ethereum generalized the record keeping: blocks can also store program code. A **smart contract** is just code deployed on-chain that anyone can call, and no one can stop or change.

The standard language is **Solidity**. The most famous tutorial contract is a token - let's write one:

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyToken {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}
\`\`\`

Key ideas marked here:

- \`msg.sender\` — the wallet calling the function. You can't fake it.
- \`require(...)\` — validation. If it fails, the transaction reverts and nothing happens.
- State changes cost "gas" — every storage write is paid for in ETH, which prevents spam and pays miners/validators.

## Deploy it — for free

- Install a wallet like Metamask.
- Get free test ETH for the **Sepolia** test network from a faucet.
- Open **Remix IDE** (browser-based), paste that contract, compile, and deploy to Sepolia.
- Call \`transfer\` to a friend's address, then look your transaction up on Etherscan Sepolia. You built it end to end.

## What to learn next

- **Languages / tools**: Solidity, Hardhat / Foundry, ethers.js / viem, OpenZeppelin contracts templates
- **Networks**: Ethereum, Polygon, Arbitrum — plus layer-2s for cheap transactions
- **Concepts**: EIP-20 tokens, ERC-721 NFTs, gas optimization, upgradeable contracts
- **Security**: reentrancy, overflow, the famous reentrancy attack, auditing patterns

## Summary

Blockchain isn't magic — it's hash functions, linked data structures, and economic incentives. Once you've built that 30-line node, "advance" and run a smart contract, all the articles about "decentralized applications" (dApps) start making sense. The chain is just data; the magic is in verifying everything yourself instead of trusting anyone.

Go push a block with \`coin.addBlock()\` — and don't forget your \`previousHash\`.
`,
  },
];
