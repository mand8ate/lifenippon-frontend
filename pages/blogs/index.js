import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import { withRouter } from "next/router";

import Card from "../../components/blog/Card";
import { Button } from "reactstrap";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Life in Japan | {APP_NAME}</title>
      <meta
        name="description"
        content="Everything about life in Japan. From people who already live here for people who live here or want to move over to the land of the rising sun."
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest tips and tricks about life in Japan | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Everything about life in Japan. From people who already live here for people who live here or want to move over to the land of the rising sun."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/lifenippon.png`}
      />
      <meta
        property="og:image:secure_url"
        content="/static/images/lifenippon.png"
      />
      <meta property="og:image:type" content="image/png" />
      {/* <meta property="fb:app_id" content={`${APP_NAME}`} /> */}
    </Head>
  );

  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(blogSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      {
        if (data.error) {
          console.log(data.error);
        } else {
          setLoadedBlogs([...loadedBlogs, ...data.blogs]);
          setSize(data.size);
          setSkip(toSkip);
        }
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link
        key={i}
        href={`/categories/${c.slug}`}
        className="btn btn-primary mr-1 ml-1 mt-3"
      >
        {c.name}
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link
        key={i}
        href={`/tags/${t.slug}`}
        className="btn btn-outline-primary mr-1 ml-1 mt-3"
      >
        {t.name}
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  P2P Blogs about life in Japan
                </h1>
              </div>
              <section>
                <div className="pb-5 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
