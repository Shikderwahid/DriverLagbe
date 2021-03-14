import { useState, useEffect } from "react";
import PostCards from "../components/PostCards";
import { db } from "../service/firebase";
import { Navbar, Nav, Form } from "react-bootstrap";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        let datas = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          datas.push(doc.data());
        });
        setPosts(datas);
      });
  }, []);
  return (
    <div className="container">
      <div>
        <Form inline>
          <input
            className="form-control me-2 input-group-sm"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-dark" type="submit">
            Search
            </button>
        </Form>
        {posts?.map((post, id) => (
          <PostCards key={id} post={post} />
        ))}
      </div>
    </div >
  );
};

export default Home;
