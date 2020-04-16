import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from "react-helmet";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Helmet
      title={'CLYPTR'}
      meta={[
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: `@taro_osg` },
        { name: 'twitter:creator', content: `@taro_osg` },
        { name: 'twitter:title', content: 'CLYPTR' },
        { name: 'twitter:image', content: 'https://clyptr.com/banner.jpg' },
        { property: 'og:image', content: 'https://clyptr.com/banner.jpg' },
        { property: 'og:title', content: 'CLYPTR' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'Clip Cryptic Tour' },
        { property: 'og:url', content: 'https://clyptr.com/' },
      ]}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
