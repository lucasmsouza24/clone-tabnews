import { useEffect, useState } from "react";
import Head from 'next/head';
import styles from './index.module.css';

const startDate = new Date(2023, 0, 16);

function Contagem() {
  const [timeLeft, setTimeLeft] = useState('');
  const [specialMessage, setSpecialMessage] = useState('');
  const [relationshipDuration, setRelationshipDuration] = useState('');
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    setNow(new Date());
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    const love_day = 16

    // next 16th
    let next16 = new Date(year, month, love_day);
    if (day >= love_day) {
      next16 = new Date(year, month + 1, love_day);
    }

    // if today is 16th
    if (day == love_day) {
      setSpecialMessage('🎉 Hoje é o nosso dia! ❤️');
    }

    // Countdown
    const diff = next16.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

    // Relationship duration
    const years = year - startDate.getFullYear();
    let months = month - startDate.getMonth();
    if (day < love_day) months -= 1;
    if (months < 0) {
      months += 12;
    }

    setRelationshipDuration(`${years} ano(s) e ${months} mês(es)`);

    // Update countdown every second
    const interval = setInterval(() => {
      setNow(new Date());
      const updatedNow = new Date();
      const updatedDiff = next16.getTime() - updatedNow.getTime();
      const days = Math.floor(updatedDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((updatedDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((updatedDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((updatedDiff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);

  }, [now]);

  return (
    <>
      <Head>
        <title>Surpresa ❤️</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>❤️ Oi amor! ❤️</h1>
        {specialMessage && <h2 className={styles.subtitle}>{specialMessage}</h2>}

        <p className={styles.text}>Faltam:</p>
        <h2 className={styles.countdown}>{timeLeft}</h2>
        <p className={styles.smallText}>para o próximo dia 16 🗓️</p>

        <br />
        <p className={styles.text}>Estamos juntos há:</p>
        <h2 className={styles.countdown}>{relationshipDuration}</h2>
      </div>
    </>
  );
}

export default Contagem;
