import MetaMaskOnboarding from'@metamask/onboarding'

const forwarderOrigin = 'https://fwd.metamask.io';

if( typeof window !== "undefined"){
  const onboardButton = document.getElementById('connectButton');
}

const initialize = () => {

// Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed 
  const { ethereum } = window; 
  return Boolean(ethereum && ethereum.isMetaMask);
};

  // create a new metamask onboarding object in order to us in this app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  // this will start the onboarding process 
  const onClickInstall = () => {
      onboardButton.innerText = 'Onboarding in progress'
      onboardButton.disabled = true
      onboarding.startOnboarding()
  }
  
  //promise ('제작 코드'와 '소비 코드'를 연결해주는 특별한 자바스크립트 객체 -> '구독 리스트') // producing code(제작코드) //  consuming code(소비코드)
  //async -> always return Promise.resolve()
  //async -> 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸서 반환한다.
  //await -> async 함수 안에서만 동작함. -> 프라미스가 처리 될 때까지 함수 실행을 기다리게 만든다. // 일반 함수에서는 사용이 불가능 
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts'})
    } catch (error) {
      console.error(error)
    }
  }

  // 메타마스크가 설치 되어 있지 않으면 -> 'Click here to install MetaMask!'
  // 메타마스크가 설치 되어 있으면 ->  'Connect'
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

  //MetaMaskClientCheck 함수 실행 
  MetaMaskClientCheck();
}

//window객체 -> 클라이언트 측 자바 스크립트 프로그램의 전역 객체 
// - 프로퍼티
// - 메서드
// - 이벤트 핸들러  -> onBlur, onDragDrop, onError, onLoad, onMove, onResize, onUnload
// window.open() 메서드 
//1.타이머 -> setTimeout(), setInterval()

if( typeof window !== "undefined"){
  window.addEventListener('DOMContentLoaded', initialize)
}