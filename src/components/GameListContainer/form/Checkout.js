import { useContext, useState } from "react";
import { CartContext } from "../../../context/cartContext";
import "./Checkout.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const Checkout = () => {

    const db = getFirestore();

    const orderCollection = collection(db, "orders");

    const { cart } = useContext(CartContext);

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showIfElse = (condition, componentIfTrue, componentIfFalse = null) => {
        return (condition()) ? componentIfTrue : componentIfFalse;
    };

    const processPurchase = async () => {
        if (document.getElementById('name').value && document.getElementById('phone').value && document.getElementById('email').value !== "") {
            const buyer = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value
            };
            const buyerToSave = {
                buyer: buyer,
                cart: cart,
                total: cart.length
            };

            setIsLoading(true);

            const respuesta = await addDoc(orderCollection, buyerToSave);

            setIsLoading(false);
            setOrder(respuesta.id);

        } else {
            toast("Falta completar un campo");
        }
    };

    const handler = () => {
        processPurchase();
    };

    if (cart.length === 0) {
        return <Navigate to='/cart' />;
    }
    else {
        return (
            <>
                {
                    showIfElse(() => isLoading,
                        <>
                            <h2>
                                Creando su orden
                            </h2>
                        </>
                    )}
                {showIfElse(() => order !== null && !isLoading,
                    <>
                        <h2>Orden creada</h2>
                        <span>El código de orden es <strong>{order}</strong>.</span>

                    </>
                )}
                {showIfElse(() => order === null && !isLoading,
                    <fieldset className="fieldset-contact">
                        <legend>Contactenos</legend>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-sm" id="name" type="text" placeholder="Nombre" aria-label=".form-control-sm example" required></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-sm" id="phone" type="number" placeholder="Telefono" aria-label=".form-control-sm example" required></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-sm" id="email" type="email" placeholder="Correo Electronico" aria-label=".form-control-sm example" required></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <input className="btn btn-primary btn-sm" type="button" onClick={handler} value="Enviar"></input>
                                        <input className="btn btn-primary btn-sm" type="reset" value="Borrar"></input>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                )}

                <ToastContainer />
            </>
        );
    }

};
export default Checkout;