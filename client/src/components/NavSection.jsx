import React from 'react'
import { Icon, Button } from "@shopify/polaris"
import { Location, navigate } from "@reach/router"

const NavSection = ({ items, fill, title, separator }) => {

	let classes = []
	if (separator) classes.push('Polaris-Navigation__Section--withSeparator')
	if (fill) classes.push('Polaris-Navigation__Section--fill')
	return (
		<Location>
			{({ location }) => {
				let { pathname, search } = location
				pathname += search
				return (
					<ul className={`Polaris-Navigation__Section ${classes.join(' ')}`}>
						{
							title ?
								<li className="Polaris-Navigation__SectionHeading">
									<span className="Polaris-Navigation__Text">{title}</span>
								</li> : null
						}
						{items.map((item, i) => {
							let selected, active = false
							selected = pathname === item.url
							if (item?.subNavigationItems?.length > 0) {
								selected = false
							}
							if (item?.subNavigationItems?.length > 0 && selected) active = true

							item?.subNavigationItems?.forEach(childItem => {
								if (pathname.includes(childItem.url)) {
									active = true
								}
							})

							return (
								<li key={i} className="Polaris-Navigation__ListItem">
									<button
										className={`Polaris-Navigation__Item ${selected ? 'Polaris-Navigation__Item--selected' : ''}`}
										onClick={() => navigate(item.url)}
									>
										{
											item.icon ? (
												<div className="Polaris-Navigation__Icon">
													<Icon source={item.icon} />
												</div>
											) : null
										}
										<span className="Polaris-Navigation__Text">{item.label}</span>
										{
											item.badge ? (
												<div className="Polaris-Navigation__Badge"><span
													className="Polaris-Badge Polaris-Badge--statusNew Polaris-Badge--sizeSmall"><span
														className="Polaris-Badge__Content">{item.badge}</span></span>
												</div>
											) : null
										}
									</button>
									{
										item.secondaryAction ? (
											<div className="secondaryAction">
												<Button
													external
													plain
													url={item.secondaryAction.url && item.secondaryAction.url}
													icon={item.secondaryAction.icon && item.secondaryAction.icon}
												>
													{item.secondaryAction.label && item.secondaryAction.label}
												</Button>
											</div>
										) : null
									}
									{
										active ? (
											<div className="Polaris-Navigation__SecondaryNavigation">
												<div
													className="Polaris-Collapsible Polaris-Collapsible--open Polaris-Collapsible--fullyOpen"
													style={{ maxHeight: 'inherit' }}
												>
													<div>
														<ul className="Polaris-Navigation__List">
															{item.subNavigationItems.map((child, index) => {
																let childSelected
																if (item.url !== '/') {
																	childSelected = pathname.includes(child.url)
																} else {
																	childSelected = pathname === child.url
																}
																if (pathname.includes('settings') && child.url === '/bundles') childSelected = false
																return (
																	<li
																		key={index}
																		className="Polaris-Navigation__ListItem"
																	>
																		<button
																			className={`Polaris-Navigation__Item ${childSelected ? 'Polaris-Navigation__Item--selected' : ''}`}
																			onClick={() => navigate(child.url)}
																		>
																			<span className="Polaris-Navigation__Text">{child.label}</span>
																		</button>
																	</li>
																)
															})}
														</ul>
													</div>
												</div>
											</div>
										) : null
									}
								</li>
							)
						})}
					</ul>
				)
			}}
		</Location>
	)
}
export default NavSection
