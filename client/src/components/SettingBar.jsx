import React from "react";
import toolState from "../store/toolState";

const SettingBar = () => {
  return (
    <div className="settingbar">
      <label htmlFor="line-width">Line width</label>
      <select
        id="line-width"
        onChange={(e) => toolState.setLineWidth(Number(e.target.value))}
        defaultValue={1}
        style={{ margin: "0 10px" }}
      >
        {Array.from({ length: 50 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <label htmlFor="stroke-color">Stroke color</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        id="stroke-color"
        type="color"
      />
    </div>
  );
};

export default SettingBar;
