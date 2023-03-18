const ethereumButton = document.querySelector('.connect-metamask');

const web3 = new Web3(window.ethereum);

web3.eth.net.isListening()
  .then(() => console.log('Thank you'))
  .catch((err) => console.log('Error:', err));

const accountElem = document.querySelector('#account-address'); // seleciona o elemento pelo ID "account-address"
let accounts;
let account;

async function connectMetamask() {
  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  console.log('Your address:', account);
  accountElem.innerHTML = account;
}

ethereumButton.addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed!');
    await connectMetamask();
  } else {
    console.log('MetaMask not found');
  }
});
