import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { COLORS } from '../constants/theme';
import Menu from '../screens/Restaurant/Menu';
import Directions from '../screens/Restaurant/Directions';
import New from '../screens/Restaurant/New';
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
    third: New
});

const RestaurantPage = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Menu' },
        { key: 'second', title: 'Directions' },
        { key: 'third', title: 'New' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}

export default RestaurantPage