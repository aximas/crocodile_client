import styles from "./../../styles/Canvas.module.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type PaintCoords = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

type CanvasProps = {
  onPaint: (data: PaintCoords) => void;
  onInit: (ref: CanvasRenderingContext2D) => void;
  onClear: () => void;
};

export const Canvas: React.FC<CanvasProps> = function Canvas({
  onPaint,
  onInit,
  onClear,
}) {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.width = 600;
      rootRef.current.height = 600;
      const ctx = rootRef.current.getContext("2d");

      if (ctx) {
        onInit(ctx);
        ctx.lineCap = "round";
        ctx.lineWidth = 8;
        ctx.strokeStyle = "red";

        const drawPath = (e: MouseEvent) => {
          let x = e.offsetX;
          let y = e.offsetY;
          let dx = e.movementX;
          let dy = e.movementY;

          if (e.buttons > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - dx, y - dy);
            ctx.stroke();
            ctx.closePath();

            onPaint({ x, dx, dy, y });
          }
        };

        rootRef.current.addEventListener("mousemove", drawPath);
      }
    }
  }, []);
  const handleClickClear = () => {
    onClear();
    if (rootRef.current) {
      const ctx = rootRef.current.getContext("2d");
      ctx?.clearRect(0, 0, 600, 600);
    }
  };
  return (
    <div className={styles.rootWrapper}>
      <h3>Draw here</h3>
      <canvas ref={rootRef} className={styles.root} />
      <button onClick={handleClickClear} className={styles.btn}>
        Clear
      </button>
    </div>
  );
};
