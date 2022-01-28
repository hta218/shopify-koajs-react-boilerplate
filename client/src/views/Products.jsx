import { navigate } from "@reach/router"
import { Banner, Link, Thumbnail, Card, ResourceItem, ResourceList, TextStyle } from "@shopify/polaris"
import { useEffect, useState } from "react"

const Products = ({ setTitle }) => {
	setTitle('Products')
	const initialProducts = [
		{
			node: {
				id: 1,
				productType: "SHOES",
				title: "Awesome Products 1",
			}
		},
		{
			node: {
				id: 2,
				productType: "SHOES",
				title: "Awesome Products 2",
			}
		},
	]
	const [products, setProducts] = useState(initialProducts)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			fetch('/api/shop/product')
				.then(async res => {
					const data = await res.json()
					if (data.ok) {
						const { payload: { products: { edges } } } = data
						setProducts(edges)
					} else if (!data.ok && data.status === 401) {
						setProducts([])
					}
				})
				.catch(err => {
					console.log('===> err', err)
				})
				.finally(() => setLoading(false))
		}, 1000)
	}, [])

	const [selectedItems, setSelectedItems] = useState([]);

	const resourceName = {
		singular: 'product',
		plural: 'products',
	};

	const promotedBulkActions = [
		{
			content: 'Edit products',
			onAction: () => console.log('Todo: implement bulk edit'),
		},
	];

	const bulkActions = [
		{
			content: 'Add tags',
			onAction: () => console.log('Todo: implement bulk add tags'),
		},
		{
			content: 'Remove tags',
			onAction: () => console.log('Todo: implement bulk remove tags'),
		},
	];
	const shop = localStorage.getItem('_shopDomain') || "your-store.myshopify.com"

	return (
		<div>
			{
				products.length === 0 ? <Banner
					title="No products found"
					action={{ content: 'Got it', onAction: () => navigate('/install') }}
					status="info"
					onDismiss={() => { }}
				>
					<p>Make sure you install app before checking this page.</p>
				</Banner> : <Card>
					<ResourceList
						resourceName={resourceName}
						items={products}
						renderItem={renderItem}
						selectedItems={selectedItems}
						onSelectionChange={setSelectedItems}
						promotedBulkActions={promotedBulkActions}
						bulkActions={bulkActions}
						loading={loading}
					/>
				</Card>
			}
		</div>
	);

	function renderItem({ node }) {
		const { id, productType, title, handle, featuredImage } = node;
		const media = <Thumbnail source={featuredImage?.originalSrc} alt={title} />

		return (
			<ResourceItem
				id={id}
				media={media}
				accessibilityLabel={`View details for ${title}`}
			>
				<h3>
					<TextStyle variation="strong">{title}</TextStyle>
				</h3>
				<div>{productType}</div>
				<Link url={`https://${shop}/products/${handle}`} external>
					View product
				</Link>
			</ResourceItem>
		);
	}
}

export default Products
