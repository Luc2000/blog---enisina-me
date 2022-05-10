import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import RichText from "@prismicio/helpers";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import { Post as StylePost } from "../../../components/styles.post";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ensina-me </title>
      </Head>
      <StylePost>
        <article className="post">
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="postContent previewContent"
          />
          <div className="continueReading">
            Quer continuar lendo?
            <Link href="/">
              <a href="">Inscreva-se já 😄</a>
            </Link>
          </div>
        </article>
      </StylePost>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();

  const response = await prismic.getByUID("impulsionar", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
