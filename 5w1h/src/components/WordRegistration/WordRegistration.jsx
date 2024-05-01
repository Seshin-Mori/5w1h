import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore"; // setDoc をインポート

const WordRegistration = () => {
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 各入力値の長さをチェック
    if ([when, where, who, what].some((value) => value.length > 20)) {
      alert("各項目は20文字以内で入力してください。");
      return; // 16文字以上の場合はここで処理を止める
    } else if ([when, where, who, what].some((value) => value.length === 0)) {
      alert("各項目は必須です。");
      return; // 何も入力されていない場合はここで処理を止める
    }

    try {
      // 新しいドキュメントのIDを自動生成
      const newDocRef = doc(collection(db, "words"));
      await setDoc(newDocRef, {
        when,
        where,
        who,
        what,
        createdAt: new Date(),
      });
      alert("登録が完了しました。");
      navigate("/"); // ホームにリダイレクト
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl text-center font-bold mb-4'>ワード登録</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField label='いつ' value={when} onChange={setWhen} />
        <InputField label='どこで' value={where} onChange={setWhere} />
        <InputField label='誰が' value={who} onChange={setWho} />
        <InputField label='何をした' value={what} onChange={setWhat} />
        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          投稿
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className='block text-sm font-medium text-gray-700'>{label}</label>
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
    />
  </div>
);

export default WordRegistration;
