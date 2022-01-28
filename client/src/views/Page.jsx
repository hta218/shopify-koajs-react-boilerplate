import { Router } from "@reach/router";
import { Layout, Page } from '@shopify/polaris';
import { useState } from "react";
import NotFound from './404';
import Dashboard from './Dashboard';
import Install from './Install';
import Products from './Products';


const PageMarkup = ({ isAuth }) => {
	const [title, setTitle] = useState('Shopify Koa.js React App')

	return (
		<Page title={title}>
			<Layout>
				<Layout.Section>
					<Router>
						<Dashboard path="/" isAuth={isAuth} setTitle={setTitle} />
						<Install path="/install" setTitle={setTitle} />
						<Products path="/products" setTitle={setTitle} />
						<NotFound default setTitle={setTitle} />
					</Router>
				</Layout.Section>
			</Layout>
		</Page>
	)
}

export default PageMarkup
