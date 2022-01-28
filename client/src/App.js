import { AppProvider, Frame, Loading } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import NavigationMarkup from "./components/NavigationMarkup";
import TopbarMarkup from "./components/TopbarMarkup";
import { i18n, theme } from "./utils";
import PageMarkup from "./views/Page";
import Skeleton from "./components/Skeleton"

function App() {
	const [isFetching, setIsFetching] = useState(true);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		fetch('/api/credentials')
			.then(async res => {
				const data = await res.json()
				if (data.ok) {
					localStorage.setItem('_shopDomain', data?.payload?.shop)
					setIsAuth(true)
				}
			})
			.catch(err => {
				console.error('hehe', err)
			})
			.finally(() => {
				setTimeout(() => {
					setIsFetching(false)
				}, 1000)
			})
	}, [])

	return (
		<AppProvider theme={theme} i18n={i18n}>
			<Frame
				topBar={<TopbarMarkup />}
				navigation={<NavigationMarkup />}
			>
				{isFetching ? <Loading /> : null}
				{isFetching ? <Skeleton /> : <PageMarkup isAuth={isAuth} />}
			</Frame>
		</AppProvider>
	);
}

export default App;
