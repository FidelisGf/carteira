import './Carteira.css'
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
       </section>
  );
}

export default Carteira;