
import { SimpleWidget } from '../../../components/SimpleWidget';
import WidgetsGrid from '../../../components/dashboard/WidgetsGrid';


export const metadata = {
  title: 'Pagina principal',
  description: 'Pagina principal',
};

export default function MainPage() {
  return (
    <div className="text-white">
      <h1 className="m-t text-3xl">Dashboard</h1>
      <span className="text-3xl">Informacion General</span>

      <WidgetsGrid />


    </div>
  );
}