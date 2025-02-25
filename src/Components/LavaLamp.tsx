import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LavaLampBackground = () => {
  const path1 = useSharedValue("M0,300 Q150,150 300,300 T600,300 V600 H0 Z");
  const path2 = "M0,300 Q150,450 300,300 T600,300 V600 H0 Z";

  useEffect(() => {
    const animate = () => {
      path1.value = withTiming(path1.value === path2 ? path1 : path2, {
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
      });
    };

    const interval = setInterval(animate, 4000);
    return () => clearInterval(interval);
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    d: path1.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 600 600">
        <AnimatedPath animatedProps={animatedProps} fill="#ff4081" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default LavaLampBackground;
