import { navigate } from '@reach/router';
import { SkeletonBodyText, Banner, Layout, Card, FormLayout, TextField } from '@shopify/polaris';
import { useEffect, useState } from 'react';

function Dashboard({ isAuth, setTitle }) {
	setTitle('Dashboard')
	const [loading, setLoading] = useState(true)
	const [shop, setShop] = useState(null)

	useEffect(() => {
		if (isAuth) {
			fetch('/api/shop')
				.then(async res => {
					const data = await res.json()
					if (data.ok) {
						setShop(data.payload)
					}
				})
				.catch(err => {
					console.log('===> err', err)
				})
				.finally(() => setLoading(false))
		}
	}, [])

	return (
		<div>
			{
				!isAuth ?
					<Banner
						title="Install App"
						action={{ content: 'Go to Install route', onAction: () => navigate('/install') }}
						onDismiss={() => { }}
					>
						<p>Go to install route on the left hand side navigation, Install app then view your store data here.</p>
					</Banner> : <div>
						{
							loading ? <SkeletonBodyText /> : <div>
								<Layout>
									<Layout.Section>
										<Banner title="Store info loaded" status="success">
											<p>Your store was created on {shop.created_at.split('T')[0]}</p>
										</Banner>
									</Layout.Section>
									<Layout.AnnotatedSection
										title="Store details"
										description="Shopify and your customers will use this information to contact you."
									>
										<Card sectioned>
											<FormLayout>
												<TextField label="Store name" value={shop.name} />
												<TextField label="Store owner" value={shop.shop_owner} />
												<TextField label="Currency" value={shop.currency} />
												<TextField label="Address" value={shop.address1} />
												<TextField label="City" value={shop.city} />
											</FormLayout>
										</Card>
									</Layout.AnnotatedSection>
								</Layout>
							</div>
						}
					</div>
			}
		</div>
	);
}

export default Dashboard;
