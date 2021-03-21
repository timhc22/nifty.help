import {useWeb3React} from "@web3-react/core";
import React from "react";

export default function Account() {
  const {account} = useWeb3React()

  return (
    <div style={{
      marginTop: '0.5rem',
      marginBottom: '0.5rem'
    }}>
      <span>Account:</span>
      <span>
        {account === null
          ? '-'
          : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ''}
      </span>
    </div>
  )
}
