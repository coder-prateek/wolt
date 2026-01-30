import { Colors } from '@/constants/theme';
import { cn } from '@/lib/utils';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    Layout,
} from 'react-native-reanimated';

// Types
export interface TabItem<T = string> {
    key: T;
    label: string;
    icon?: React.ReactNode;
    badge?: number | string;
}

export interface TabsProps<T = string> {
    /** Array of tab items */
    tabs: TabItem<T>[];
    /** Currently active tab key */
    activeTab?: T;
    /** Default active tab key (uncontrolled mode) */
    defaultTab?: T;
    /** Callback when tab changes */
    onTabChange?: (tabKey: T) => void;
    /** Content to render for each tab - keyed by tab key */
    children?: React.ReactNode | ((activeTab: T) => React.ReactNode);
    /** Custom styles */

    style?: StyleProp<ViewStyle>;
    tabBarStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    activeTabStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<TextStyle>;
    activeTabTextStyle?: StyleProp<TextStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    /** Tab bar configuration */
    scrollable?: boolean;
    showsScrollIndicator?: boolean;
    tabBarPosition?: 'top' | 'bottom';
    /** Animation configuration */
    animated?: boolean;
    animationDuration?: number;
    /** Accessibility */
    accessibilityLabel?: string;


    /** Custom class names for styling */
    className?: string;
    tabBarClassName?: string;
    tabClassName?: string;
    tabTextClassName?: string;
    activeTabClassName?: string;
    activeTabTextClassName?: string;
    badgeClassName?: string;
    contentClassName?: string;
}

interface TabContentProps {
    children: React.ReactNode;
    animated?: boolean;
    duration?: number;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

// Animated content wrapper
const TabContent: React.FC<TabContentProps> = ({
    children,
    animated = true,
    duration = 200,
    style,
    className,
}) => {
    if (!animated) {
        return <View style={style} className={className}>{children}</View>;
    }

    return (
        <Animated.View
            entering={FadeIn.duration(duration)}
            exiting={FadeOut.duration(duration)}
            layout={Layout.duration(duration)}
            style={style}
            className={cn(className)}
        >
            {children}
        </Animated.View>
    );
};

// Tab Badge component
const TabBadge: React.FC<{
    value: number | string;
    className?: string;
    textClassName?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}> = ({
    value,
    className,
    textClassName,
    style,
    textStyle,
}) => (
        <View style={[styles.badge, style]} className={cn(className)}>
            <Text
                style={[styles.badgeText, textStyle]}
                className={cn(textClassName)}
            >
                {typeof value === 'number' && value > 99 ? '99+' : value}
            </Text>
        </View>
    );

// Individual Tab component
interface TabButtonProps<T> {
    tab: TabItem<T>;
    isActive: boolean;
    onPress: () => void;
    tabStyle?: StyleProp<ViewStyle>;
    activeTabStyle?: StyleProp<ViewStyle>;
    tabTextStyle?: StyleProp<TextStyle>;
    activeTabTextStyle?: StyleProp<TextStyle>;
    className?: string;
    activeClassName?: string;
    activeTextClassName?: string;
    tabClassName?: string;
    tabTextClassName?: string;
    activeTabClassName?: string;
    activeTabTextClassName?: string;
}

function TabButton<T>({
    tab,
    isActive,
    onPress,
    tabStyle,
    activeTabStyle,
    tabTextStyle,
    activeTabTextStyle,
    tabClassName,
    tabTextClassName,
    activeTabClassName,
    activeTabTextClassName,
}: TabButtonProps<T>) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.tab,
                tabStyle,
                isActive && styles.activeTab,
                isActive && activeTabStyle,
            ]}
            className={cn(tabClassName, isActive && activeTabClassName)}
        >
            <View style={styles.tabContent}>
                {tab.icon && <View>{tab.icon}</View>}

                <Animated.Text
                    style={[
                        styles.tabText,
                        tabTextStyle,
                        isActive && styles.activeTabText,
                        isActive && activeTabTextStyle,
                    ]}
                    className={cn(
                        tabTextClassName,
                        isActive && activeTabTextClassName
                    )}
                >
                    {tab.label}
                </Animated.Text>

                {tab.badge !== undefined && <TabBadge value={tab.badge} />}
            </View>
        </Pressable>
    );
}




