"use client";
import axios from "axios";

export default function Component1() {
  const handleClick = async () => {
    const { data } = await axios.get(`http://localhost:1337/api/users/1`);
    console.log(data);
  };

  return (
    <div>
      <span onClick={handleClick}>1 </span>
    </div>
  );
}
