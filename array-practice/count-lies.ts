let arr = [
  { id: 1, likes: 200 },
  { id: 2, likes: 350 },
  { id: 3, likes: 120 },
];
type arrType = {
  id: number;
  likes: number;
};

function TotalLikes(arr: arrType[]) {
  let total = arr.reduce((total, item) => {
    return total + item.likes;
  }, 0);
  console.log(total);
}

TotalLikes(arr);

function getMostLikedPost(posts: arrType[]): arrType {
  let maxPost = posts[0];

  for (let post of posts) {
    if (post.likes > maxPost.likes) {
      maxPost = post;
    }
  }

  return maxPost;
}

console.log(getMostLikedPost(arr));
