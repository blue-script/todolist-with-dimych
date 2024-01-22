import {action} from "@storybook/addon-actions";
import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: ReduxStoreProviderDecorator,
}

const changeTaskTitleCallback = action('Title changed')

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />
}