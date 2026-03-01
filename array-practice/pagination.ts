type Post = {
  id: number;
  title: string;
};

const posts: Post[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
}));

function pagination(posts: Post[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const paginated = posts.slice(start, start + limit);

  return {
    data: paginated,
    currentPage: page,
    totalPages: Math.ceil(posts.length / limit),
  };
}

console.log(pagination(posts, 3, 10));
