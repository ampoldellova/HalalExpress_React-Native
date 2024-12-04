import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS } from '../constants/theme';
import Menu from '../screens/Restaurant/Menu';
import Directions from '../screens/Restaurant/Directions';
import Info from '../screens/Restaurant/Info';
import 'react-native-gesture-handler';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }} />
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }} />
);


const renderScene = SceneMap({
    first: Menu,
    second: Directions,
    third: Info
});

const RestaurantPage = ({ item }) => {
    const layout = useWindowDimensions();
    console.log(item)
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Menu' },
        { key: 'second', title: 'Directions' },
        { key: 'third', title: 'Info' },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.lightWhite }}
            style={{ backgroundColor: COLORS.primary }}
            labelStyle={{ fontWeight: 'bold' }}
            activeColor={COLORS.secondary}
            inactiveColor={COLORS.lightWhite}
        />
    );

    return (
        <TabView
            indicat
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
}

export default RestaurantPage