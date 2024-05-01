import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import sanitizeHtml from "sanitize-html"; // HTMLサニタイズのためのライブラリをインポート

const WordRegistration = () => {
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 入力データのサニタイズ
    const cleanWhen = sanitizeHtml(when);
    const cleanWhere = sanitizeHtml(where);
    const cleanWho = sanitizeHtml(who);
    const cleanWhat = sanitizeHtml(what);

    // 空の入力または長すぎる入力のチェック
    if (
      [cleanWhen, cleanWhere, cleanWho, cleanWhat].some(
        (value) => value.length > 20
      )
    ) {
      alert("各項目は20文字以内で入力してください。");
      return;
    } else if (
      [cleanWhen, cleanWhere, cleanWho, cleanWhat].some(
        (value) => value.trim().length === 0
      )
    ) {
      alert("各項目は必須です。");
      return;
    }

    try {
      // Firestoreにデータを登録
      const newDocRef = doc(collection(db, "words"));
      await setDoc(newDocRef, {
        when: cleanWhen,
        where: cleanWhere,
        who: cleanWho,
        what: cleanWhat,
        createdAt: new Date(),
      });
      alert("登録が完了しました。");
      navigate("/"); // ホームにリダイレクト
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("登録に失敗しました。エラーを確認してください。");
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl text-center font-bold mb-4'>ワード登録</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField
          label='いつ'
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
        <InputField
          label='どこで'
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        />
        <InputField
          label='誰が'
          value={who}
          onChange={(e) => setWho(e.target.value)}
        />
        <InputField
          label='何をした'
          value={what}
          onChange={(e) => setWhat(e.target.value)}
        />
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
      onChange={onChange}
      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
    />
  </div>
);

export default WordRegistration;
