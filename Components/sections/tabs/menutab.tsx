import AddButton from '@/Components/ui/Buttons/add-button';
import Tabs from '@/Components/ui/tabs';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
type TabKey = 'starter' | 'main' | 'Desert' | 'drinks' | 'specials' | 'sides';

// Reusable Menu Item component
const MenuItem = ({ item }: { item: { title: string; description: string; price: string; category: string; image: string; isCustomizable?: boolean } }) => {

    const router = useRouter()

    return (
        <View className='px-2 py-2 bg-white rounded-lg shadow-md h-42 m-2'>
            <Pressable className='flex-row items-start justify-center gap-2' onPress={() => router.push(`/(modal)/(dish)/${item.title}` as any)}>
                <Image source={{ uri: item.image }} className='h-full aspect-square shrink-0 rounded-xl' resizeMode="cover" />
                <View className='flex-col justify-between flex-1 h-full'>
                    <View className='items-start justify-center mb-2'>
                        <Text className='text-xl font-bold'>{item.title}</Text>
                        <Text
                            className="text-gray-600 pr-6 text-md"
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>
                    </View>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-md text-primary'>{item.price}</Text>

                        <AddButton item={item} resturent={null} />
                    </View>
                </View>
            </Pressable>
        </View>
    )

}


const TabContent = ({ tab, menu }: { tab: TabKey, menu: { title: string, description: string, price: string, category: string, image: string, isCustomizable?: boolean }[] }) => {
    // Filter menu items by category
    const filteredMenu = menu.filter(item => item.category.toLowerCase() === tab.toLowerCase());

    switch (tab) {
        case 'starter':
        case 'main':
        case 'Desert':
            return (
                <View>
                    {filteredMenu.map((item, index) => (
                        <MenuItem key={`${tab}-${index}`} item={item} />
                    ))}
                </View>
            );
        case 'drinks':
            return <View><Text>Drinks Menu</Text></View>;
        case 'specials':
            return <View><Text>Specials Menu</Text></View>;
        case 'sides':
            return <View><Text>Sides Menu</Text></View>;
        default:
            return null;
    }
}




