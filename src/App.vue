<template>
  <div>
    <button @click="connectWallet">Connect Wallet</button>
    <p v-if="account">Connected account: {{ account }}</p>
    <hr>

    <div v-for="transaction in transactions" :key="transaction.id">
      <p>Sender: {{ transaction.tokenIn }}</p>
      <p>Receiver: {{ transaction.tokenOut }}</p>
      <p>Amount: {{ transaction.tokenAmountIn }}</p>
      <p>Timestamp: {{ transaction.timestamp }}</p>
      <hr/>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, watch} from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';


export default {
  setup() {
    const { result } = useQuery(gql`
      {
        swaps(first: 5)  {
          tokenIn
          tokenInSym
          tokenOut
          tokenOutSym
          tx
          timestamp
          tokenAmountIn
          tokenAmountOut
        }
      }
    `);
    const transactions = ref();
    const account = ref('');

    const connectWallet = async () => {
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.requestAccounts();
        account.value = accounts[0];
      } else {
        console.log('Please install MetaMask!');
      }
    };

    watch(result, value => {
      transactions.value = value.swaps
    })

    return {
      transactions,
      account,
      connectWallet,
    };
  },
};
</script>