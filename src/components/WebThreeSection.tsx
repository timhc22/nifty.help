import React from "react";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useEagerConnect, useInactiveListener} from "../hooks";
import {injected, walletconnect} from "../connectors";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {UserRejectedRequestError as UserRejectedRequestErrorWalletConnect} from "@web3-react/walletconnect-connector";
import {Spinner} from './Spinner';

enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
    // error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function Account() {
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

export default function WebThreeSection() {
  const context = useWeb3React<Web3Provider>()
  const {connector, activate, deactivate, active, error} = context // library and account are needed for sign and deactivate

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)


  return (
    <>
      <Account/>
      <div
        style={{
          marginTop: '1rem',
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '20rem',
          margin: 'auto'
        }}
      >
        {Object.keys(connectorsByName).map(name => {
          // @ts-ignore
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !triedEager || !!activatingConnector || connected || !!error

          return (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative'
              }}
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                // @ts-ignore
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {activating && <Spinner color={'black'} style={{height: '25%', marginLeft: '-1rem'}}/>}
                {connected && (
                  <span role="img" aria-label="check">
            ✅
          </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {(active || error) && (
          <button
            style={{
              height: '3rem',
              marginTop: '0.5rem',
              borderRadius: '1rem',
              borderColor: 'red',
              cursor: 'pointer'
            }}
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate
          </button>
        )}

        {!!error && <h4 style={{marginTop: '1rem', marginBottom: '0'}}>{getErrorMessage(error)}</h4>}
      </div>

      <hr style={{margin: '2rem'}}/>

      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: 'fit-content',
          maxWidth: '20rem',
          margin: 'auto'
        }}
      >
        {/*{connector === connectorsByName[ConnectorNames.WalletConnect] && (*/}
        {/*  <button*/}
        {/*    style={{*/}
        {/*      height: '3rem',*/}
        {/*      borderRadius: '1rem',*/}
        {/*      cursor: 'pointer'*/}
        {/*    }}*/}
        {/*    onClick={() => {*/}
        {/*      ;(connector as any).close()*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Kill WalletConnect Session*/}
        {/*  </button>*/}
        {/*)}*/}
      </div>
    </>
  )
}
