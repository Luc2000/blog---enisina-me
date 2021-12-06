// Ele carrega apenas uma vez na aplicação com next
import Document, {Html, Head, Main, NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();
    
        // Step 2: Retrieve styles from components in the page
        const page = renderPage((App) => (props) =>
          sheet.collectStyles(<App {...props} />),
        );
    
        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();
    
        // Step 4: Pass styleTags as a prop
        return { ...page, styleTags };
    }
    render() {
        return(
            <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;0,900;1,400&display=swap" rel="stylesheet" />

                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
            </Head>
            <body>
                <Main /> 
                <NextScript />               
            </body>
            </Html>
        );
    }
}