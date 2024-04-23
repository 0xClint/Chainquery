import { Database } from "@tableland/sdk";
import { ethers } from "ethers";

const QUESTION_CONTRACT_ADDRESS = "0xafb3472Bf6ADfeE879f3EEa5eD79326852108BC5";
const QUESTION_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    name: "ChainNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
      {
        internalType: "string",
        name: "questionText",
        type: "string",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        internalType: "string",
        name: "tags",
        type: "string",
      },
      {
        internalType: "string",
        name: "timeOfCreation",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeBased",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "timeAlloted",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "upvote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downvote",
        type: "uint256",
      },
    ],
    name: "createQuestion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "deleteQuestion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
      {
        internalType: "string",
        name: "questionText",
        type: "string",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        internalType: "string",
        name: "tags",
        type: "string",
      },
      {
        internalType: "string",
        name: "timeOfCreation",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeBased",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "timeAlloted",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "upvote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downvote",
        type: "uint256",
      },
    ],
    name: "updateQuestion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getQuestionTableName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ANSWER_CONTRACT_ADDRESS = "0xfF82ff201482142C232db481038C4B1309465E98";
const ANSWER_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    name: "ChainNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
      {
        internalType: "string",
        name: "answerText",
        type: "string",
      },
      {
        internalType: "string",
        name: "timeOfCreation",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "upvote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downvote",
        type: "uint256",
      },
    ],
    name: "createAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
    ],
    name: "deleteAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "questionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
      {
        internalType: "string",
        name: "answerText",
        type: "string",
      },
      {
        internalType: "string",
        name: "timeOfCreation",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "upvote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downvote",
        type: "uint256",
      },
    ],
    name: "updateAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "answerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newUpvote",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newDownvote",
        type: "uint256",
      },
    ],
    name: "updateVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAnswerTableName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const AI_TABLE_CONTRACT_ADDRESS = "0xd3EDc274C2531bc2fae2E5388586E2F5146B4847";
const AI_TABLE_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    name: "ChainNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "createAI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
    ],
    name: "deleteAI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "addr",
        type: "string",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "updateAI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAITableName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const QUESTION_TABLE_NAME = "question_table_421614_523";
export const ANSWER_TABLE_NAME = "answer_table_421614_527";
export const AI_TABLE_CONTRACT_NAME = "ai_table_421614_714";

export const readQuestionTableFunc = async () => {
  try {
    const db = new Database();
    const { results } = await db
      .prepare(`SELECT * FROM ${QUESTION_TABLE_NAME}`)
      .all();
    return results.reverse();
  } catch (err) {
    console.error(err.message);
  }
};
export const searchQuestionTableFunc = async (props) => {
  try {
    const db = new Database();
    const { results } = await db
      .prepare(
        `SELECT * FROM ${QUESTION_TABLE_NAME} WHERE question LIKE '%${props}%'`
      )
      .all();
    console.log(results);
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

export const readAnswerTableFunc = async () => {
  try {
    const db = new Database();
    const { results } = await db
      .prepare(`SELECT * FROM ${ANSWER_TABLE_NAME}`)
      .all();
    return results.reverse();
  } catch (err) {
    console.error(err.message);
  }
};

export const readQuestionFunc = async (questionId) => {
  try {
    const db = new Database();
    const { results } = await db
      .prepare(
        `SELECT * FROM ${QUESTION_TABLE_NAME} WHERE question_id = ${questionId}`
      )
      .all();
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

export const readAnswersFunc = async (questionId) => {
  try {
    const db = new Database();
    const { results } = await db
      .prepare(
        `SELECT * FROM ${ANSWER_TABLE_NAME} WHERE question_Id = ${questionId}`
      )
      .all();
    console.log(results);
    return results;
  } catch (err) {
    console.error(err.message);
  }
};

// ***********************USER_CONTRACT_FUNCTION *****************************

export const addQuestionToTableFn = async (signer, data) => {
  const {
    questionId,
    addr,
    questionText,
    details,
    tags,
    timeOfCreation,
    timeBased,
    timeAllotted,
    upvote,
    downvote,
  } = data;

  const account = await signer.getAddress();
  const contract = new ethers.Contract(
    QUESTION_CONTRACT_ADDRESS,
    QUESTION_CONTRACT_ABI,
    signer
  );
  const tx = await contract.createQuestion(
    questionId,
    addr,
    questionText,
    details,
    tags,
    timeOfCreation,
    timeBased,
    timeAllotted,
    upvote,
    downvote
  );
  await tx.wait();
  console.log(tx);
};

export const addAnswertoTableFn = async (signer, data) => {
  const {
    answerId,
    questionId,
    addr,
    answerText,
    timeOfCreation,
    upvote,
    downvote,
  } = data;
  const contract = new ethers.Contract(
    ANSWER_CONTRACT_ADDRESS,
    ANSWER_CONTRACT_ABI,
    signer
  );
  const tx = await contract.createAnswer(
    answerId,
    questionId,
    addr,
    answerText,
    timeOfCreation,
    upvote,
    downvote
  );
  await tx.wait();
  console.log(tx);
};

export const updateAnswerFn = async (signer, answerId, upvote, downvote) => {
  const contract = new ethers.Contract(
    ANSWER_CONTRACT_ADDRESS,
    ANSWER_CONTRACT_ABI,
    signer
  );
  const tx = await contract.updateVote(answerId, upvote, downvote);
  await tx.wait();
  console.log(tx);
};

export const addToAiTableFn = async (signer, id, address, cid) => {
  const contract = new ethers.Contract(
    AI_TABLE_CONTRACT_ADDRESS,
    AI_TABLE_CONTRACT_ABI,
    signer
  );
  const tx = await contract.createAI(id, address, cid);
  await tx.wait();
  console.log(tx);
};

export const readAiTableFunc = async (address) => {
  try {
    const db = new Database();
    const { results } = await db
      .prepare(
        `SELECT * FROM ${AI_TABLE_CONTRACT_NAME}`
        // `SELECT * FROM ${AI_TABLE_CONTRACT_NAME} WHERE address = ${address}`
      )
      .all();
    console.log(results);
    return results;
  } catch (err) {
    console.error(err.message);
  }
};
