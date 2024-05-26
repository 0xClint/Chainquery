import { Header } from "@/components";
import { addToAiTableFn, readAiTableFunc } from "@/libs/TablelandFnCall";
import { random } from "@/libs/constant";
import { makeFileObjects, uploadFile } from "@/libs/lighthouse";
import axios from "axios";
import { ethers } from "ethers/lib";
import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";

const dummydata = [
  {
    id: 1,
    question: "What is Ethereum?",
    answer:
      "Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (DApps). It uses blockchain technology to create and execute smart contracts, which are self-executing contracts with the terms of the agreement directly written into code.",
  },
  {
    id: 2,
    question: "What is FileCoin?",
    answer:
      "Filecoin is a decentralized storage network designed to store humanity's most important information. It allows users to buy and sell unused storage space. Miners in the Filecoin network earn Filecoin tokens by providing storage to clients. This system aims to create a more efficient and secure way to store data compared to traditional cloud storage providers.",
  },
];

const AskAI = () => {
  const [prompt, setPrompt] = useState("");
  // const [answer, setAnswer] = useState("");
  const [data, setData] = useState([...dummydata]);
  const [loader, setLoader] = useState(false);

  async function makePostRequestToServer() {
    setLoader(true);
    if (prompt) {
      try {
        console.log(prompt);
        const response = await axios.post(
          "https://learnweb3-backend.onrender.com/api/chatbot",
          {
            prompt,
          }
        );
        const res = response.data.response.answer;
        setData([...data, { question: prompt, answer: res }]);
        // const cid = await uploadFile(await makeFileObjects(data));
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        // const signer = await provider.getSigner();
        // const account = await signer.getAddress();
        // await addToAiTableFn(signer, random(), account, cid);
        setPrompt("");
        console.log();
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
    setLoader(false);
  }

  const readAIData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    await readAiTableFunc(account);
  };

  useEffect(() => {
    readAIData();
  }, []);
  return (
    <div>
      <Header />

      <div className=" border border-purple-gray mx-60 h-[500px] mt-7 rounded-sm overflow-y-auto">
        {loader ? (
          <div className="h-full w-full make-flex">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="p-10 flex flex-col gap-6">
            {data?.map(({ question, answer }, index) => {
              return (
                <div key={index}>
                  <p className=" font-semibold">
                    {index + 1}. {question}
                  </p>
                  <p className="">
                    <span className="font-semibold">ans.</span> {answer}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="absolute bottom-5 w-full">
        <label className="flex gap-2 flex-row form-control mx-60">
          <input
            type="text"
            placeholder="Ask AI"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="input input-bordered border-black rounded-sm w-full text-black"
          />
          <button
            className="btn btn-neutral "
            onClick={() => makePostRequestToServer()}
          >
            <LuUpload className="text-lg" />
          </button>
        </label>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AskAI;
