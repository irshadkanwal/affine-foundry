import React from 'react'
import {
  ActiveDataPackagesCard,
  DataInventoryStatusCard,
  DataHealthCard,
  RuntimeClusterCard,
  IngestionCard,
  DataCard,
} from './Cards'
import './_landing-page.scss'

function LandingPage() {
  return (
    <div className='landing-page-card-container'>
      <div className='landing-page-top-cards'>
        <IngestionCard className={'card_sla'} />
        <div className='top_combined_cards'>
          <ActiveDataPackagesCard />
          <RuntimeClusterCard />
        </div>
        <DataCard />
      </div>
      <div className='landing-page-bottom-cards'>
        <DataInventoryStatusCard className='card_inventory' />
        <DataHealthCard className='card_health' />
      </div>
    </div>
  )
}

export default LandingPage
