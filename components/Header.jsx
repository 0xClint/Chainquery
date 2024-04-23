import React, { useState } from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Image from "next/image";
import { searchQuestionTableFunc } from "@/libs/TablelandFnCall";

const Header = () => {
  const [search, setSearch] = useState("");
  const [data, setdata] = useState([]);
  const handleSearch = async (value) => {
    setSearch(value);
    setdata(await searchQuestionTableFunc(value));
  };

  return (
    <div className=" navbar bg-base-100 w-[95vw] mx-auto rounded-2xl p-3">
      <div className="flex-1">
        <Link
          className="btn btn-ghost text-xl font-bold hover:scale-105 make-flex"
          href="/"
        >
          <Image
            src={"/logo1.png"}
            width={100}
            height={50}
            alt="logo"
            className="-translate-y-2"
          />
        </Link>
        <div className="form-control">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
            className="input input-bordered w-72"
          />
          <div>
            {data.length!=0 && (
              <div className="absolute bg-white z-10 border rounded-lg p-3 ">
                {data.map(({ question, question_id }) => {
                  return (
                    <Link
                      href={`/questions/${question_id}`}
                      className="p-1 block rounded hover:bg-[#D7D7D7] cursor-pointer"
                    >
                      {question}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal  px-1 mr-2">
          <li className="font-semibold">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="font-semibold">
            <Link href="/ask">Ask Question</Link>
          </li>
        </ul>
        <Link href="/ask-AI" className="btn btn-outline w-28 mr-2">
          Ask AI
          <FaWandMagicSparkles />
        </Link>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
