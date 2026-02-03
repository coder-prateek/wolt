import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SortingAndFiltering: FC<
    {
        menuTitle?: string
        options?: Record<string, any>
    }
> = ({
    menuTitle,
    options
}) => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.filterBar}>
                <TouchableOpacity
                    style={{ padding: 8, borderRadius: 20, backgroundColor: 'lightgray' }}
                >
                    <View style={{
                        transform: [{ rotate: '90deg' }],
                    }}>
                        <MaterialCommunityIcons name='tune-vertical-variant' size={16} />

                    </View>


                    <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: '500' }}>
                        {menuTitle || 'Sort & Filter'}
                    </Text>

                    <Ionicons name="chevron-down" size={16} style={{ marginLeft: 4 }} />
                </TouchableOpacity>


                {
                    options?.map((i: string, index: number) => {
                        return (
                            <TouchableOpacity key={index} style={style.filterItem}>
                                <Text className='' style={{
                                    fontSize: 11,
                                }}>
                                    {i}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    }

export default SortingAndFiltering

const style = StyleSheet.create({


    filterBar: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        elevation: 5,
        shadowRadius: 1.5,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "lightgray",
        borderColor: "#f95555",
        borderWidth: 1,
        marginRight: 10
    }
})