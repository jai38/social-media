import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Disliked } from "./Pages/Disliked/Disliked";
import { Home } from "./Pages/Home/Home";
import { Liked } from "./Pages/Liked/Liked";
export const AllPostContext = React.createContext();
export const allUsersContext = React.createContext();
export const loadingContext = React.createContext();
export const likePostContext = React.createContext();
export const dislikePostContext = React.createContext();
function App() {
  const [allUsers, setAllUsers] = useState();
  const [allPosts, setAllPosts] = useState();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const users = await fetchAllUsers();
    const posts = await fetchAllPosts(users);
    return { users, posts };
  };
  const fetchAllUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });
    const json = await res.json();
    return json;
  };
  const fetchAllPosts = async (users) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });
    const json = await res.json();
    let posts = [];
    json.forEach((post) => {
      users.forEach((user) => {
        if (post.userId == user.id) {
          posts.push({
            ...post,
            liked: false,
            disliked: false,
            name: user.name,
            companyName: user.company.name,
          });
        }
      });
    });
    return posts;
  };
  useEffect(() => {
    let mounted = true;
    fetchData().then(({ posts, users }) => {
      if (mounted) {
        setAllPosts(posts);
        setAllUsers(users);
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, []);
  const handleLikePost = (postId) => {
    const currentPosts = allPosts;
    currentPosts.forEach((post) => {
      if (post.id == postId) {
        post.liked = true;
        post.disliked = false;
      }
    });
    setAllPosts([...currentPosts]);
  };
  const handleDislikePost = (postId) => {
    const currentPosts = allPosts;
    currentPosts.forEach((post) => {
      if (post.id == postId) {
        post.liked = false;
        post.disliked = true;
      }
    });
    setAllPosts([...currentPosts]);
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <loadingContext.Provider value={loading}>
            <allUsersContext.Provider value={allUsers}>
              <AllPostContext.Provider value={allPosts}>
                <likePostContext.Provider value={handleLikePost}>
                  <dislikePostContext.Provider value={handleDislikePost}>
                    <Route path="/home" component={Home} />
                    <Route path="/liked" component={Liked} />
                    <Route path="/disliked" component={Disliked} />
                  </dislikePostContext.Provider>
                </likePostContext.Provider>
              </AllPostContext.Provider>
            </allUsersContext.Provider>
          </loadingContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
