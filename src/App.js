import { useState } from "react";
import "./App.css";
import { CopyBlock, dracula } from "react-code-blocks";

const API_KEY = '' //get your api key from app.conciselabs.io 
function App() {
  const [wallet, setWallet] = useState("")
  const [result, setResult] = useState("")

  const fetchPortfolio = async () => {
    let res = await fetch(
      `https://app.conciselabs.io/api/v0/solana-mainnet/portfolio/getportfolio/${wallet}/${API_KEY}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setResult(err);
      });
    setResult(res);
  };

  return (
    <div className="App">
      <h1 className="text-3xl">Fetch Portfolio of a Wallet</h1>
        <div className="pl-7 ">
          <div className="pt-[10px] flex pr-[34px] flex-col">
            <input
              type="text"
              placeholder="Enter Solana Wallet Address"
              onChange={(e) => {
                setWallet(e.target.value);
              }}
              value={wallet}
              className="bg-bg-[#323131] border border-[#B0B0B0] w-[505px] text-sm rounded-sm p-2.5 dark:bg-[#323131] dark"
            />
<br />
            <button
              onClick={fetchPortfolio}
              className="bg-gradient-to-r from-[#F55151] to-[#FFB800] text-base w-[161px] h-[46px] py-2 px-4 rounded mt-[20px] mb-[20px]"
            >
              Submit
            </button>
          </div>
        </div>
        {result && (
      <div className="flex h-full w-[750px] ml-[15px] mb-[10px] text-left">
          <CopyBlock
            text={
              result.data
                ? JSON.stringify(result.data, null, 4)
                : JSON.stringify(result)
            }
            language={"json"}
            showLineNumbers={true}
            theme={dracula}
            codeBlock
          />
      </div>
        )}
    </div>
  );
}

export default App;
