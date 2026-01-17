export const fetchUsers = async (page: number) => {
  const limit = 20;
  const skip = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
  );

  console.log(page, res.ok);
  
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};