const Menutab = () => {
    const [activeTab, setActiveTab] = React.useState<TabKey>('starter');

    const Menues = [
        // ================= STARTER =================
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
        {
            id: 6,
            title: "Paneer Tikka",
            description: "Grilled cottage cheese cubes.",
            price: "$8.49",
            category: "starter",
            image: "https://images.unsplash.com/photo-1626634896715-88334e9da24f?q=80&w=1470",
        },
        {
            id: 7,
            title: "Chicken Wings",
            description: "Spicy baked wings.",
            price: "$9.49",
            category: "starter",
            isCustomizable: true,
            image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=928",
        },
        {
            id: 8,
            title: "Cheese Balls",
            description: "Fried cheese bites.",
            price: "$6.99",
            category: "starter",
            image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=928",
        },
        {
            id: 9,
            title: "Corn Chaat",
            description: "Sweet & spicy corn mix.",
            price: "$5.49",
            category: "starter",
            image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=928",
        },
        {
            id: 10,
            title: "Nachos",
            description: "Nachos with cheese dip.",
            price: "$7.99",
            category: "starter",
            isCustomizable: true,
            image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=928",
        },

        // ================= MAIN =================
        {
            id: 11,
            title: "Grilled Chicken Steak",
            description: "Juicy grilled chicken.",
            price: "$14.99",
            category: "main",
            image: "https://source.unsplash.com/400x400/?grilled-chicken",
        },
        {
            id: 12,
            title: "Butter Chicken",
            description: "Creamy tomato gravy.",
            price: "$13.49",
            category: "main",
            image: "https://source.unsplash.com/400x400/?butter-chicken",
        },
        {
            id: 13,
            title: "Paneer Butter Masala",
            description: "Rich paneer curry.",
            price: "$12.99",
            category: "main",
            image: "https://source.unsplash.com/400x400/?paneer-curry",
        },
        {
            id: 14,
            title: "Veg Biryani",
            description: "Aromatic rice dish.",
            price: "$11.99",
            category: "main",
            image: "https://source.unsplash.com/400x400/?veg-biryani",
        },
        {
            id: 15,
            title: "Chicken Biryani",
            description: "Spiced basmati rice.",
            price: "$13.99",
            category: "main",
            image: "https://source.unsplash.com/400x400/?chicken-biryani",
        },
        {
            id: 16,
            title: "Pasta Alfredo",
            description: "Creamy Alfredo pasta.",
            price: "$10.99",
            category: "main",
            image: "https://source.unsplash.com/400x400/?alfredo-pasta",
        },
        {
            id: 17,
            title: "Lasagna",
            description: "Cheesy layered pasta.",
            price: "$12.49",
            category: "main",
            image: "https://source.unsplash.com/400x400/?lasagna",
        },
        {
            id: 18,
            title: "Veg Burger",
            description: "Loaded veggie burger.",
            price: "$9.49",
            category: "main",
            image: "https://source.unsplash.com/400x400/?veg-burger",
        },
        {
            id: 19,
            title: "Chicken Burger",
            description: "Crispy chicken patty.",
            price: "$10.49",
            category: "main",
            image: "https://source.unsplash.com/400x400/?chicken-burger",
        },
        {
            id: 20,
            title: "Fish Curry",
            description: "Spicy coastal curry.",
            price: "$14.49",
            category: "main",
            image: "https://source.unsplash.com/400x400/?fish-curry",
        },

        // ================= DESSERT =================
        {
            id: 21,
            title: "Chocolate Lava Cake",
            description: "Molten chocolate cake.",
            price: "$6.99",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?chocolate-dessert",
        },
        {
            id: 22,
            title: "Vanilla Ice Cream",
            description: "Classic vanilla scoop.",
            price: "$3.99",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?vanilla-ice-cream",
        },
        {
            id: 23,
            title: "Brownie",
            description: "Fudgy chocolate brownie.",
            price: "$4.49",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?brownie",
        },
        {
            id: 24,
            title: "Cheesecake",
            description: "Creamy baked cheesecake.",
            price: "$5.99",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?cheesecake",
        },
        {
            id: 25,
            title: "Gulab Jamun",
            description: "Soft milk dumplings.",
            price: "$3.49",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?gulab-jamun",
        },
        {
            id: 26,
            title: "Rasmalai",
            description: "Soft paneer in milk.",
            price: "$4.99",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?rasmalai",
        },
        {
            id: 27,
            title: "Fruit Custard",
            description: "Mixed fruits in custard.",
            price: "$4.49",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?fruit-dessert",
        },
        {
            id: 28,
            title: "Ice Cream Sundae",
            description: "Ice cream with toppings.",
            price: "$5.49",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?ice-cream-sundae",
        },
        {
            id: 29,
            title: "Waffles",
            description: "Crispy waffles & syrup.",
            price: "$6.49",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?waffles",
        },
        {
            id: 30,
            title: "Apple Pie",
            description: "Warm apple pie.",
            price: "$5.99",
            category: "desert",
            image: "https://source.unsplash.com/400x400/?apple-pie",
        },
    ];







    return (
        <Tabs<TabKey>
            tabs={[
                { key: 'starter', label: 'Starter', },
                { key: 'main', label: 'Main' },
                { key: 'Desert', label: 'Desert' },
                { key: 'drinks', label: 'Drinks' },
                { key: 'specials', label: 'Specials' },
                { key: 'sides', label: 'Sides' },

            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            scrollable
            showsScrollIndicator={false}
            tabBarPosition="top"
            animated
            animationDuration={200}
            tabBarClassName="gap-2"
            tabBarStyle={{
                // paddingVertical: 6,
            }}
            tabStyle={{
                borderRadius: 0,
                borderWidth: 1,
                borderColor: '#f95555',
                backgroundColor: '#fff',
                borderBottomLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 6,
            }}
            activeTabStyle={{

                backgroundColor: '#f95555',
                shadowOpacity: 0.5,
                shadowRadius: 6,
            }}


            tabTextStyle={{
                letterSpacing: 0.3,
                color: '#000',
            }}

            activeTabTextStyle={{
                color: '#fff',
            }}

            contentStyle={{
                borderWidth: 1,
                borderColor: "transparent",

            }}

        >

            {(tab) => {
                return (
                    <>

                        <View className='flex-row items-center justify-between px-2 py-2 border-b border-gray-200 '>
                            <Pressable className='bg-white flex-row items-center justify-center px-4 py-2 gap-2 rounded-lg' >
                                <Text className='text-lg font-medium'>Sort : Popular</Text>
                                <Ionicons name="chevron-down" size={16} color="#000" />
                            </Pressable>
                            <Pressable className='bg-white flex-row items-center justify-center px-4 py-2 gap-2 rounded-lg'>
                                <Text className='text-lg font-medium '>Vegan
                                </Text>
                                <Ionicons name="leaf" size={16} color="#000" />
                            </Pressable>
                            <Pressable className='bg-white flex-row items-center justify-center px-4 py-2 gap-2 rounded-lg'>
                                <Text className='text-lg font-medium'>price </Text>
                                <Ionicons name="filter" size={16} color="#000" />
                            </Pressable>
                        </View>
                        <TabContent tab={tab} menu={Menues} />
                    </>

                )
            }}



        </Tabs>
    )
}

export default Menutab