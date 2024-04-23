"use client";
import { Header, Footer } from "@/components";
import { isValidJSON } from "@/libs/constant";
import { readQuestionTableFunc } from "@/libs/TablelandFnCall";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoader(true);
    const res = await readQuestionTableFunc();
    console.log(res);
    setData(res.slice(0, 3));
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[100vw]">
      <Header />
      <div className="hero bg-white min-h-[90vh]">
        <div className="hero-content flex-col justify-between lg:flex-row-reverse">
          <Image
            src={"/query.png"}
            width={300}
            height={300}
            className="border border-black rounded-md"
          />
          <div className="w-1/2 text-black">
            <h1 className="text-5xl font-bold">Web3 Q&A with Bounty Rewards</h1>
            <p className="py-6">
              QueriFi is a web3 Q&A platform where users can ask and create
              bounties for web3, solidity, and blockchain questions. Rewards are
              distributed based on votes, with the option for the question
              creator to allocate a main bounty. Users can also answer questions
              and get paid simultaneously.
            </p>
            <button className="btn btn-neutral">Get Started</button>
          </div>
        </div>
      </div>

      <div className="flex mx-36 gap-5">
        <div className="w-full border rounded-md">
          <div className="heading flex ">
            <div>
              <button className="btn btn-ghost hover:bg-[#f4f4f4] rounded-md">
                Top Questions
              </button>
              <button className="btn btn-ghost hover:bg-[#f4f4f4] rounded-md">
                Featured
              </button>
              <button className="btn btn-ghost hover:bg-[#f4f4f4] rounded-md">
                Most updated
              </button>
            </div>
          </div>
        </div>
        <div className="make-flex">
          <Link href="/ask-AI" className="btn btn-neutral w-36">
            Ask AI
            <FaWandMagicSparkles />
          </Link>
        </div>
      </div>
      {loader ? (
        <span className="loading loading-spinner loading-lg mx-auto flex my-3"></span>
      ) : (
        <div className="question-container mx-36 text-left my-5 make-flex flex-col gap-5">
          {data?.map(
            (
              { address, details, question, tags, timeOfCreation, question_id },
              index
            ) => (
              <Link
                href={`/questions/${question_id}`}
                className="w-full"
                key={index}
              >
                <div className="py-5 px-8 border  rounded-md w-full">
                  <h2 className="text-[1.4rem] font-semibold">{question}</h2>
                  <div className="w-full max-h-[300px] overflow-y-auto overflow-x-auto">
                    <div
                      className="my-5"
                      dangerouslySetInnerHTML={{ __html: details }}
                    />
                  </div>
                  <div className="flex gap-3">
                    {Array.isArray(tags)
                      ? tags.map((item, index) => (
                          <div
                            key={index}
                            className="badge badge-outline cursor-pointer px-2 py-3 text-sm  bg-base-200 font-semibold"
                          >
                            {item}
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </Link>
            )
          )}

          <div className="w-full make-flex justify-end items-end">
            <a
              className="text-right font-semibold link text-purple-gray"
              href="#"
            >
              more
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
