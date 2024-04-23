"use client";
import { CountDownRenderer } from "@/components";
import { ethers } from "ethers";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  addQuestionFn,
  getAnswerFn,
  getQuestionFn,
  getCurrentBountyFn,
  distributeMainBountyFn,
} from "@/libs/contractFunctionCall";
import { Database } from "@tableland/sdk";
import {
  addToAiTableFn,
  readQuestionTableFunc,
  readUserQuestionFunc,
  searchQuestionTableFunc,
} from "@/libs/TablelandFnCall";
import { uploadData } from "@/libs/lighthouse";

const contractTxId = process.env.NEXT_PUBLIC_QUESTION_CONTRACT_ID;

const Temp = () => {
  const [initDB, setInitDB] = useState(false);
  const [db, setDb] = useState(null);

  const addQfn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    await getQuestionFn(signer, 9367815);
    // await getAnswerFn(signer, 5320693);
    await getCurrentBountyFn(signer, 9367815);
    await distributeMainBountyFn(signer, 9367815, 5340323);
  };

  const readTable = async (tableName) => {
    try {
      const db = new Database();
      const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
      console.log(results);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://gateway.lighthouse.storage/ipfs/QmddchiYMQGZYLZf86jhyhkxRqrGfpBNr53b4oiV76q6aq"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = console.log(response);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const getData = async () => {
    // console.log(await readQuestionTableFunc());
    // await readUserQuestionFunc("0x062A88EC102154D69aF12ecA850216063D8e65a7");
    await addToAiTableFn();
  };
  return (
    <div className="flex gap-5">
      <button onClick={() => getData()}> get data</button>
      <button onClick={() => fetchData()}> fetch Data</button>
      <button onClick={() => updateData()}> update data</button>
      <button onClick={() => deleteData()}> delete data</button>
      <button onClick={() => authenticate()}> authenticate</button>
      <button onClick={() => addQfn()}> Function Call</button>
      {/* <Countdown date={Date.now() + 10000} renderer={CountDownRenderer} /> */}
    </div>
  );
};

export default Temp;
