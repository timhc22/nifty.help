import React from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link,
} from 'react-router-dom';
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {formatEther} from "@ethersproject/units";
import {Web3Provider} from "@ethersproject/providers";
import {useEagerConnect, useInactiveListener} from "./hooks";
import {injected, walletconnect} from "./connectors";
import {Spinner} from './components/Spinner';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {UserRejectedRequestError as UserRejectedRequestErrorWalletConnect} from "@web3-react/walletconnect-connector";


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
    <>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? '-'
          : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ''}
      </span>
    </>
  )
}

function Balance() {
  const {account, library, chainId} = useWeb3React()
  const [balance, setBalance] = React.useState(0)
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(0)
          }
        })

      return () => {
        stale = true
        setBalance(0) // this was undefined
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>{balance === null ? 'Error' : balance ? `Ξ${formatEther(balance)}` : ''}</span>
    </>
  )
}


function App() {
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
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link to="/" className="logo">
                Nifty
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Account/>
        <Balance/>


        <>
          <div
            style={{
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
                  marginTop: '2rem',
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
            {/*{!!(library && account) && (*/}
            {/*  <button*/}
            {/*    style={{*/}
            {/*      height: '3rem',*/}
            {/*      borderRadius: '1rem',*/}
            {/*      cursor: 'pointer'*/}
            {/*    }}*/}
            {/*    onClick={() => {*/}
            {/*      library*/}
            {/*        .getSigner(account)*/}
            {/*        .signMessage('👋')*/}
            {/*        .then((signature: any) => {*/}
            {/*          window.alert(`Success!\n\n${signature}`)*/}
            {/*        })*/}
            {/*        .catch((error: any) => {*/}
            {/*          window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))*/}
            {/*        })*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Sign Message*/}
            {/*  </button>*/}
            {/*)}*/}
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


        <Switch>
          <Route exact path="/" component={DashboardPage}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
