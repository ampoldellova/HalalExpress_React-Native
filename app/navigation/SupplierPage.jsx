import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS } from '../constants/theme';
import 'react-native-gesture-handler';
import Products from '../screens/Supplier/Products';
import Directions from '../screens/Supplier/Directions';
import Info from '../screens/Supplier/Info';

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
    first: Products,
    second: Directions,
    third: Info
});

const SupplierPage = ({ item }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Products' },
        { key: 'second', title: 'Directions' },
        { key: 'third', title: 'Info' },
    ]);

    const renderTabBar = (props) => {
        const { key, ...propsWithoutKey } = props;
        return (
            <TabBar
                key={key}
                {...propsWithoutKey}
                indicatorStyle={{ backgroundColor: COLORS.lightWhite }}
                style={{ backgroundColor: COLORS.primary }}
                labelStyle={{ fontWeight: 'bold' }}
                activeColor={COLORS.secondary}
                inactiveColor={COLORS.lightWhite}
            />
        );
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
}

export default SupplierPage