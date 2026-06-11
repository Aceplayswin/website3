import RanaHeader from "../home/boldvelocity/RanaHeader";
import TransactionPage from "../sidebar-components/statements/TransactionPage";
import '../../assets/css/ranamatch.css';

function Transaction() {
  return (
    <div className="finance-route-shell rana-layout min-h-screen">
      <RanaHeader />
      <main className="finance-route-main">
        <TransactionPage />
      </main>
    </div>
  );
}

export default Transaction;
