import { useLocation } from 'react-router-dom';
import { Comunidade } from '../../components';

const ComunidadePage = () => {

    const location = useLocation();
    const { id } = location.state || {};
    return (
        <div>
            <Comunidade nomeComunidade={id} />
        </div>
    );
};

export { ComunidadePage };