// SmallCard.js
import Link from "next/link";
import moment from "moment";
import parse from "html-react-parser";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <div className="card h-100">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <img
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
            style={{ height: "250px", width: "100%" }}
            className="img img-fluid card-img-top"
          />
        </Link>
      </section>

      <div className="card-body d-flex flex-column">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <h5 className="card-title">{blog.title}</h5>
          </Link>
          <p className="card-text">{parse(blog.excerpt)}</p>
        </section>
      </div>
      <div className="card-footer mt-auto">
        Posted {moment(blog.updatedAt).fromNow()} by{" "}
        <Link href={`/profile/${blog.postedBy.username}`}>
          {blog.postedBy.username}
        </Link>{" "}
      </div>
    </div>
  );
};

export default SmallCard;
