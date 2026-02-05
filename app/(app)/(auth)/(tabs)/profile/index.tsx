
import useUserStore from '@/hooks/use-userstore';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Page = () => {
    const { setIsGuest } = useUserStore();
    const onLogout = () => {
        console.log('logout');
        setIsGuest(false);
    };
    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' className='flex-1 '>
            <TouchableOpacity style={{
                backgroundColor: 'red',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16,
            }} onPress={onLogout}>
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                }}>Sign out</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Page