// Main Tabs component
function Tabs<T extends string = string>({
    tabs,
    activeTab: controlledActiveTab,
    defaultTab,
    onTabChange,
    children,
    tabBarClassName,
    tabClassName,
    activeTabClassName,
    activeTabTextClassName,
    contentClassName,
    style,
    tabBarStyle,
    tabStyle,
    activeTabStyle,
    tabTextStyle,
    activeTabTextStyle,
    className,
    contentStyle,
    scrollable = true,
    showsScrollIndicator = false,
    tabBarPosition = 'top',
    animated = true,
    animationDuration = 200,
    accessibilityLabel = 'Tab navigation',
}: TabsProps<T>) {
    // Handle controlled vs uncontrolled mode
    const [internalActiveTab, setInternalActiveTab] = useState<T>(
        defaultTab ?? tabs[0]?.key
    );

    const activeTabKey = controlledActiveTab ?? internalActiveTab;

    const handleTabPress = useCallback(
        (tabKey: T) => {
            if (controlledActiveTab === undefined) {
                setInternalActiveTab(tabKey);
            }
            onTabChange?.(tabKey);
        },
        [controlledActiveTab, onTabChange]
    );

    const renderTabItem = useCallback(
        ({ item }: { item: TabItem<T> }) => (
            <TabButton
                tab={item}
                isActive={activeTabKey === item.key}
                onPress={() => handleTabPress(item.key)}
                tabStyle={tabStyle}
                activeTabStyle={activeTabStyle}
                tabTextStyle={tabTextStyle}
                activeTabTextStyle={activeTabTextStyle}
                className={tabClassName}
                activeClassName={activeTabClassName}
                activeTextClassName={activeTabTextClassName}
            />
        ),
        [activeTabKey, handleTabPress, tabStyle, activeTabStyle, tabTextStyle, activeTabTextStyle, tabClassName, activeTabClassName, activeTabTextClassName]
    );

    const renderContent = () => {
        if (!children) return null;

        const content =
            typeof children === 'function' ? children(activeTabKey) : children;

        return (
            <TabContent
                animated={animated}
                duration={animationDuration}
                style={[styles.content, contentStyle]}
                className={contentClassName}
                key={activeTabKey}
            >
                {content}
            </TabContent>
        );
    };

    const tabBar = (
        <View
            style={[styles.tabBar, tabBarStyle]}
            accessibilityRole="tablist"
            accessibilityLabel={accessibilityLabel}
        >
            <FlatList
                data={tabs}
                horizontal
                scrollEnabled={scrollable}
                showsHorizontalScrollIndicator={showsScrollIndicator}
                keyExtractor={(item) => String(item.key)}
                renderItem={renderTabItem}
                contentContainerStyle={styles.tabBarContent}
                className={tabBarClassName}
            />
        </View>
    );

    return (
        <View style={[styles.container, style]} className={cn(className)}>
            {tabBarPosition === 'top' && tabBar}
            {renderContent()}
            {tabBarPosition === 'bottom' && tabBar}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        // backgroundColor: Colors.background,
    },
    tabBarContent: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        gap: 8,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        // backgroundColor: Colors.light,
        borderRadius: 20,
        marginRight: 8,
    },
    activeTab: {
        // backgroundColor: "transparent",
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    iconContainer: {
        marginRight: 4,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        // color: Colors.muted,
    },
    activeTabText: {
        // color: Colors.background,
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    badge: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        marginLeft: 4,
    },
    badgeText: {
        color: Colors.background,
        fontSize: 11,
        fontWeight: '700',
    },
});

// Export component and types
export default Tabs;
export { TabBadge, TabButton, TabContent };

