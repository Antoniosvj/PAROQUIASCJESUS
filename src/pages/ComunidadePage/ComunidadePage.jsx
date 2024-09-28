import { useLocation } from 'react-router-dom';
import { Comunidade } from '../../components';

const ComunidadePage = () => {
    const location = useLocation();
    console.log(location);
    const { nomeComunidade } = location.state || {nomeComunidade: 'Comunidade desconhecida'};

    return (
        <div>
            <Comunidade nomeComunidade={nomeComunidade} />
        </div>
    );
};

export { ComunidadePage };