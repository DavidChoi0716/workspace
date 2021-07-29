import MetaMaskOnboarding from '@metamask/onboarding' // import error (2021.07.21)

const forwarderOrigin = 'https://fwd.metamask.io'

const initialize = () => { 
  const onboardButton = document.getElementById('connectButton');
  // Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
  // Have to check the ethereum binding on the window object to see if it's isntalled
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress'
    onboardButton.disabled = true
    onboarding.startOnboarding()
  }
  
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts'})
    } catch (error) {
      console.error(error)
    }
  }

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()){
      onboardButton.innerText = 'Click here to install MetaMask!';
      onboardButton.onclick = onClickInstall
      onboardButton.disabled = false
    } else {
      onboardButton.innerText = 'Connect';
      onboardButton.onclick = onClickConnect
      onboardButton.disabled = false
    }
  };
  MetaMaskClientCheck(); 
}

window.addEventListener('DOMContentLoaded', initialize)