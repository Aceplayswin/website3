import ResponsibleGambling from '../sidebar-components/legal-complience/ResponsibleGambling'
import RanaHeader from '../home/ranamatch/RanaHeader'
import '../../assets/css/ranamatch.css';

function ResponsibleGamblingPage() {
  return (
    <div className="rana-layout legal-route-shell min-h-screen">
      <RanaHeader />
      <main className="legal-route-main">
        <ResponsibleGambling />
      </main>
    </div>
  )
}

export default ResponsibleGamblingPage

//Aceplayswin@gmail.com
