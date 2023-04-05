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
import React from "react";
import { Dimensions } from "react-native";

const arr = {};
const path = Skia.Path.Make();
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

  const image = useImage(require("../../../image/img.png"));
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
}

export default BlurImageFilter;