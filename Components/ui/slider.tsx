import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    scrollTo,
    useAnimatedRef,
    useDerivedValue,
    useSharedValue,
} from 'react-native-reanimated';

const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 5;

export default function Slider({ item }: {
    item: any[],

}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scroll = useSharedValue<number>(0);

    useDerivedValue(() => {
        // highlight-start
        scrollTo(
            animatedRef,
            0,
            scroll.value * (ITEM_SIZE + 2 * ITEM_MARGIN),
            true
        );
    });

    const items = Array.from(Array(ITEM_COUNT).keys());

    return (
        <View style={styles.container}>
            {/* <Incrementor increment={-1} scroll={scroll} /> */}
            <View style={styles.boxWrapper}>
                <Animated.ScrollView ref={animatedRef} horizontal showsHorizontalScrollIndicator={false} >
                    {item.map((foodItem, i) => (
                        <TouchableOpacity key={i} className='items-center' onPress={() => setSelectedIndex(i)}>

                            <View style={styles.box} className='bg-gray-300' >
                                <Image source={{ uri: foodItem.image }} style={{ width: 50, height: 50, marginBottom: 5 }} />

                            </View>
                            <Text key={i} style={selectedIndex === i ? { color: 'black' } : { color: 'white' }} className='capitalize '>{foodItem.name}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </View>
            {/* <Incrementor increment={1} scroll={scroll} /> */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: ITEM_SIZE - 10,
        height: ITEM_SIZE - 10,
        margin: ITEM_MARGIN,
        borderRadius: ITEM_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxWrapper: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
});
