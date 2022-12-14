import type { NextPage } from "next";
import Head from "next/head";
import styles from "./../styles/Home.module.scss";
import cn from "classnames";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>Crocodile App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <h1 className={styles.title}>Crocodile</h1>
          <p className={styles.description}>
            Play crocodile with friends, can they guess it?
          </p>
          <Link className={cn(styles.btn, styles.startGameBtn)} href="game/1">
            Create room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
