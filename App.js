import React from 'react';
import {
  BackdropBlur,
  Canvas,
  Fill,
  Group,
  Image,
  Skia,
  useImage,
  useTouchHandler
} from "@shopify/react-native-skia";
import { Dimensions } from 'react-native';

const arr = {};

const pathStart = Skia.Path.Make();
pathStart.moveTo(128, 0);
pathStart.lineTo(168, 80);
pathStart.lineTo(256, 93);
pathStart.lineTo(192, 155);
pathStart.lineTo(207, 244);
pathStart.lineTo(128, 202);
pathStart.lineTo(49, 244);
pathStart.lineTo(64, 155);
pathStart.lineTo(0, 93);
pathStart.lineTo(88, 80);
pathStart.lineTo(128, 0);
pathStart.close();

const path = Skia.Path.Make();

export default function App() {
  return (
    <BlurImageFilter/>
  );
}
const { height, width } = Dimensions.get('window');

const BlurImageFilter = () => {
  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {

      const strval = `${Math.floor(x)}_${Math.floor(y)}`;
      if (!arr[strval]) {
        path.addCircle(Math.floor(x), Math.floor(y), 40)
        arr[strval] = true;
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
        x={0}
        y={0}
        width={width}
        height={height}
        image={image}
        fit="cover"
      >
      </Image>
      <Group>

        <BackdropBlur key={1}
                      blur={30}
                      clip={path}>
          <Fill color="rgba(0, 0, 0, 0)"/>
        </BackdropBlur>
      </Group>
    </Canvas>
  );
};