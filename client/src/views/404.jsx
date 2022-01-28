import { navigate } from '@reach/router';
import { Card, EmptyState } from '@shopify/polaris';

const NotFound = ({ setTitle }) => {
	setTitle('Not Found')
	return (
		<Card sectioned>
			<EmptyState
				heading="Nothing Here"
				action={{ content: 'Install App', onAction: () => navigate('/install') }}
				image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
			>
				<p>Track and receive your incoming inventory from suppliers.</p>
			</EmptyState>
		</Card>
	)
}

export default NotFound
