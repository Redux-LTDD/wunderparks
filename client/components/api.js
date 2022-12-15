export const firstFetch = (user) => {
  return fetch(`http://localhost:3000/user/${user}`, {
    method: 'GET',
    headers: { 'Content-Type': 'Application/JSON' },
  }).then((res) => {
    if (res.status === 200) return res.json();
    else throw new Error('ahahhhh');
  });
};
