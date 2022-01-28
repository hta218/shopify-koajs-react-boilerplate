import { Navigation } from '@shopify/polaris';
import { AppsMajor, ArrowLeftMinor, FlagMajor, HomeMajor, ProductsMajor } from '@shopify/polaris-icons';
import NavSection from './NavSection';

const NavigationMarkup = () => {
	return (
		<Navigation location="/">
			<Navigation.Section
				items={[
					{
						label: 'Back to Shopify',
						icon: ArrowLeftMinor,
					},
				]}
			/>
			<NavSection
				separator
				title="Shopify App"
				items={[
					{
						url: '/',
						label: 'Dashboard',
						icon: HomeMajor,
					},
					{
						url: '/install',
						label: 'Install',
						icon: AppsMajor,
					},
					{
						url: '/products',
						label: 'Products',
						icon: ProductsMajor,
					},
					{
						url: '/undefined-route',
						label: '404',
						icon: FlagMajor,
					},
				]}
			/>
		</Navigation>
	);
}

export default NavigationMarkup
