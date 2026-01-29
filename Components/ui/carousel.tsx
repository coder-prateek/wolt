import React from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const renderItem = ({ rounded }: { rounded: boolean }) => {
    // eslint-disable-next-line react/display-name
    return ({ item, index }: { item: { image: string, title: string, description: string }; index: number }) => (
        <View
            className=' items-center justify-center  '
        >
            {/* <Image source={{ uri: item.image }} className={rounded ? 'rounded-lg' : ''} /> */}
            <ImageBackground
                source={{ uri: item.image }}
                // style={styles.background}
                resizeMode="cover"
                className='  items-end justify-center bg-cover w-full  h-full   '

            >
                <Text className='text-White text-2xl text-gray-200 font-bold px-3'> {item.title}</Text>
                <Text className='text-gray-300 font-semibold px-3'> {item.description}</Text>
            </ImageBackground>


        </View >
    );
};


const CarouselItem = ({
    items,

}: {
    items: any[]
}) => {
    const progress = useSharedValue<number>(0);
    const ref = React.useRef<ICarouselInstance>(null);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };
    return (
        <View >
            <View
                id="carousel-component"
            >
                <Carousel
                    width={Dimensions.get('window').width}
                    height={250}
                    autoPlayInterval={2000}
                    autoPlay={true}
                    data={items}
                    loop={true}
                    pagingEnabled={true}
                    snapEnabled={true}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    onProgressChange={(offsetProgress, absoluteProgress) => {
                        progress.value = absoluteProgress;
                    }}
                    renderItem={renderItem({ rounded: true })}
                />
            </View>
            <Pagination.Basic
                progress={progress}
                data={items}
                dotStyle={{ backgroundColor: "#262626", borderRadius: 100, transform: [{ scale: 1.4 }], marginHorizontal: 5 }}
                activeDotStyle={{ backgroundColor: "#f1f1f1", borderRadius: 100, transform: [{ scale: 1.4 }] }}
                containerStyle={{ gap: 5, marginBottom: 10, }}
                onPress={onPressPagination}

            />

        </View>
    )
}

export default CarouselItem