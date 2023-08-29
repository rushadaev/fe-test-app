import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import ApolloClient from './apolloClient';
import App from './App.vue';

const app = createApp({
    setup() {
        provide(DefaultApolloClient, ApolloClient);
    },
    render: () => h(App),
});

app.mount('#app');