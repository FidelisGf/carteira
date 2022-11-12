import './Carteira.css'
import StickyHeadTable from '../../Components/Table';

function Carteira() {
  return (
       <section id='body-carteira'>
            <div id="heade">
                <div id="corpo-gastos">
                    <p>Gastos : R$</p>
                </div>
                <div>
                    <input type={"button"} value="Adicionar" id='btn-add'></input>
                </div>
            </div>
            <div id="table_div">
                <StickyHeadTable></StickyHeadTable>
            </div>
       </section>
  );
}

export default Carteira;