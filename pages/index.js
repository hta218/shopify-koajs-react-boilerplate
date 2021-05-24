import { Heading, Page, Button } from "@shopify/polaris";
import { ResourcePicker } from '@shopify/app-bridge-react'
import { useState } from 'react'

const Index = () => {
  const [open, setOpen] = useState(false)
  const handleSelection = (resources) => {
    const ids = resources.selection.map(prod => prod.id)
    console.log('ids', ids)
  }

  return <Page
    title="New page"
    primaryAction={{
      content: 'Select a product',
      onAction: () => setOpen(true)
    }}
  >
    <ResourcePicker
      resourceType='Product'
      open={open}
      onCancel={() => setOpen(false)}
      onSelection={(resources) => handleSelection(resources)}
    />
  </Page>
}

export default Index;
