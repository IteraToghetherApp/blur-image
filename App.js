import React, { useState } from 'react';
import {
  BackdropBlur,
  Canvas,
  Fill,
  Image,
  useImage,
  useTouchHandler
} from "@shopify/react-native-skia";

export default function App() {
  return (
    <BlurImageFilter/>
  );
}
const BlurImageFilter = () => {
  const [points, setPoints] = useState([])

  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      const value = { x, y };
      if (!(points.indexOf(value) > -1)) {
        setPoints([...points, value])
        points.push(value)
      }
    },
  });

  const image = useImage(require("./image/img.png"));
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Image
        x={15}
        y={100}
        width={400}
        height={700}
        image={image}
        fit="cover"
      >
      </Image>
      {
        points.map((value) => {
          console.log(value.x + " - " + value.y)
          return (
            <BackdropBlur blur={4}
                          clip={{
                            rect: { x: value.x - 64, y: value.y - 64, width: 128, height: 128 },
                            rx: 128,
                            ry: 128
                          }}>
              <Fill color="rgba(0, 0, 0, 0)"/>
            </BackdropBlur>
          )
        })
      }
    </Canvas>
  );
};