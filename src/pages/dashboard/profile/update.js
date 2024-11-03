import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

let initialState = {
    title: "",
    price: "",
    description: "",
    image : ""
};

export default function UpdateProduct() {
    const [state, setState] = useState(initialState);
    const { user } = useAuthContext();
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(firestore, "products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setState(docSnap.data());
            } else {
                console.error("No such document!");
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async () => {
        const { title, price, description, image } = state;
        if (!title || !price || !description || !image) {
            window.toastify("Please Fill All Fields", 'error');
            return;
        }

        let updateData = {
            ...state,
            createByUser: { uid: user.uid },
            updatedAt: serverTimestamp()
        };

        try {
            await updateDoc(doc(firestore, "products", id), updateData);
            window.toastify("Successfully Updated Product", 'success');
            navigate('/dashboard/admin');  // Redirect after successful update
        } catch (err) {
            console.error('Error updating document: ', err);
        }
        console.log('hi :>> ');
    };

    return (
        
        <main>
            
            <main className="container py-5">
                <div className="row">
                    <h2 className='text-center mb-4'>Update Product</h2>
                    <div className="col-12 mb-2">
                        <input type="text" value={state.title} className='form-control' placeholder='Title' onChange={handleChange} name='title' />
                    </div>
                    <div className="col-12 mb-2">
                        <input type="text" className='form-control' value={state.description} placeholder='Description' name='description' onChange={handleChange} />
                    </div>
                    <div className="col-12 mb-2">
                        <input type="number" className='form-control' placeholder='Price' value={state.price} name='price' onChange={handleChange} />
                    </div>
                    <div className="col-12 mb-2">
                        <input type="file" className='form-control' placeholder='Image Path' name='image' onChange={handleChange} />
                    </div>
                    <div className="col-12 mb-2 text-center">
                        <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </main>
        </main>

    )
}