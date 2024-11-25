import { Injectable } from '@nestjs/common';
import * as process from "node:process";
import {Address, createPublicClient, createWalletClient, parseEther} from "viem";
import {account, config} from "../config";
import * as tokenJson from "./assets/MyToken.json";

@Injectable()
export class AppService {
  publicClient;
  deployer;

  constructor() {
    this.publicClient = createPublicClient(config);
    this.deployer = createWalletClient({...config, account});
  }

  getTokenAddress(): string {
    return process.env.TOKEN_C_ADDRESS;
  }

  async mintToken(userAddress: Address, value: string) {
    const contractAddress = process.env.TOKEN_C_ADDRESS as Address;
    if (!contractAddress) throw new Error('Token address is required');

    const hash = await this.deployer.writeContract({
      address: contractAddress,
      abi: tokenJson.abi,
      functionName: "mint",
      args: [userAddress, value],
    })
    await this.publicClient.waitForTransactionReceipt({ hash });
  }
}
