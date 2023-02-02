export const web3Handler = async (provider, setAccount) => {
  if (provider) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }
};
export const mintHandler = async (warrantyContract) => {
  try {
    console.log("minting");
    const resMint = await warrantyContract.mint();
    const res = await resMint.wait();
    console.log("response after minting", res);
    return res;
  } catch (error) {
    window.alert("error occured while minting");
  }
};

export const getTokensClickHandler = async (
  warrantyContract,
  setTokens,
  setNumberOfTokens
) => {
  try {
    const tokensGen = await warrantyContract.getTokens();
    setTokens(tokensGen);
    setNumberOfTokens("");
  } catch (error) {
    window.alert("error occured while fetching token list");
  }
};
export const setProductsClickHandler = async (warrantyContract) => {
  try {
    await warrantyContract.addProduct("Product1", 1, 100, 278);
    console.log("product is set");
  } catch (error) {
    window.alert("error occured while setting product details");
  }
};

export const getProductsClickHandler = async (warrantyContract) => {
  try {
    const products = await warrantyContract.getProducts();
    console.log("Products details", products);
  } catch (error) {
    window.alert("error occured while fetching product details");
  }
};
export const addDataClickHandler = async (
  warrantyContract,
  tokenId,
  jsonData
) => {
  let response;
  try {
    const res = await warrantyContract.addData(tokenId, jsonData);
    response = await res.wait();
    console.log("meta data added", response);
  } catch (error) {
    window.alert("error occured while adding data for product");
  }
  return response;
};
export const getMetaData = async (warrantyContract, tokenId) => {
  let metadata = {};
  try {
    metadata = await warrantyContract.tokenURI(tokenId);
  } catch (error) {
    window.alert("error occured while fetching Data for product");
  }
  return metadata;
};
