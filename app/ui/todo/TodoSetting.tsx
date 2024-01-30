import { useState } from "react";

// type TodoSettingProps = {
//   todo: Todo;
//   setting: {
//     value: string;
//     keyword: string;
//   };
//   handleClose: React.MouseEventHandler<HTMLInputElement>;
// };

export default function TodoSetting({ todo, setting, handleClose }: any) {
  const [todoSetting, setTodoSetting] = useState(todo.private);

  return (
    <div className="flex items-center gap-2" onClick={handleClose}>
      <input
        type="radio"
        name="radioOption"
        value={setting.keyword}
        checked={todoSetting === setting.value}
      />
      <span>{setting.keyword}</span>
    </div>
  );
}
