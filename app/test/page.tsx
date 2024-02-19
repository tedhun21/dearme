import { Suspense } from "react";
import Component1 from "../ui/test/comOne";

export default function Test() {
  return (
    <div>
      <Component1 />
      <Component2 />
      <Suspense fallback={<div>hi</div>}>
        <Component3 />
      </Suspense>
    </div>
  );
}

async function Component2() {
  const res = await fetch(`http://localhost:1337/api/users/1`);
  const data = await res.json();

  return (
    <div>
      <span>2 {data.username}</span>
    </div>
  );
}

async function Component3() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const res = await fetch(`http://localhost:1337/api/users/1`);
  const data = await res.json();

  return (
    <div>
      <span>3 {data.username}</span>
    </div>
  );
}
