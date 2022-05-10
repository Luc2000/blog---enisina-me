import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import { MainHome } from "../components/styles.home";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ensina-blog</title>
      </Head>

      <MainHome>
        <section>
          <span>👏 Olá, seja bem-vindo</span>
          <h1>
            Dicas e Notícias
            <br />
            sobre o mundo de <span>Aulas particulares</span>
          </h1>
          <p>
            Confira todas as dicas de especialistas
            <br />
            <span>Por apenas {product.amount} mensais</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </MainHome>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1JwqE8BujULtKGaKiD4nSaKw", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //Ou seja, vai chamar a API a cada 24 horas (quando alguém entrar)
  };
};
