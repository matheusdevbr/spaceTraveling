import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Titulo</strong>
              <p>texto sobre algum assunto</p>
              <ul>
                <li>
                  <FiCalendar />
                  14 Mai 2020
                </li>
                <li>
                  <FiUser />
                  Usuario Tal
                </li>
              </ul>
            </a>
          </Link>
        </div>
        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Titulo</strong>
              <p>texto sobre algum assunto sjd ajsdajs</p>
              <ul>
                <FiCalendar />
                <li>14 Mai 2020</li>
                <FiUser />
                <li>Usuario Tal</li>
              </ul>
            </a>
          </Link>

          <button type="button">Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}
// export const getStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query(TODO);

//   TODO;
// };
// function TODO(TODO: any) {
//   throw new Error('Function not implemented.');
// }
