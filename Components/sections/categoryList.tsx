import { Colors, Fonts } from '@/constants/theme'
import { categories } from '@/data/categories'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Buttons from '../ui/Buttons/button'

const CategoryList = () => {

    const renderItem = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity style={{
            width: 300,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#fff',
            marginVertical: 8,
            boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.2)',

        }}>
            <View className=''>
                <Image source={item.image} className='object-cover items-center h-64 w-78 justify-center' />
            </View>
            <View style={styles.categoryInfo}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 4,

                }}>{item.name}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center'

                }}>

                    <Text style={{ fontSize: 16, color: "#F95555" }}>{item.price} </Text>
                    <Buttons className=' border-primary border px-3 py-1 '>
                        <Text
                            className="text-primary"
                            style={{ fontSize: 16, fontWeight: "600" }}
                        >
                            Add +
                        </Text>


                    </Buttons>
                </View>
            </View>
        </TouchableOpacity>
    )



    return (
        <View >
            <View className='items-center justify-between flex-row px-4 mb-2 '>
                <Text style={{
                    fontSize: 30,
                    fontWeight: '600',
                    fontFamily: Fonts.brandBold

                }}>Popular Dises</Text>
                <Buttons className=' border-primary border px-3 py-1 '>
                    <Text
                        className="text-primary"
                        style={{ fontSize: 16, fontWeight: "600" }}
                    >
                        See All
                    </Text>

                    <Ionicons name="arrow-forward" size={18} color="#F95555" />
                </Buttons>
            </View>

            <FlatList
                data={categories}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                keyExtractor={(item) => item.id.toString()}

            />
        </View>
    )



}


const styles = StyleSheet.create({
    categoryInfo: {
        backgroundColor: '#fff',
        padding: 12,
        paddingTop: 4,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
    }
})
export default CategoryList