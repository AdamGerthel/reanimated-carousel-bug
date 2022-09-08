import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {interpolate} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const window = Dimensions.get('window');
const scale = 0.7;
const PAGE_WIDTH = window.width * scale;
const PAGE_HEIGHT = 150 * scale;

export default function CardCarousel() {
  const animationStyle = React.useCallback(value => {
    'worklet';
    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const rotateZ = `${interpolate(value, [-1, 0, 1], [-45, 0, 45])}deg`;
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-window.width, 0, window.width],
    );

    return {
      transform: [{rotateZ}, {translateX}],
      zIndex,
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        style={{
          width: window.width,
          height: 400,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'red',
          overflow: 'visible',
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={[...new Array(6).keys()]}
        renderItem={({index}) => {
          return (
            <View
              style={{
                width: '100%',
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'teal',
              }}
              key={index}
              index={index}>
              <Text>Slide {index + 1}</Text>
            </View>
          );
        }}
        customAnimation={animationStyle}
      />
    </View>
  );
}
