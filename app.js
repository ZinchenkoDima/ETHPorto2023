
const ethereumButton = document.querySelector('.connect-metamask');

// const web3 = new Web3('https://mainnet.infura.io/v3/3a17ed6d5b1f419fbfca7ff8328c0268');
const web3 = new Web3(window.ethereum);


web3.eth.net.isListening()
  .then(() => console.log('Thank you'))
  .catch((err) => console.log('Error:', err));


const accountElem = document.querySelector("#account")
let accounts
let account 

;(async () =>  {
  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  console.log('your address:', account);
  accountElem.innerHTML = account
})()

ethereumButton.addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed!');
  }
 
  if (typeof window.ethereum !== 'undefined') {
    try {
      window.web3 = web3

      // backend should generate a random id and write it to the html, the js should read the value that the server wrote in the html (by reading the value in window.sessionID)
      //crypto.randomUUID()
      //'13600d93-7c77-44c0-b11a-e7f7f1cb8cd4'

      const dataToSignRaw = "AUTH SESSION ID 12312412312"  // should be changed to this value window.sessionID
      const dataToSign = web3.utils.sha3(dataToSignRaw)
      const signedAuthMessage = await web3.eth.sign(dataToSign, account);
      console.log('Autorization in MetaMask:', signedAuthMessage);

      // send signedAuthMessage to the server with an ajax request axios (https://axios-http.com/docs/post_example)

      // this needs to be moved on nodejs on the server
      // this line needs to run as
      const recovered = await web3.eth.accounts.recover(dataToSign, signedAuthMessage, true);
      console.log('recovered:', recovered);


    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('MetaMask not find');
  }
});