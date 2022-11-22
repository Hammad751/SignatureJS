import { ethers } from "ethers";
import { loadWeb3 } from "../Api/api";
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
export const getSignatureTest = async (
      // contract, user
      ) => {
  let sigdataArr = [];
  user = await loadWeb3();
  //   console.log("Acc in signature", user);
  //   console.log("Acc in signature", privateKey);

//   contract = "0x8E37ffA5eD617E0764Fb9CEd25485720B8fc7f71"; //BerryClubContract
  contract = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"; //BerryClubContract
  user = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"; //user_address

  const RPC = "https://api.avax-test.network/ext/bc/C/rpc";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const blockNumber = await provider.getBlockNumber();

  const nonce = (await provider.getBlock(blockNumber)).timestamp;
  console.log("nonce-timestamp:", nonce);
  sigdataArr.push(nonce);

  let hash = ethers.utils.solidityKeccak256(
    ["string", "string", "uint256"],
    [contract.toLowerCase(), user.toLowerCase(), nonce]
  );
  console.log("hash:", hash);

  // 0x7A2c3552006A39926f576f8568984b3834Cc2E49 - signer address

  const signingKey = new ethers.utils.SigningKey(privateKey);
  let deployTx = signingKey.signDigest(hash);

  const signature = ethers.utils.joinSignature(deployTx);
  console.log("Signature:", signature);
  sigdataArr.push(signature);
  console.log("sigdataArr", sigdataArr);
  return sigdataArr;
};