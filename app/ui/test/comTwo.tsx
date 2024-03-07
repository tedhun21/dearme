export default async function Component2() {
  const res = await fetch(`http://localhost:1337/api/users/1`);
  const data = await res.json();

  return (
    <div>
      <span>2 {data.username}</span>
    </div>
  );
}
