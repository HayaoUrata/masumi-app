import React, { useState, useEffect } from 'react';

const GetMasumi = () => {
  const [masumis, setMasumis] = useState([]); // 画像の状態
  const [count, setCount] = useState(0); // 捕獲数

  useEffect(() => {
    const interval = setInterval(() => {
      if (masumis.length < 10) {
        addMasumi();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [masumis]);

  const addMasumi = () => {
    const newMasumi = {
      id: Math.random(), // 簡単なID生成、本番ではより良い方法を検討するべき
    //   size: `${Math.random() * 2 + 0.5}em`, // 0.5emから2.5emの大きさ
      size: `${Math.random() * 10 + 2.5}em`, // 2.5emから12.5emの大きさでランダム
      transform: `rotate(${Math.random() * 360}deg)`, // 0から360度の範囲で回転
      top: `${Math.random() * 90}%`, // 画面の上部から90%の範囲でランダム
      left: `${Math.random() * 90}%`, // 画面の左側から90%の範囲でランダム
    };

    setMasumis((prevMasumis) => [...prevMasumis, newMasumi]);
  };

  const removeMasumi = (id) => {
    setMasumis((prevMasumis) => prevMasumis.filter(masumi => masumi.id !== id));
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <div style={{ position: 'fixed', right: 0, top: 0, padding: '10px', background: 'lightgray', zIndex: 1000 }}>
        捕獲：{count}体
      </div>
      {masumis.map((masumi) => (
        <img
          key={masumi.id}
          src="/images/masumi.png"
          style={{
            position: 'absolute',
            width: masumi.size,
            transform: masumi.transform,
            top: masumi.top,
            left: masumi.left,
            cursor: 'pointer',
          }}
          alt="Masumi"
          onClick={() => removeMasumi(masumi.id)}
        />
      ))}
    </div>
  );
};

export default GetMasumi;
