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
            width: 130,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#fff',
            marginVertical: 8,
            boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.2)',
            elevation: 2,
        }}>
            <View className='p-3' style={{ backgroundColor: item.backgroundColor }}>
                <Image source={item.image} style={{ width: 106, height: 106, borderRadius: 8 }} />
            </View>
            <View style={styles.categoryInfo}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 2,
                }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: Colors.muted }}>{item.placesCount} places</Text>
            </View>
        </TouchableOpacity>
    )



    return (
        <View className='mt-4'>
            <View className='items-center justify-between flex-row px-4'>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '600',
                    fontFamily: Fonts.brandBold

                }}>Categories</Text>
                <Buttons className=' bg-primary px-5 py-3 '>
                    <Text
                        className="text-white"
                        style={{ fontSize: 16, fontWeight: "600" }}
                    >
                        See All
                    </Text>

                    <Ionicons name="arrow-forward" size={18} color="#fff" />
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