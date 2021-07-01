import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreatePost } from "./Pages/Create/CreatePost";
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
export const DeletePostContext = React.createContext();
export const ChangePostContext = React.createContext();
export const MessageContext = React.createContext();
export const ChangeMessageContext = React.createContext();
function App() {
  const [allUsers, setAllUsers] = useState();
  const [allPosts, setAllPosts] = useState();
  const [copyOfPosts, setCopyOfPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState();
  const [maxId, setMaxId] = useState(100);
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
  const deletePost = async (postId) => {
    // setLoading(true);
    // const res = await fetch(
    //   `http://jsonplaceholder.typicode.com/posts/${postId}`,
    //   { method: "DELETE" }
    // );
    // const json = await res.json();
    // console.log(json);
    const currentAllPosts = [];
    allPosts.forEach((post) => {
      if (post.id != postId) {
        currentAllPosts.push(post);
      }
    });
    setAllPosts(currentAllPosts);
    setCopyOfPosts(currentAllPosts);
    // setLoading(false);
  };
  const changeMessage = (message) => {
    setMessage(message);
  };
  const changePost = (event, postId) => {
    let currentAllPosts = allPosts;
    event.preventDefault();
    const name = event.target[0].value;
    const companyName = event.target[1].value;
    const title = event.target[2].value;
    const body = event.target[3].value;
    console.log(postId);
    if (!postId) {
      currentAllPosts.unshift({
        id: maxId + 1,
        name,
        companyName,
        title,
        body,
      });
      setMaxId(maxId + 1);
      setMessage("New Post Added Successfully");
    } else {
      currentAllPosts.forEach((post) => {
        if (post.id == postId) {
          post.name = name;
          post.companyName = companyName;
          post.title = title;
          post.body = body;
        }
      });
      setMessage("Post updated Successfully");
    }
    console.log(currentAllPosts);
    setAllPosts(currentAllPosts);
    setCopyOfPosts(currentAllPosts);
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <LoadingContext.Provider value={loading}>
            <MessageContext.Provider value={message}>
              <ChangeMessageContext.Provider value={changeMessage}>
                <AllPostContext.Provider value={allPosts}>
                  <DeletePostContext.Provider value={deletePost}>
                    <LikePostContext.Provider value={handleLikePost}>
                      <DislikePostContext.Provider value={handleDislikePost}>
                        <SearchContext.Provider value={handleSearch}>
                          <SearchValueContext.Provider value={searchValue}>
                            <Route path="/home" component={Home} />
                            <Route path="/liked" component={Liked} />
                            <Route path="/disliked" component={Disliked} />
                            <ChangePostContext.Provider value={changePost}>
                              <Route path="/create" component={CreatePost} />
                            </ChangePostContext.Provider>
                            <Route
                              path="/"
                              exact
                              render={(props) => <Home {...props} />}
                            />
                            <Route
                              path="/social-media"
                              render={(props) => <Home {...props} />}
                            />
                          </SearchValueContext.Provider>
                        </SearchContext.Provider>
                      </DislikePostContext.Provider>
                    </LikePostContext.Provider>
                  </DeletePostContext.Provider>
                </AllPostContext.Provider>
              </ChangeMessageContext.Provider>
            </MessageContext.Provider>
          </LoadingContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
