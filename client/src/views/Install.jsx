import { Banner, Button, Form, FormLayout, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const Install = ({ setTitle }) => {
	setTitle('Install')
	const [url, setUrl] = useState('');
	const handleUrlChange = useCallback((value) => setUrl(value), []);
	const handleSubmit = useCallback((_event) => {
		_event.target.submit()
	}, []);

	return (
		<div>
			<Banner title="HTTPS is required" onDismiss={() => { }}>
				<p>Shopify OAuth require HTTPS. Try config HTTPS in your local development or using {' '}
					<Button url="https://ngrok.com/" plain external={true}>ngrok</Button>
				</p>
			</Banner>
			<div style={{ paddingTop: '1.6rem' }}>
				<Form noValidate action="/auth" method="get" onSubmit={handleSubmit}>
					<FormLayout>
						<TextField
							value={url}
							onChange={handleUrlChange}
							type="url"
							name="shop"
							label="Shop domain"
							placeholder="your-store.myshopify.com"
						/>
						<Button submit primary>Install App</Button>
					</FormLayout>
				</Form>
			</div>
		</div>
	)
}

export default Install
