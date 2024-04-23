import lighthouse from "@lighthouse-web3/sdk";

const apiKey = "09867905.61efde5ffb2b46568f984b7b8316768e";

export async function makeFileObjects(data) {
  // const obj = { hello: "world" };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  const files = [
    // new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "world.json"),
  ];
  return files;
}

export const uploadFile = async (file) => {
  const output = await lighthouse.upload(
    file,
    apiKey,
    false,
    null,
  );
  console.log("File Status:", output);

  console.log(
    "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
  );
  return output.data.Hash;
};
