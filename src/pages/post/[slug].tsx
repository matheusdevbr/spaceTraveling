import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <>
      <Header />
      <img src="/teste.png" alt="post images" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postTop}>
            <h1>Titulo principal do post</h1>
            <ul>
              <FiCalendar />
              <li>25 Jan 2022</li>
              <FiUser />
              <li>Matheus S</li>
              <FiClock />
              <li>10 min</li>
            </ul>
          </div>

          <article>
            <h2>Titulo do paragraph</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto, omnis aspernatur facere unde{' '}
              <strong>natus explicabo quo dignissimos </strong>minus mollitia
              dol oremque quos saepe nulla animi debitis qui optio consectetur
              numquam dolores rec usandae cupiditate? Dolorum eveniet
              repudiandae debitis perferendis itaque deserunt veritat is amet,
              et
              <a href="/"> provident quo libero repellendus ad deleniti</a>{' '}
              autem facilis assumenda in doloremque, dolores laudantium minus
              illo quos nostrum quasi. Aliquid odio nulla sit sunt, minima
              commodi repellat quidem incidunt eius voluptas error sequi eum?
              Enim optio excepturi quibusdam minima mollitia temporibus ,
              exercitationem deleniti! Placeat tempora ex dignissimos quos
              nihil?
            </p>
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  //   const prismic = getPrismicClient();
  //   const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
