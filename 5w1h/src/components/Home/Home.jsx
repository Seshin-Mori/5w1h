import React, { useState } from "react";
import { db } from "../../firebase";
import "./Home.css";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [sentence, setSentence] = useState("");

  // ランダムにデータを選び、空文字を含まないか確認する関数
  const getRandomData = async (colRef, field) => {
    let validData = "";
    while (!validData) {
      const querySnapshot = await getDocs(colRef);
      if (!querySnapshot.empty) {
        const randomDoc =
          querySnapshot.docs[
            Math.floor(Math.random() * querySnapshot.docs.length)
          ];
        const data = randomDoc.data();
        if (data[field] && data[field].trim() !== "") {
          validData = data[field];
        }
      } else {
        break; // コレクションが空の場合、ループを抜ける
      }
    }
    return validData;
  };

  const fetchData = async () => {
    const colRef = collection(db, "words");
    const when = await getRandomData(colRef, "when");
    const where = await getRandomData(colRef, "where");
    const who = await getRandomData(colRef, "who");
    const what = await getRandomData(colRef, "what");

    if (when && where && who && what) {
      setSentence(`${when} ${where} ${who} ${what}`);
    } else {
      setSentence("適切なデータが見つかりませんでした。");
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl text-center font-bold mb-4'>ランダム文章生成</h1>
      <div className='bg-blue-100 p-3 rounded shadow text-center'>
        {sentence}
      </div>
      <button
        onClick={fetchData}
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        新しい文章を生成
      </button>
    </div>
  );
};

export default Home;
