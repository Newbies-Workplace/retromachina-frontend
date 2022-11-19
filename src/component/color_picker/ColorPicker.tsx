import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import styles from './ColorPicker.module.scss'
import useClickOutside from "../../context/useClickOutside";

interface PopoverPickerProps{
    color: string,
    onChange: (color: string) => void,
}

export const ColorPicker: React.FC<PopoverPickerProps> = ({ color , onChange }) => {
  const popover = useRef<any>();
  const [isOpen, toggle] = useState(false);
  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  return (
    <div className={styles.picker}>
      <div
        className={styles.swatch}
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange}/>
        </div>
      )}
    </div>
  );
};

