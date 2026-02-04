import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'

const ReccomendedItem = () => {
    const recommendedDishes = [
        {
            id: 1,
            title: "Summer Berry Salad",
            description: "Fresh berries with greens and vinaigrette dressing Fresh berries with greens and vinaigrette dressing",
            price: "$8.99",
            category: "starter",
            isCustomizable: true,
            image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=928",
        },
        {
            id: 2,
            title: "Tomato Basil Soup",
            description: "Classic Italian soup.",
            price: "$5.99",
            category: "starter",
            isCustomizable: true,
            image: "https://images.unsplash.com/photo-1620791144170-8a443bf37a33?q=80&w=928",
        },
        {
            id: 3,
            title: "Bruschetta",
            description: "Grilled bread with tomato mix.",
            price: "$6.49",
            category: "starter",
            image: "https://images.unsplash.com/photo-1626634896715-88334e9da24f?q=80&w=1470",
        },
        {
            id: 4,
            title: "Spring Rolls",
            description: "Crispy veggie rolls.",
            price: "$6.99",
            category: "starter",
            image: "https://images.unsplash.com/photo-1676300187437-f09c6397a959?q=80&w=1470",
        },
        {
            id: 5,
            title: "Garlic Mushrooms",
            description: "Sautéed mushrooms in garlic.",
            price: "$7.49",
            category: "starter",
            image: "https://images.unsplash.com/photo-1730043033919-46bd6332f302?q=80&w=1374",
        },

    ]

    return (

        <View>
            <Text className='mt-6 px-4 text-2xl font-semibold mb-4'>Recommended Dishes</Text>
            <View className='px-4 flex-row flex-wrap justify-between'>
                {recommendedDishes.map((item) => (
                    <View key={item.id} className="bg-white rounded-xl shadow-md w-[48%] mb-4 overflow-hidden">
                        <ImageBackground
                            source={{ uri: item.image }}
                            className="w-full h-36"
                            resizeMode="cover"
                        >
                            <LinearGradient
                                colors={["transparent", "rgba(0,0,0,0.7)"]}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 80,
                                    justifyContent: "flex-end",
                                    paddingHorizontal: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                <Text className="text-white font-semibold text-base" numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text className="text-white/90 text-sm" numberOfLines={1}>
                                    {item.price}
                                </Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                ))}
            </View>
        </View>

    )
}

export default ReccomendedItem