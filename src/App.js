import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Disliked } from "./Pages/Disliked/Disliked";
import { Home } from "./Pages/Home/Home";
import { Liked } from "./Pages/Liked/Liked";
export const AllPostContext = React.createContext();
export const AllUsersContext = React.createContext();
export const LoadingContext = React.createContext();
export const LikePostContext = React.createContext();
export const DislikePostContext = React.createContext();
export const SearchContext = React.createContext();
export const SearchValueContext = React.createContext();
function App() {
  const [allUsers, setAllUsers] = useState();
  const [allPosts, setAllPosts] = useState();
  const [copyOfPosts, setCopyOfPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
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
        setCopyOfPosts(posts);
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
        post.liked = !post.liked;
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
        post.disliked = !post.disliked;
      }
    });
    setAllPosts([...currentPosts]);
  };
  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
    let currentAllPosts = [];
    let reg = new RegExp(searchValue, "i");
    copyOfPosts.forEach((post) => {
      if (
        post.title.match(reg) ||
        post.name.match(reg) ||
        post.companyName.match(reg) ||
        post.body.match(reg)
      ) {
        currentAllPosts.push(post);
      }
    });
    setAllPosts([...currentAllPosts]);
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <LoadingContext.Provider value={loading}>
            <AllPostContext.Provider value={allPosts}>
              <LikePostContext.Provider value={handleLikePost}>
                <DislikePostContext.Provider value={handleDislikePost}>
                  <SearchContext.Provider value={handleSearch}>
                    <SearchValueContext.Provider value={searchValue}>
                      <Route path="/home" component={Home} />
                      <Route path="/liked" component={Liked} />
                      <Route path="/disliked" component={Disliked} />
                      <Route path="/" exact component={Home} />
                    </SearchValueContext.Provider>
                  </SearchContext.Provider>
                </DislikePostContext.Provider>
              </LikePostContext.Provider>
            </AllPostContext.Provider>
          </LoadingContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
