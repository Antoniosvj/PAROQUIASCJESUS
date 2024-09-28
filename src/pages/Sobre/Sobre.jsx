import { Comunidades } from  "../../components/index";

import foto from "../../assets/images/paroquia.png";
import foto1 from "../../assets/images/image.png";
import foto2 from "../../assets/images/passionista.gif";

import style from "./Sobre.module.css";

const Sobre = () => {
  return (
    <div className={style.Sobre}>
      <h1>Paróquia Sagrado Coração de Jesus</h1>
      <div className={style.containerSobre}>
        <img src={foto} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
          corporis minima reprehenderit pariatur ipsum deserunt, commodi quasi
          esse, maiores perspiciatis officia ea quae nostrum, expedita numquam
          molestias animi facere doloribus autem? Vero eveniet error voluptatem
          nam, asperiores animi dolores ut distinctio adipisci exercitationem
          repellat beatae reiciendis doloremque ipsam. Veniam iusto sint
          deserunt in, nam unde eum molestias sapiente nemo aut dolor expedita
          laboriosam officia, sed mollitia fugit vel accusamus at earum,
          cupiditate delectus temporibus. Nobis laudantium vitae ipsum
          voluptatibus velit tempora dolorem consectetur voluptates optio rerum
          veritatis, ea reprehenderit ab nulla odit atque quisquam mollitia
          minus unde animi? Deserunt quas facilis ducimus placeat beatae ad
          aperiam exercitationem. Natus, doloremque distinctio, voluptatem enim
          repudiandae suscipit necessitatibus unde delectus ad dolores voluptas?
          Repudiandae esse provident delectus, eos est suscipit? Explicabo iusto
          maxime adipisci ut quisquam! Ipsum ea explicabo illo, voluptates
          sapiente harum. Atque eius laboriosam dolores minima sint assumenda,
          quam voluptate, ducimus, incidunt exercitationem cupiditate nesciunt
          voluptas obcaecati corporis eligendi reprehenderit dignissimos at
          cumque quo ut non. Commodi aperiam necessitatibus laborum nesciunt,
          laudantium ipsam incidunt beatae corrupti rerum autem veritatis
          dolores placeat voluptate, sequi aut error perspiciatis quae. Fugiat
          laborum cum molestias eius adipisci saepe enim vel soluta, eveniet
          dolores sint porro commodi neque doloremque consequatur totam magnam
          tempora iusto doloribus fugit rerum mollitia numquam sed. Dolorem
          totam tenetur tempora atque sit odit aspernatur. Reiciendis ratione ad
          laudantium? Asperiores corrupti nemo ipsum sed dignissimos alias,
          deleniti eligendi. Quaerat at, incidunt iusto labore voluptates
          facilis. Quam ipsa similique, natus rerum omnis provident architecto.
        </p>
        <img src={foto1} alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
          suscipit numquam eos qui modi! Reprehenderit nihil sunt culpa nam
          eaque, laborum magnam corporis? Veniam tempora ut ducimus incidunt
          itaque amet nisi doloremque praesentium, reiciendis porro consequatur
          aliquam debitis libero delectus. Dignissimos eos, ad, quis debitis
          tenetur accusantium deleniti vel consequatur suscipit rem enim eum
          beatae praesentium atque cumque, cum aut. Reiciendis quisquam, debitis
          hic eligendi quia ab maiores reprehenderit ea consectetur voluptate
          quis corrupti temporibus numquam quaerat iste, vero accusamus
          consequatur quibusdam, perspiciatis veniam corporis maxime molestiae
          quam accusantium. Voluptatem dicta debitis nemo eius consectetur
          sapiente maiores minus nihil, illum beatae repellat eligendi
          consequuntur non perspiciatis quae numquam ipsa ad incidunt provident
          vero eveniet maxime, facere hic error! Odio tempore officia,
          temporibus nostrum itaque voluptatibus velit perferendis saepe aliquam
          perspiciatis amet non similique quia eius debitis enim sequi assumenda
          cum sint repudiandae quaerat! Nemo soluta officiis mollitia magni,
          neque aspernatur, labore quae incidunt eveniet id velit enim autem.
          Quas aliquam nemo repellat ratione asperiores suscipit iusto.
          Accusantium, neque laborum! Error odio facere facilis eum quod
          laudantium tempore labore mollitia laboriosam quis odit, commodi
          voluptates tempora reiciendis voluptatem deleniti quas dolore
          explicabo quisquam soluta. Excepturi saepe dicta voluptas vel fugiat a
          ea reprehenderit delectus eius aliquid praesentium, ipsa vero nisi
          fuga autem! Autem pariatur tenetur voluptas culpa accusantium vel,
          odit, corrupti eaque est repellat repellendus at, dignissimos quae
          aliquid. Impedit voluptate sed veritatis fugit alias dolore totam quos
          obcaecati. Odit magni accusantium ipsum alias quisquam similique est
          voluptas sed eligendi blanditiis!
        </p>
        <img src={foto2} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, enim! Veritatis ratione nesciunt dolore maxime voluptas. Delectus ab, iure asperiores exercitationem ducimus sunt nam natus enim maiores quia aut, vel culpa ipsam unde non dolore fugit vero eius recusandae in eos! Veritatis, voluptates. Maxime nostrum pariatur, perferendis eos totam aliquam praesentium quae reiciendis, explicabo at itaque iusto, minus facere mollitia quas? Eveniet non laborum similique eos quas aut saepe unde quisquam alias omnis! Voluptatibus minima quidem quod similique esse voluptas fuga maiores facere molestias quia corrupti illum deleniti, blanditiis officia repellendus necessitatibus autem dolorum sequi impedit odit rerum. Ipsam, maxime.</p>
      </div>
      <section className={style.Padres}>
        <div>
          <h3>Pároco:</h3>
          <p>Padre Adilson Santana do Carmo, CP</p>
        </div>
        <div>
          <h3>Vigários:</h3>
          <p>Padre Roberto Luíz Ferreira, CP</p>
          <p>Padre Victor Franco Soares, CP</p>
        </div>
      </section>
      <Comunidades />
    </div>
  );
};

export { Sobre };
