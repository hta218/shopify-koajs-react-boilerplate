import { TopBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const userMenuActions = [
	{
		items: [{ content: 'Community forums' }],
	},
];

const TopbarMarkup = () => {
	const [searchValue, setSearchValue] = useState('');
	const handleSearchFieldChange = useCallback((value) => {
		setSearchValue(value);
	}, []);

	const userMenuMarkup = (
		<TopBar.UserMenu
			actions={userMenuActions}
			name="Leo"
			initials="L"
			detail="Leo Huynh"
		/>
	);

	const searchFieldMarkup = (
		<TopBar.SearchField
			onChange={handleSearchFieldChange}
			value={searchValue}
			placeholder="Search"
		/>
	);

	return (
		<TopBar
			userMenu={userMenuMarkup}
			searchField={searchFieldMarkup}
		/>
	)
}

export default TopbarMarkup
